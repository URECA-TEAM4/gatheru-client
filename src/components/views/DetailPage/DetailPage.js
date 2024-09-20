import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, Typography, Divider } from '@mui/material'
import { secondary_color } from '../../constants/colors'
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <g clipPath="url(#clip0_48_2114)">
            <path
              d="M21.375 11.25C21.375 12.7418 20.7429 14.1726 19.6176 15.2275C18.4924 16.2824 16.9663 16.875 15.375 16.875C13.7837 16.875 12.2576 16.2824 11.1324 15.2275C10.0071 14.1726 9.375 12.7418 9.375 11.25C9.375 9.75816 10.0071 8.32742 11.1324 7.27252C12.2576 6.21763 13.7837 5.625 15.375 5.625C16.9663 5.625 18.4924 6.21763 19.6176 7.27252C20.7429 8.32742 21.375 9.75816 21.375 11.25Z"
              fill="#4F2F92"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM15 1.875C12.5283 1.87513 10.1069 2.57318 8.01451 3.8888C5.92207 5.20442 4.24366 7.08414 3.17243 9.31161C2.10121 11.5391 1.68072 14.0238 1.95937 16.4797C2.23802 18.9356 3.20447 21.2629 4.7475 23.1938C6.07875 21.0487 9.00938 18.75 15 18.75C20.9906 18.75 23.9194 21.0469 25.2525 23.1938C26.7955 21.2629 27.762 18.9356 28.0406 16.4797C28.3193 14.0238 27.8988 11.5391 26.8276 9.31161C25.7563 7.08414 24.0779 5.20442 21.9855 3.8888C19.8931 2.57318 17.4717 1.87513 15 1.875Z"
              fill="#4F2F92"
            />
          </g>
          <defs>
            <clipPath id="clip0_48_2114">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
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
              {new Date(post.datetime).toLocaleString('ko-KR', {
                timeZone: 'UTC',
              })}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ my: 1 }}>방식: {post.method}</Typography>
          <Typography>
            마감:{' '}
            {new Date(post.datetime).toLocaleString('ko-KR', {
              timeZone: 'UTC',
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
    </Container>
  )
}

export default DetailPage
