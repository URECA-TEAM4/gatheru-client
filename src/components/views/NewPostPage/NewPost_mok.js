import React, { useState } from 'react'
import { TextField, Button, Box, Container } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Auth from '../../../hoc/auth'

import dayjs from 'dayjs'
import { secondary_color } from '../../constants/colors'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import SavedSearchIcon from '@mui/icons-material/SavedSearch'

function NewPostPagemok() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setdate] = useState(dayjs())
  const [maxParticipants, setMaxParticipants] = useState(1)

  const navigate = useNavigate()
  const user = useSelector(state => state.user)

  const handleDateChange = newValue => {
    setdate(newValue) // DateTimePicker에서 선택된 값을 상태에 저장
  }

  // 지도js
  const center = {
    // 지도의 중심좌표
    lat: 37.5665,
    lng: 126.978,
  }
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 })
  const [location, setLocation] = useState('') // 장소
  const [keyword, setKeyword] = useState('') // 키워드
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng
    const lat = latlng.getLat()
    const lng = latlng.getLng()
    // 위도, 경도 데이터
    setPosition({ lat, lng })
    // 도로명 주소 가져오기
    fetchAddress(lat, lng)
  }

  const fetchAddress = async (lat, lng) => {
    const kakao = window.kakao
    const geocoder = new kakao.maps.services.Geocoder()
    const coord = new kakao.maps.LatLng(lat, lng)

    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name
        const roadAddress = result[0].road_address?.address_name || ''
        const fullAddress = roadAddress ? roadAddress : address
        setLocation(fullAddress)
      } else {
        setLocation('주소를 찾을 수 없습니다.')
      }
    })
  }

  const handleKeywordChange = e => {
    setKeyword(e.target.value)
  }

  const handleKeywordSearch = () => {
    const kakao = window.kakao
    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const newMarkers = data.map(item => ({
          lat: item.y,
          lng: item.x,
          title: item.place_name,
        }))
        setMarkers(newMarkers)
        setPosition({ lat: newMarkers[0].lat, lng: newMarkers[0].lng })
        fetchAddress(newMarkers[0].lat, newMarkers[0].lng)
      } else {
        setLocation('키워드로 장소를 찾을 수 없습니다.')
      }
    })
  }
  const handleMarkerClick = marker => {
    setSelectedMarker(marker)
    fetchAddress(marker.lat, marker.lng)
  }

  // 입력값 데이터 전송
  const handleSubmit = async event => {
    event.preventDefault()
    const registrationData = {
      title,
      writer: user.userData._id, // redux에서 userData 가져옴
      content: description,
      location,
      maximumNum: maxParticipants,
      datetime: date.toISOString(), // dayjs를 사용하여 ISO 형식으로 변환
      type: 'mogako',
      lat: position.lat,
      lng: position.lng,
    }

    try {
      // 서버로 POST 요청
      const response = await axios.post('/api/mogakos/add', registrationData)
      console.log('등록 성공:', response.data)

      // 성공 시 메인 페이지로 이동
      navigate('/')
    } catch (error) {
      console.error('등록 오류:', error)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          fullWidth
          sx={{ mb: 3 }}
        />

        <TextField
          label="내용"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          multiline
          minRows={5}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2}>
          <Grid size={6}>
            <Box sx={{ mb: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                  <DateTimePicker
                    label="날짜, 시간 지정"
                    value={date}
                    onChange={handleDateChange}
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
              value={maxParticipants}
              onChange={e => setMaxParticipants(e.target.value)}
              required
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
              sx={{ mb: 3, mt: 1 }}
            />
          </Grid>
        </Grid>

        {/* 장소 및 지도  */}
        <TextField
          label="장소"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box
          component="form"
          sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
        >
          <TextField
            label="장소 검색 (예: 수서역 카페)"
            value={keyword}
            onChange={handleKeywordChange}
            size="small"
            variant="standard"
            helperText="아직 장소를 못 정하셨나요? 키워드를 입력하여 장소를 검색해보세요!"
          />
          <Button
            type="button"
            onClick={handleKeywordSearch}
            variant="contained"
            color="white"
            sx={{ ml: 3 }}
          >
            <SavedSearchIcon color="secondary" />
          </Button>
        </Box>

        <Map
          id="map"
          center={position}
          style={{
            width: '100%',
            height: '350px',
          }}
          level={3} // 지도의 확대 레벨
          onClick={handleMapClick}
        >
          <MapMarker position={position ?? center} />
          {markers.map(
            (marker, index) =>
              (selectedMarker === null ||
                selectedMarker.title === marker.title) && (
                <MapMarker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  title={marker.title}
                  onClick={() => handleMarkerClick(marker)}
                />
              ),
          )}
        </Map>

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
      </Box>
    </Container>
  )
}

export default Auth(NewPostPagemok, true)
