import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, Typography, Divider } from '@mui/material'
import { secondary_color } from '../../constants/colors'
import Comment from './Comment'
import UserIcon from '../../constants/userIcon'
import Auth from '../../../hoc/auth'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

function DetailPage() {
  const { type, postId } = useParams()
  const [post, setPost] = useState({})
  const [datetime, setDateTime] = useState()
  const [pastDeadline, setPastDeadline] = useState(false)
  const [writer, setWriter] = useState('')
  const [generation, setGeneration] = useState(0)
  const [group, setGroup] = useState('')
  const [registeredNum, setRegisteredNum] = useState(0)
  const [maximumNum, setMaximumNum] = useState(0)

  const checkDeadline = async () => {
    if (Date.now() > new Date(datetime)) setPastDeadline(true)
  }

  useEffect(() => {
    type == 'mogako'
      ? axios
          .get(`/api/mogakos/${postId}`)
          .then(function (response) {
            setPost(response.data)
            setDateTime(response.data.datetime)
            setRegisteredNum(response.data.registeredNum)
            setMaximumNum(response.data.maximumNum)
          })
          .catch(function (error) {
            console.log(error)
          })
      : axios
          .get(`/api/studyContests/${postId}`)
          .then(function (response) {
            setPost(response.data)
            setDateTime(response.data.deadline)
            setRegisteredNum(response.data.registeredNum)
            setMaximumNum(response.data.maximumNum)
          })
          .catch(function (error) {
            console.log(error)
          })
  }, [])

  useEffect(() => {
    axios
      .get(`/api/users/${post.writer}`)
      .then(function (res) {
        setWriter(res.data.name)
        setGeneration(res.data.generation)
        if (res.data.group == 1) setGroup('프론트엔드 대면')
        else if (res.data.group == 2) setGroup('프론트엔드 비대면')
        else if (res.data.group == 3) setGroup('백엔드 대면')
        else if (res.data.group == 4) setGroup('백엔드 비대면')
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [post.writer])

  useEffect(() => {
    checkDeadline()
  }, [datetime])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {pastDeadline ? (
        <Box
          sx={{
            borderRadius: 5,
            bgcolor: '#EADDFF',
            color: 'gray',
            fontWeight: 'bold',
            height: '30px',
            width: 'fit-content',
            py: 0.5,
            px: 1.3,
          }}
        >
          모집 마감
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: 5,
            bgcolor: secondary_color,
            color: 'white',
            fontWeight: 'bold',
            height: '30px',
            width: 'fit-content',
            py: 0.5,
            px: 1.3,
          }}
        >
          모집중
        </Box>
      )}

      <Typography gutterBottom variant="h4" component="div" sx={{ my: 1 }}>
        {post.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
        {' '}
        <UserIcon />
        <Typography fontSize={15} fontWeight="bold" sx={{ mx: 1 }}>
          {writer}{' '}
        </Typography>{' '}
        <Typography fontSize={15}>
          유레카 {generation}기 {group}
        </Typography>
      </Box>

      {post.type == 'mogako' ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 1 }}>
            <LocationOnOutlinedIcon />{' '}
            <Typography sx={{ ml: 1 }}>{post.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthOutlinedIcon />{' '}
            <Typography sx={{ ml: 1 }}>
              {new Date(post.datetime).toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ my: 1 }}>방식: {post.method}</Typography>
          <Typography>
            마감:{' '}
            {new Date(datetime).toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </>
      )}

      <Typography sx={{ my: 1 }}>
        모집현황: {registeredNum} / {maximumNum}
      </Typography>

      <Typography variant="body1" sx={{ my: 3, lineHeight: 2 }}>
        {post.content}
      </Typography>

      <Divider></Divider>

      <Comment />
    </Container>
  )
}

export default Auth(DetailPage, true)
