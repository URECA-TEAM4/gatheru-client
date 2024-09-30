import React, { useState } from "react";
import { Button } from '@mui/material'
import { secondary_color } from '../../constants/colors'
import { UpdateMogakoPost, DeleteMogakoPost } from '../../_actions/post_action'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

function PostUpdateDelete(props) {
  // props.postType == 'mogako'
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false);

  const onClickUpdate = () => {
    const body = {
        postId: props.postId,
    }

    dispatch(UpdateMogakoPost(body)).then(res => {
      if (res.payload.success) {
        setIsEditing(false);
      } else {
        alert('글 수정에 실패했습니다.')
      }
    })
  }
  const onClickDelete = () => {
    const body = {
        postId: props.postId,
    }

    dispatch(DeleteMogakoPost(body)).then(res => {
      if (res.payload.success) {
          alert('글 삭제에 성공했습니다.')
          navigate('/mypage')
      } else {
        alert('글 삭제에 실패했습니다.')
      }
    })
  }
  return (
    <>
      <Button
        onClick={onClickUpdate}
        variant="contained"
        sx={{
          borderRadius: 2,
          backgroundColor: secondary_color,
          fontWeight: 700,
          marginRight: 0.5,
        }}
      >
        수정
      </Button>
      <Button
        onClick={onClickDelete}
        variant="contained"
        sx={{
          borderRadius: 2,
          backgroundColor: 'white',
          color: secondary_color,
          fontWeight: 700,
        }}
      >
        삭제
      </Button>
    </>
  )
}

export default PostUpdateDelete
