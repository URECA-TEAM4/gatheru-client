import React, { useState } from 'react'
import { Button } from '@mui/material'
import { primary_color } from '../../constants/colors'
import { deletePost } from '../../_actions/post_action'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MogakModal from './MogakModal'
import StudyContestModal from './StudyContestModal'

function PostUpdateDelete(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickDelete = () => {
    const body = {
      postId: props.postId,
      postType: props.type,
    }
    dispatch(deletePost(body)).then(res => {
      if (res.payload.success) {
        alert('게시물이 삭제되었습니다.')
        navigate('/mypage')
      } else {
        alert('게시물 삭제에 실패했습니다.')
      }
    })
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          borderRadius: 2,
          marginRight: 1,
          fontWeight: 700,
          minWidth: '60px',
          backgroundColor: 'white',
          color: primary_color,
          border: `1px solid ${primary_color}`,
        }}
      >
        수정
      </Button>
      <Button
        onClick={onClickDelete}
        variant="contained"
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          minWidth: '60px',
          backgroundColor: 'white',
          color: 'red',
          border: `1px solid red`,
        }}
      >
        삭제
      </Button>

      {props.type == 'mogako' ? (
        <MogakModal
          open={open}
          handleClose={handleClose}
          onUpdateSuccess={props.onUpdateSuccess}
        />
      ) : (
        <StudyContestModal
          open={open}
          handleClose={handleClose}
          onUpdateSuccess={props.onUpdateSuccess}
        />
      )}
    </>
  )
}

export default PostUpdateDelete
