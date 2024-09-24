import React, { useState, useEffect } from 'react'
import UserIcon from '../../constants/userIcon'
import { useSelector } from 'react-redux'
import { Box, Typography, Button, InputBase } from '@mui/material'
import {
  gray_color,
  mute_navy_color,
  secondary_color,
} from '../../constants/colors'
// import Comment from './Comment'

function SingleComment(props) {
  const [userName, setUserName] = useState('')
  const [commentValue, setCommentValue] = useState('')
  const user = useSelector(state => state.user)
  const [openReply, setOpenReply] = useState(false)

  const onClickReplyOpen = () => {
    setOpenReply(!openReply)
  }

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ]

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setUserName(user.userData.name)
    }
  }, [user.userData])

  return (
    <div>
      {/* <Comment actions={actions} /> */}
      <span
        onClick={onClickReplyOpen}
        key="comment-basic-reply-to"
        style={{ cursor: 'pointer' }}
      >
        Reply to
      </span>

      {openReply && (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
          <UserIcon />{' '}
          <Typography sx={{ mx: 1, fontSize: 15 }}>{userName}</Typography>
          <InputBase
            sx={{
              flex: 1,
              border: 1,
              borderColor: gray_color,
              borderRadius: 2,
              fontSize: 15,
              color: mute_navy_color,
              px: 1,
              py: 0.2,
              mx: 1,
            }}
            onChange={e => {
              setCommentValue(e.currentTarget.value)
            }}
            value={commentValue}
            placeholder="write a comment!"
          />
          <Button
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderColor: secondary_color,
              color: secondary_color,
            }}
            // onClick={onSubmit}
          >
            등록
          </Button>
        </Box>
      )}
    </div>
  )
}

export default SingleComment
