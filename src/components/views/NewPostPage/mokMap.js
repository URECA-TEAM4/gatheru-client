import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { TextField } from '@mui/material'

export default function mokMap() {
  const center = {
    // 지도의 중심좌표
    lat: 33.450701,
    lng: 126.570667,
  }
  const [position, setPosition] = useState()
  const [location, setLocation] = useState('') // 장소 

  
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

  return (
    <>
      <TextField
        label="장소"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        sx={styles.smallInput}
      />

      <Map // 지도를 표시할 Container
        id="map"
        center={center}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={handleMapClick}

      >
        <MapMarker position={position ?? center} />
      </Map>
      <p>
        <em>지도를 클릭해주세요!</em>
      </p>
      <div id="clickLatlng">
        {position &&
          `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 장소는 ${position.title} 입니다`}
      </div>
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
