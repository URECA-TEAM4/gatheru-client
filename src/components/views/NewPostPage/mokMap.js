import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { TextField, Button, Box, Typography } from '@mui/material'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'

export default function mokMap() {
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
    console.log(marker)
    fetchAddress(marker.lat, marker.lng)
    // setPosition({ lat: marker.lat, lng: marker.lng })
  }
  return (
    <>
      <TextField
        label="장소"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        sx={styles.smallInput}
      />

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
          <SavedSearchIcon />
        </Button>
      </Box>

      <Map // 지도를 표시할 Container
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
    </>
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
