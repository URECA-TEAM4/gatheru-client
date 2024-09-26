import React, { useState } from 'react'
import { Button } from '@mui/material'
import { Done } from '@mui/icons-material'
import { secondary_color } from '../../constants/colors'
import { useDispatch } from 'react-redux'
import { joinMogakoPost, unJoinMogakoPost } from '../../_actions/post_action'
import { useSelector } from 'react-redux'
import axios from 'axios'

function JoinMogakoButton(props) {
  const [applied, setApplied] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleJoinMogako = () => {
    const body = {
      userId: user.userData._id,
      postId: props.postId,
    }

    dispatch(joinMogakoPost(body)).then(res => {
      if (res.payload.success) {
        alert('신청이 완료 되었습니다.')
        notify({
          sender: user.userData.name,
          receiver: props.writer,
          postId: props.postId,
          postTitle: props.title,
          message: '게시물에 신청자가 추가되었습니다',
        })
      } else {
        alert('신청에 실패하셨습니다.')
      }
    })

    setApplied(true)
  }

  const handleUnJoinMogako = () => {
    const body = {
      userId: user.userData._id,
      postId: props.postId,
    }

    dispatch(unJoinMogakoPost(body)).then(res => {
      if (res.payload.success) {
        alert('신청이 취소되었습니다.')
        notify({
          sender: user.userData.name,
          receiver: props.writer,
          postId: props.postId,
          postTitle: props.title,
          message: '게시물 신청이 취소되었습니다',
        })
      } else {
        alert('신청에 취소에 실패하셨습니다.')
      }
    })

    setApplied(false)
  }

  const notify = dataToSubmit => {
    axios
      .post('/api/notifications/add', dataToSubmit)
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
  }

  return (
    <>
      {!props.userIsWriter && !applied && (
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: secondary_color,
            fontWeight: 700,
          }}
          onClick={() => {
            handleJoinMogako()
          }}
        >
          신청하기
        </Button>
      )}
      {!props.userIsWriter && applied && (
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            borderColor: secondary_color,
            color: secondary_color,
          }}
          endIcon={<Done />}
          onClick={() => {
            handleUnJoinMogako()
          }}
        >
          신청완료
        </Button>
      )}
    </>
  )
}

export default JoinMogakoButton
