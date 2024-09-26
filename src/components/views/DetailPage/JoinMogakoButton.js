import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Done } from '@mui/icons-material'
import { secondary_color } from '../../constants/colors'
import { useDispatch } from 'react-redux'
import { joinMogakoPost, unJoinMogakoPost } from '../../_actions/post_action'
import { useSelector } from 'react-redux'

function JoinMogakoButton(props) {
  const [applied, setApplied] = useState(() => {
    // 로컬스토리지에서 초기값 가져오기
    const storedApplied = localStorage.getItem(`applied_${props.postId}`);
    return storedApplied === 'true'; // 'true' 문자열을 boolean으로 변환
  });

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    // applied 상태가 변경될 때마다 로컬스토리지에 저장
    localStorage.setItem(`applied_${props.postId}`, applied);
  }, [applied, props.postId]);


  const handleJoinMogako = () => {
    const body = {
      userId: user.userData._id,
      postId: props.postId,
    }

    dispatch(joinMogakoPost(body)).then(res => {
      if (res.payload.success) {
        alert("신청이 완료 되었습니다.")
        props.fetchRegisteredNum(); // 신청 후 모집현황 업데이트
        setApplied(true); // 신청 후 상태 업데이트
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
        alert("신청이 취소되었습니다.")
        props.fetchRegisteredNum(); // 신청 취소 후 모집현황 업데이트
        setApplied(false); // 신청 취소 후 상태 업데이트
      } else {
        alert('신청에 취소에 실패하셨습니다.')
      }
    })

    setApplied(false)
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
