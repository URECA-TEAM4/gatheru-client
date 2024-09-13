import React from 'react'
import Tab from '../../common/Tabs/Tab'
import { Container } from '@mui/material'
import {
  mute_navy_color,
  primary_color,
  secondary_color,
} from '../../constants/colors'
// 캘린더 플러그인
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import Auth from "../../../hoc/auth"

function CalendarPage() {
  const handleDateClick = arg => {
    alert(arg.dateStr)
  }

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Tab />
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            {
              title: '강남 모각코',
              date: '2024-09-01T17:00',
              color: mute_navy_color,
            },
            {
              title: '스터디 모집',
              start: '2024-09-02',
              end: '2024-09-05',
              color: secondary_color,
            },
            {
              title: '공모전 모집',
              start: '2024-09-04',
              end: '2024-09-06',
              color: primary_color,
            },
          ]}
          dateClick={handleDateClick}
        />
      </Container>
    </div>
  )
}

export default Auth(CalendarPage, true);