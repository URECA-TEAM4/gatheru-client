import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Auth from '../../../hoc/auth'

import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

function NewPostPagemok() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setdate] = useState(dayjs(''))
  const [location, setLocation] = useState('')
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.978 })
  const [maxParticipants, setMaxParticipants] = useState(1)
  const [searchAddress, setSearchAddress] = useState('')
  const [keyword, setKeyword] = useState('')
  const [markers, setMarkers] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(null)

  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  
  const handleDateChange = (newValue) => {
    setdate(newValue); // DateTimePicker에서 선택된 값을 상태에 저장
  };

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng
    const lat = latlng.getLat()
    const lng = latlng.getLng()
    setPosition({ lat, lng })
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

  const handleSearchChange = e => {
    setSearchAddress(e.target.value)
  }

  const handleKeywordChange = e => {
    setKeyword(e.target.value)
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    const kakao = window.kakao
    const geocoder = new kakao.maps.services.Geocoder()

    geocoder.addressSearch(searchAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0]
        setPosition({ lat: y, lng: x })
        fetchAddress(y, x)
      } else {
        setLocation('주소를 찾을 수 없습니다.')
      }
    })
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
  }

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
      joinedUser: [],
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
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'left',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        모집 글 작성 ( 모각코 )
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          label="제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="내용"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          multiline
          rows={4}
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: '20px', mb: 0 }}>
          {/* <TextField label="날짜" type="date" value={date} onChange={(e) => setDate(e.target.value)} required InputLabelProps={{ shrink: true }} sx={styles.smallInput} /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker label="날짜, 시간 지정" value={date} onChange={handleDateChange} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            label="장소"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
            sx={styles.smallInput}
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={styles.searchBox}
        >
          <TextField
            label="주소 검색 (도로명 주소)"
            value={searchAddress}
            onChange={handleSearchChange}
            required
            sx={styles.searchInput}
          />
          <Button
            type="button"
            onClick={handleSearchSubmit}
            variant="contained"
            color="primary"
            sx={styles.searchButton}
          >
            검색
          </Button>
        </Box>

        <Box component="form" sx={styles.keywordBox}>
          <TextField
            label="장소 검색 (예: 수서역 카페)"
            value={keyword}
            onChange={handleKeywordChange}
            required
            sx={styles.searchInput}
          />
          <Button
            type="button"
            onClick={handleKeywordSearch}
            variant="contained"
            color="primary"
            sx={styles.searchButton}
          >
            키워드 검색
          </Button>
        </Box>

        <Map
          center={position}
          style={{ width: '100%', height: '350px', marginBottom: '20px' }}
          level={3}
          onClick={handleMapClick}
        >
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

        <TextField
          label="모집 인원 수"
          type="number"
          value={maxParticipants}
          onChange={e => setMaxParticipants(e.target.value)}
          required
          InputProps={{ inputProps: { min: 1 } }}
          sx={styles.smallInput}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={styles.submitButton}
        >
          등록
        </Button>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  smallInput: {
    flex: 1,
  },
  searchBox: {
    display: 'flex',
    gap: '10px',
    mb: 1,
  },
  keywordBox: {
    display: 'flex',
    gap: '10px',
    mb: 1,
  },
  searchInput: {
    width: '250px',
    height: '30px',
    fontSize: '14px',
    padding: '5px',
    marginRight: '1px',
    borderRadius: '4px',
    borderWidth: '1px',
  },
  searchButton: {
    backgroundColor: '#fff',
    color: '#E80080',
    height: '30px',
    '&:hover': { backgroundColor: '#d40070', color: '#fff' },
    marginTop: '15px',
  },
  submitButton: {
    padding: '8px 20px',
    fontSize: '14px',
    backgroundColor: '#E80080',
    color: '#fff',
    display: 'block',
    margin: '20px auto',
    '&:hover': { backgroundColor: '#d40070' },
  },
}

export default Auth(NewPostPagemok, true)
