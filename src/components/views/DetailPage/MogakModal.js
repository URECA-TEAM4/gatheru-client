import React, { useEffect, useState } from 'react'
import {
  TextField,
  Modal,
  Button,
  Box,
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'

import { secondary_color } from '../../constants/colors'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { updateMogakoPost } from '../../_actions/post_action'
import { useDispatch } from 'react-redux'

function MogakModal({ open, handleClose, onUpdateSuccess }) {
  const dispatch = useDispatch()

  const { type, postId } = useParams()
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')
  const [editedDatetime, setEditedDatetime] = useState(dayjs())
  const [editedMaximumNum, setEditedMaximumNum] = useState('')
  const [editedLocation, setEditedLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/mogakos/${postId}`)
        // 가져온 데이터를 수정 가능한 상태로 설정
        setEditedTitle(response.data.title) 
        setEditedContent(response.data.content) 
        setEditedDatetime(dayjs(response.data.datetime)); // 문자열을 Dayjs로 변환
        setEditedMaximumNum(response.data.maximumNum) 
        setEditedLocation(response.data.location) 
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [type, postId])

  const onClickUpdate = () => {
    const body = {
      postId: postId,
      title: editedTitle,
      content: editedContent,
      datetime: editedDatetime.toISOString(), // 날짜를 ISO 형식으로 변환하여 서버에 전송
      maximumNum: editedMaximumNum,
      location: editedLocation
    }
    dispatch(updateMogakoPost(body)).then(res => {
      if (res.payload.success) {
        // 상위 컴포넌트로 업데이트된 내용 전달
        onUpdateSuccess({
            title: editedTitle,
            content: editedContent,
            datetime: editedDatetime,
            maximumNum: editedMaximumNum,
            location: editedLocation
          })
        handleClose()
      } else {
        alert('글 수정에 실패했습니다.')
      }
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <TextField
          label="내용"
          multiline
          minRows={5}
          fullWidth
          value={editedContent}
          onChange={e => setEditedContent(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="모집 마감일"
                    value={editedDatetime}
                    onChange={newValue => setEditedDatetime(newValue)} // Dayjs 객체로 상태 업데이트
                    slotProps={{
                      textField: {
                        required: true,
                        error: false,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid size={6}>
            <TextField
              label="모집 인원 수"
              type="number"
              inputProps={{ min: 1 }}
              value={editedMaximumNum}
              onChange={e => setEditedMaximumNum(e.target.value)}
              required
              fullWidth
              sx={{ mb: 3, mt: 1 }}
            />
          </Grid>
        </Grid>


        {/* 장소 및 지도  */}
        <TextField
          label="장소"
          value={editedLocation}
          onChange={e => setEditedLocation(e.target.value)} 
          required
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button
          type="submit"
          onClick={onClickUpdate} // 이 부분에서 전달된 onSubmit 함수 호출
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: secondary_color,
            fontWeight: 700,
            display: 'block',
            margin: '20px auto',
          }}
        >
          확인
        </Button>
      </Box>
    </Modal>
  )
}

export default MogakModal
