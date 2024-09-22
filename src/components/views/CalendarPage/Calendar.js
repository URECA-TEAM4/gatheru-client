import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { mute_navy_color, primary_color, secondary_color } from '../../constants/colors'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment-timezone' // moment 임포트

export default function Calendar() {
  const [mogakos, setMogakos] = useState([])
  const [studyContests, setStudyContests] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('/api/mogakos/get')
      const res = await axios.get('/api/studyContests/get')
      setMogakos(response.data)
      setStudyContests(res.data)
    }
    fetchEvents()
  }, [])

  const handleEventClick = info => {
    const eventId = info.event.id // 클릭한 게시글 ID
    const eventType = info.event.extendedProps.type // 클릭한 게시글 type
    window.location.href = `/detail/${eventType}/${eventId}`
  }

  return (
    <>
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
        eventContent={arg => {
          const eventDate = moment(arg.event.start).tz('UTC') // 한국 시간으로 변환
          const formattedTime =
            eventDate.format('A') === 'AM'
              ? `${eventDate.format('h:mm')}am`
              : `${eventDate.format('h:mm')}pm` // 오전/오후 한국어로 변환

          return {
            html: `<span style="color: ${arg.event.color};">● </span> <div>${formattedTime} ${arg.event.title}</div>`,
          } // 시간과 제목 표시
        }}
      />
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
          return { html: `<div>${arg.event.title}</div>` } // 시간 없이 제목만 표시
        }}
      />
    </>
  )
}
