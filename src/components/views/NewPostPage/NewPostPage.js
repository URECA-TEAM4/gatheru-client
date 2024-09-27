import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  Container,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Auth from '../../../hoc/auth'
import dayjs from 'dayjs'
import { secondary_color } from '../../constants/colors'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

function NewPostPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState(dayjs())
  const [maxParticipants, setMaxParticipants] = useState(1)
  const [purpose, setPurpose] = useState('')
  const [meetingType, setMeetingType] = useState('')

  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const handleDeadlineChange = newValue => {
    setDeadline(newValue) // DateTimePicker에서 선택된 값을 상태에 저장
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const registrationData = {
      title,
      writer: user.userData._id,
      content: description,
      deadline: deadline.toISOString(),
      maximumNum: maxParticipants,
      type: purpose,
      method: meetingType,
    }

    try {
      const response = await axios.post(
        '/api/studyContests/add',
        registrationData,
      )
      console.log('등록 성공:', response.data)
      navigate('/')
    } catch (error) {
      console.error('등록 오류:', error)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <TextField
          label="내용"
          multiline
          minRows={5}
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
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
                    value={deadline}
                    onChange={handleDeadlineChange}
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
              value={maxParticipants}
              onChange={e => setMaxParticipants(e.target.value)}
              required
              fullWidth
              sx={{ mb: 3, mt: 1 }}
            />
          </Grid>
        </Grid>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">모임 목적</FormLabel>
          <RadioGroup
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            row
          >
            <FormControlLabel
              value="study"
              control={<Radio required={true} />}
              label="스터디"
            />
            <FormControlLabel
              value="contest"
              control={<Radio required={true} />}
              label="공모 및 대회"
            />
          </RadioGroup>
        </FormControl>
        <br />

        <FormControl sx={{ width: '200px', mb: 3 }}>
          <FormLabel>모임 방식</FormLabel>
          <Select
            value={meetingType}
            onChange={e => setMeetingType(e.target.value)}
            required
          >
            <MenuItem value="온라인">온라인</MenuItem>
            <MenuItem value="오프라인">오프라인</MenuItem>
            <MenuItem value="온/오프 병행">온/오프 병행</MenuItem>
            <MenuItem value="미정">미정</MenuItem>
          </Select>
        </FormControl>
        <br />

        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 2,
            backgroundColor: secondary_color,
            fontWeight: 700,
            display: 'block',
            margin: '20px auto',
          }}
        >
          등록
        </Button>
      </form>
    </Container>
  )
}

export default Auth(NewPostPage, true)
