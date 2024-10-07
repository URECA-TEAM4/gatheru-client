import React, { useEffect, useState } from "react"; // useState와 useEffect 추가
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { mute_navy_color } from "../../constants/colors";
import styled from "styled-components";
import Auth from "../../../hoc/auth";
import { useNavigate } from "react-router-dom";

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
`;
const MapTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 25px;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh; // 뷰포트 높이만큼 컨테이너 높이 설정
  width: 100%;
  margin-bottom: 30px;
`;

function MapPage() {
  const navigate = useNavigate();
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("/api/mogakos/get");
      const data = await response.json();
      setMarkers(data);
    };
    fetchMarkers();
  }, []);

  const markerPosition = {
    lat: 37.5563012,
    lng: 126.9372557,
  };
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const day = days[date.getDay()];
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해준다.
    const dayOfMonth = date.getDate();
    const hours = date.getHours().toString().padStart(2, "0"); // 2자리로 맞추기
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 2자리로 맞추기

    return `${month}/${dayOfMonth}(${day}) ${hours}:${minutes}`; // 10/10(목) 17:30
  };
  return (
    <MapContainer>
      <MapTitle>모각코 위치를 지도로 확인해보세요! </MapTitle>
      <Map
        center={markerPosition}
        style={{ width: "80%", height: "800px" }}
        level={8}
      >
        {markers.map(
          (
            marker,
            index // 마커 표시
          ) => (
            <MapMarker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                navigate(`/detail/${marker.type}/${marker._id}`);
              }}
              anchor="bottom"
            />
          )
        )}
        {markers.map((marker, index) => (
          <CustomOverlayMap
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            yAnchor={1}
          >
            <CustomOverlay1Style>
              {formatDate(marker.datetime)}
            </CustomOverlay1Style>
          </CustomOverlayMap>
        ))}
      </Map>
    </MapContainer>
  );
}

export default Auth(MapPage, true);
