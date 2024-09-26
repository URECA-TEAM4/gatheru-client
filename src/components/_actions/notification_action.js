import axios from 'axios'

export function notify(dataToSubmit) {
  const request = axios
    .post('/api/notifications/add', dataToSubmit)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
  return {
    payload: request,
  }
}
