import React, { useEffect, useState } from 'react' // useState와 useEffect 추가
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { mute_navy_color } from '../../constants/colors'
import styled from 'styled-components'
import Auth from '../../../hoc/auth'

const CustomOverlay1Style = styled.div`
  padding: 5px 10px;
  background: ${mute_navy_color};
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  bottom: 40px; // 오버레이를 위로 이동
  left: 50%; // 가운데 정렬을 위해
  transform: translateX(-50%); // 정확한 가운데 정렬
  white-space: nowrap; // 텍스트가 줄바꿈되지 않도록
`
const MapTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 25px;
`

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh; // 뷰포트 높이만큼 컨테이너 높이 설정
  width: 100%;
`

function MapPage() {
  const [markers, setMarkers] = useState([]) // 마커 상태 추가

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch('/api/mogakos/get')
      const data = await response.json()
      setMarkers(data)
    }
    fetchMarkers()
  }, [])

  const markerPosition = {
    lat: 37.5563012,
    lng: 126.9372557,
  }

  return (
    <MapContainer>
      <MapTitle>모각코 위치를 지도로 확인해보세요! </MapTitle>
      <Map center={markerPosition} style={{ width: '80%', height: '800px' }}>
        {markers.map(
          (
            marker,
            index, // 마커 표시
          ) => (
            <MapMarker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => alert('해당 게시글로 이동!')}
              anchor="bottom"
            />
          ),
        )}
        {markers.map((marker, index) => (
          <CustomOverlayMap
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            yAnchor={1}
          >
            <CustomOverlay1Style>{marker.datetime}</CustomOverlay1Style>
          </CustomOverlayMap>
        ))}
      </Map>
    </MapContainer>
  )
}

export default Auth(MapPage, true)
