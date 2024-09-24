import React, { useState, useEffect } from 'react'
import UserIcon from '../../constants/userIcon'
import { useSelector } from 'react-redux'
import { Box, Typography, Button, InputBase, FormControl } from '@mui/material'
import {
  gray_color,
  mute_navy_color,
  secondary_color,
} from '../../constants/colors'
import axios from 'axios'

function Comment(props) {
  const [userName, setUserName] = useState('')
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setUserName(user.userData.name)
    }
  }, [user.userData])

  const onSubmit = e => {
    e.preventDefault()
    console.log('here')

    // const variables = {}

    // axios.post()
  }

  return (
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
  )
}

export default Comment
