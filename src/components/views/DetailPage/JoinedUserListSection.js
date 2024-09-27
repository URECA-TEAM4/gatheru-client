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
  const [list, setList] = useState([])

  const toggleDrawer = newOpen => () => setOpen(newOpen)

  //   useEffect(() => {
  //     axios.get('api/users')
  //     .then()
  //   }, [])
  //   console.log(props.joinedUser)

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
        {['강서진', '김다연', '안주섭'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemText primary={text} />
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
