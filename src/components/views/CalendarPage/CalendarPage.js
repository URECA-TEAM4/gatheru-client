import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Tab from '../../common/Tabs/Tab'
import { Container } from '@mui/material'
import { mute_navy_color } from '../../constants/colors'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import Auth from '../../../hoc/auth'

function CalendarPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('/api/mogakos/get')
      setEvents(response.data)
    }
    fetchEvents()
  }, [])

  const handleEventClick = info => {
    const eventId = info.event.id // 클릭한 게시글 ID
    const eventType = info.event.extendedProps.type // 클릭한 게시글 type
    window.location.href = `/detail/${eventType}/${eventId}`
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Tab />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({
            id: event._id,
            title: event.title,
            date: event.datetime,
            color: mute_navy_color,
            extendedProps: { type: event.type }, // type을 extendedProps에 추가
          }))}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
          timeZone="UTC"
        />
      </Container>
    </div>
  )
}

export default Auth(CalendarPage, true)
