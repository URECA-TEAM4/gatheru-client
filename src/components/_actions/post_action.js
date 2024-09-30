import axios from 'axios'
import { JOIN_MOGAKO_USER, UNJOIN_MOGAKO_USER, JOIN_STUDY_USER, UNJOIN_STUDY_USER } from './types'

export function addMogakoPost(dataToSubmit) {
  const request = axios
    .post('/api/mogakos/add', dataToSubmit)
    .then(response => response.data)
    .catch(err => {
      if (err.response) {
        // 서버가 응답을 반환한 경우
        console.error('Error response:', err.response.data)
      } else if (err.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.error('Error request:', err.request)
      } else {
        // 요청을 설정하는 중에 발생한 문제
        console.error('Error message:', err.message)
      }
    })
  return {
    payload: request,
  }
}

export function UpdateMogakoPost(dataToSubmit) {
  const request = axios
    .post('/api/mogakos/update', dataToSubmit)
    .then(response => response.data)
  return {
    payload: request,
  }
}

export function DeleteMogakoPost(dataToSubmit) {
  const request = axios
    .post('/api/mogakos/delete', dataToSubmit)
    .then(response => response.data)
  return {
    payload: request,
  }
}

export function addStudyContestPost(dataToSubmit) {
  const request = axios
    .post('/api/studyContests/add', dataToSubmit)
    .then(response => response.data)
  return {
    payload: request,
  }
}

export function joinMogakoPost(dataToSubmit) {
  const request = axios
    .post('/api/mogakos/join', dataToSubmit)
    .then(response => response.data)
  return {
    type: JOIN_MOGAKO_USER,
    payload: request,
  }
}

export function unJoinMogakoPost(dataToSubmit) {
  const request = axios
    .post('/api/mogakos/unJoin', dataToSubmit)
    .then(response => response.data)
  return {
    type: UNJOIN_MOGAKO_USER,
    payload: request,
  }
}

export function joinStudyPost(dataToSubmit) {
  const request = axios
    .post('/api/studyContests/join', dataToSubmit)
    .then(response => response.data)
  return {
    type: JOIN_STUDY_USER,
    payload: request,
  }
}

export function unJoinStudyPost(dataToSubmit) {
  const request = axios
    .post('/api/studyContests/unJoin', dataToSubmit)
    .then(response => response.data)
  return {
    type: UNJOIN_STUDY_USER,
    payload: request,
  }
}