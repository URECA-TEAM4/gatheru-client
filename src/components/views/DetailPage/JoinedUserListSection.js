import React, { useState, useEffect } from 'react'
import {
  Typography,
  Box,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { secondary_color } from '../../constants/colors'
import axios from 'axios'

function JoinedUserListSection(props) {
  const [open, setOpen] = useState(false)
  const [joinedUsers, setJoinedUsers] = useState(props.joinedUser)
  const [names, setNames] = useState([])

  const toggleDrawer = newOpen => () => setOpen(newOpen)

  useEffect(() => {
    setNames([])

    Promise.all(
      joinedUsers.map(userId =>
        axios.get(`/api/users/${userId}`).then(res => res.data.name),
      ),
    )
      .then(userNames => {
        setNames(userNames)
      })
      .catch(err => console.log(err))
  }, [joinedUsers])

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        p: 3,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      color="#454444"
    >
      <Typography variant="h5" fontWeight={800}>
        신청자 목록
      </Typography>
      <List>
        {names.map(name => (
          <ListItem key={name} disablePadding>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      {' '}
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        sx={{
          borderRadius: 2,
          backgroundColor: secondary_color,
          fontWeight: 700,
        }}
      >
        신청자 목록 보기
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )
}

export default JoinedUserListSection
