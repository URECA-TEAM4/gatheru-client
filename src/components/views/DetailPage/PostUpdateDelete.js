import React, { useState } from 'react'
import { Button } from '@mui/material'
import { secondary_color } from '../../constants/colors'
import { updateMogakoPost, deletePost } from '../../_actions/post_action'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MogakModal from './MogakModal'

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
        onClick={handleOpen}
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

      <MogakModal open={open} handleClose={handleClose} onUpdateSuccess={props.onUpdateSuccess} />
    </>
  )
}

export default PostUpdateDelete
