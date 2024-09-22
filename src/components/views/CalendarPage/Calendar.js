import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mute_navy_color, primary_color, secondary_color } from '../../constants/colors'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function Calendar(props) {
  const [mogakos, setMogakos] = useState([])
  const [studyContests, setStudyContests] = useState([])

  let endpoints = ['/api/mogakos/get', '/api/studyContests/get']

  const pastDeadline = post => {
    let datetime = post.type == 'mogako' ? post.datetime : post.deadline
    return Date.now() > new Date(datetime)
  }

  const beforeDeadline = post => {
    let datetime = post.type == 'mogako' ? post.datetime : post.deadline
    return Date.now() < new Date(datetime)
  }

  useEffect(() => {
    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))

      .then(function (response) {

        if (props.pastDeadline == 'all') {
          setMogakos(response[0].data)
          setStudyContests(response[1].data)
        } else if (props.pastDeadline) {
          setMogakos(response[0].data.filter(pastDeadline))
          setStudyContests(response[1].data.filter(pastDeadline))
        } else {
          setMogakos(response[0].data.filter(beforeDeadline))
          setStudyContests(response[1].data.filter(beforeDeadline))
        }
      })

      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const handleEventClick = info => {
    const eventId = info.event.id // 클릭한 게시글 ID
    const eventType = info.event.extendedProps.type // 클릭한 게시글 type
    window.location.href = `/detail/${eventType}/${eventId}`
  }

  return (
    <>
    {props.gatheringType === 'mogako' && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={mogakos.map(event => ({
            id: event._id,
            title: event.title,
            date: event.datetime,
            color: mute_navy_color,
            extendedProps: { type: event.type }, // type을 extendedProps에 추가
          }))}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
          timeZone="UTC"
        />
      )}
      {props.gatheringType === 'study' && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={studyContests.map(event => ({
            id: event._id,
            title: event.title,
            start: event.createdAt,
            end: event.deadline,
            color: event.type === "study" ? secondary_color : primary_color,
            extendedProps: { type: event.type }, // type을 extendedProps에 추가
          }))}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
          timeZone="UTC"
          eventContent={arg => {
            return { html: `<div>${arg.event.title}</div>` }; // 시간 없이 제목만 표시
          }}
        />
      )}
  </>
  )
}
