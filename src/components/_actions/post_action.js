import axios from 'axios'

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

export function addStudyContestPost(dataToSubmit) {
  const request = axios
    .post('/api/studyContests/add', dataToSubmit)
    .then(response => response.data)
    .catch(err => {
      if (err.response) {
        console.error('Error response:', err.response.data)
      } else if (err.request) {
        console.error('Error request:', err.request)
      } else {
        console.error('Error message:', err.message)
      }
    })
  return {
    payload: request,
  }
}