import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Container, Box, Typography, Divider } from '@mui/material'
import UserIcon from '../../constants/userIcon'
import Auth from '../../../hoc/auth'

import DeadlineBadge from './DeadlineBadge'
import JoinMogakoButton from './JoinMogakoButton'
import JoinStudyContestButton from './JoinStudyContestButton'
import ContentSection from './ContentSection'
import CommentSection from './CommentSection'

function DetailPage() {
  const { type, postId } = useParams()
  const user = useSelector(state => state.user)
  const [userIsWriter, setUserIsWriter] = useState(false)

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
    if (user.userData && user.userData.isAuth !== undefined) {
      if (user.userData.name == writer) setUserIsWriter(true)
    }
  }, [user.userData, writer])

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

  // 업데이트 된 모집 현황 가져오기
  const fetchRegisteredNum = async () => {
    console.log(post._id)
    try {
      const response = await axios.get(`/api/mogakos/registeredNum/${postId}`); // postId를 URL 파라미터로 전달

      setRegisteredNum(response.data.registeredNum)
      console.log(registeredNum)
    } catch (error) {
      console.error('Error fetching registered number:', error)
    }
  }

  useEffect(() => {
    fetchRegisteredNum() // 컴포넌트가 마운트될 때 호출
  }, [post._id])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <DeadlineBadge pastDeadline={pastDeadline} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 1,
        }}
      >
        <Typography gutterBottom variant="h4" component="div" sx={{ my: 1 }}>
          {post.title}
        </Typography>

        {post.type == 'mogako' && (
          <JoinMogakoButton
            userIsWriter={userIsWriter}
            postId={postId}
            registeredNum={registeredNum}
            fetchRegisteredNum={fetchRegisteredNum}
          />
        )}
      </Box>

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

      <ContentSection
        type={post.type}
        location={post.location}
        datetime={post.datetime}
        method={post.method}
        studyContestDateTime={datetime}
        registeredNum={registeredNum}
        maximumNum={maximumNum}
        content={post.content}
        fetchRegisteredNum={fetchRegisteredNum}
      />

      {post.type != 'mogako' && <JoinStudyContestButton />}

      <Divider sx={{ my: 3 }}></Divider>

      <CommentSection postId={post._id} />
    </Container>
  )
}

export default Auth(DetailPage, true)
