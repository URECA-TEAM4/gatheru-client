import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { secondary_color } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { joinStudyPost, unJoinStudyPost } from '../../_actions/post_action'

function JoinStudyContestButton(props) {
  const [comment, setComment] = useState('')
  const handleChange = e => {
    setComment(e.currentTarget.value)
  }

  const [applied, setApplied] = useState(() => {
    // 로컬스토리지에서 초기값 가져오기
    const storedApplied = localStorage.getItem(`applied_${props.postId}`)
    return storedApplied === 'true' // 'true' 문자열을 boolean으로 변환
  })

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    // applied 상태가 변경될 때마다 로컬스토리지에 저장
    localStorage.setItem(`applied_${props.postId}`, applied)
  }, [applied, props.postId])

  const handleJoinStudyContest = () => {
    const body = {
      userId: user.userData._id,
      postId: props.postId,
      comment: comment,
    }

    dispatch(joinStudyPost(body)).then(res => {
      if (res.payload.success) {
        alert('신청이 완료 되었습니다.')
        props.fetchRegisteredNum() // 신청 후 모집현황 업데이트
        setApplied(true) // 신청 후 상태 업데이트
      } else {
        alert('신청에 실패하셨습니다.')
      }
    })

    setApplied(true)
  }

  const handleUnJoinStudyContest = () => {
    const body = {
      userId: user.userData._id,
      postId: props.postId,
    }

    dispatch(unJoinStudyPost(body)).then(res => {
      if (res.payload.success) {
        alert('신청이 취소되었습니다.')
        props.fetchRegisteredNum() // 신청 취소 후 모집현황 업데이트
        setApplied(false) // 신청 취소 후 상태 업데이트
      } else {
        alert('신청에 취소에 실패하셨습니다.')
      }
    })

    setApplied(false)
  }

  return (
    <>
      {!props.userIsWriter && (
        <Accordion
          sx={{
            backgroundColor: '#FFF1F9',
            color: secondary_color,
            boxShadow: 'none',
            '&::before': {
              display: 'none',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: secondary_color }} />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>신청하기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              value={comment}
              onChange={handleChange}
              fullWidth
              autoFocus
              multiline
              id="outlined-textarea"
              label="신청서 작성"
              minRows={4}
              color="secondary"
            />
            {!props.userIsWriter && !applied && (
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  backgroundColor: secondary_color,
                  fontWeight: 700,
                  float: 'right',
                  my: 3,
                }}
                onClick={() => {
                  handleJoinStudyContest()
                }}
              >
                완료
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
                  float: 'right',
                  my: 3,
                }}
                onClick={() => {
                  handleUnJoinStudyContest()
                }}
              >
                신청취소
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      )}
    </>
  )
}

export default JoinStudyContestButton
