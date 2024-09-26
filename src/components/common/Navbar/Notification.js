import React, { useState, useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  IconButton,
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
} from '@mui/material'
import axios from 'axios'

function Notification(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = () => setAnchorEl(null)
  const handleNotification = e => {
    setAnchorEl(e.currentTarget)
    changeReadStatus()
  }

  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])

  const myNotification = notification => props.userId == notification.receiver

  const changeReadStatus = () => {
    // Update the notification as read
    notifications.forEach(notification => {
      axios.patch(`/api/notifications/${notification._id}`, {
        read: true,
      })
    })
    setUnreadCount(0)
  }

  useEffect(() => {
    setUnreadCount(
      notifications.filter(notification => !notification.read).length,
    )
  }, [notifications])

  useEffect(() => {
    axios
      .get(`/api/notifications/get`)
      .then(function (response) {
        setNotifications(response.data.filter(myNotification))
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <>
      <IconButton
        aria-label="show 17 new notifications"
        color="primary"
        onClick={handleNotification}
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ fontSize: 30 }} />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: '350px' }}>
          {notifications.map(notification => {
            return (
              <ListItem disablePadding key={notification._id}>
                <ListItemButton>
                  <ListItemText
                    primary={notification.postTitle}
                    secondary="게시물에 신청자가 추가되었습니다"
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Popover>
    </>
  )
}

export default Notification
