import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  mute_navy_color,
  primary_color,
  secondary_color,
} from '../../constants/colors'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import styles from './Calendar.module.css'

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
  const events = props.gatheringType === 'mogako' ? mogakos : studyContests

  const eventColor =
    props.gatheringType === 'mogako'
      ? mute_navy_color
      : event => (event.type === 'study' ? secondary_color : primary_color)

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
        events={events.map(event => ({
          id: event._id,
          title: event.title,
          date:
            props.gatheringType === 'mogako' ? event.datetime : event.createdAt,
          end: props.gatheringType === 'study' ? event.deadline : undefined,
          color:
            typeof eventColor === 'function' ? eventColor(event) : eventColor,
          extendedProps: { type: event.type },
        }))}
        eventClick={handleEventClick}
        timeZone="UTC"
        eventDidMount={info => {
          info.el.classList.add(styles.clickable)
          if (props.gatheringType === 'study') {
            info.el.innerHTML = `<div style="color: white;">${info.event.title}</div>`
          }
        }}
      />
    </>
  )
}
