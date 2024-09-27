import React, { useState, useEffect } from 'react'
import UserIcon from '../../constants/userIcon'
import { useSelector } from 'react-redux'
import { Box, Typography, Button, InputBase } from '@mui/material'
import {
  gray_color,
  mute_navy_color,
  secondary_color,
} from '../../constants/colors'
import axios from 'axios'

function CommentSection(props) {
  const [userName, setUserName] = useState('')
  const [commentValue, setCommentValue] = useState('')
  const [postComments, setPostComments] = useState([])
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setUserName(user.userData.name)
    }
  }, [user.userData])

  useEffect(() => {
    axios
      .get(`/api/comments/${props.postId}`)
      .then(res => setPostComments(res.data))
      .catch(err => console.log(err))
  }, [])

  const onSubmit = e => {
    const commentData = {
      content: commentValue,
      writerId: user.userData._id,
      writer: user.userData.name,
      postId: props.postId,
    }

    axios
      .post('/api/comments/save', commentData)
      .then(response => {
        if (response.status === 200) window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {/* Comment Lists */}
      {/* <SingleComment postId={props.postId} /> */}

      {/* Root Comment Form */}
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
          onClick={onSubmit}
        >
          등록
        </Button>
      </Box>

      {/* Displaying existing comments for current post */}
      {postComments.map(comment => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              my: 3,
              width: '100%',
            }}
            key={comment._id}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <UserIcon />
              <Typography sx={{ mx: 1, fontSize: 13, fontWeight: 'bold' }}>
                {comment.writer}
              </Typography>
              <Typography sx={{ mx: 1, fontSize: 15 }}>
                {comment.content}
              </Typography>
            </Box>

            <Typography
              sx={{ mx: 1, fontSize: 12, color: 'gray', textAlign: 'right' }}
            >
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}

export default CommentSection
