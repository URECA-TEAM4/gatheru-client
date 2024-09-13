import React from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import { mute_navy_color } from '../../constants/colors'
import styled from 'styled-components'
import Auth from "../../../hoc/auth"

const CustomOverlay1Style = styled.div`
  padding: 5px 10px;
  background: ${mute_navy_color};
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
  bottom: 40px;  // 오버레이를 위로 이동
  left: 50%;     // 가운데 정렬을 위해
  transform: translateX(-50%);  // 정확한 가운데 정렬
  white-space: nowrap;  // 텍스트가 줄바꿈되지 않도록
`
function MapPage() {
  const markerPosition = {
    lat: 37.5563012,
    lng: 126.9372557,
  }

  return (
    <Map center={markerPosition} style={{ width: '100%', height: '800px' }}>
      <MapMarker
        position={markerPosition}
        onClick={() => alert('해당 게시글로 이동!')}
        anchor="bottom"
      />
      <CustomOverlayMap position={markerPosition} yAnchor={1}>
        <CustomOverlay1Style>9/28(토) 7:00</CustomOverlay1Style>
      </CustomOverlayMap>
    </Map>
  )
}

export default Auth(MapPage, true);