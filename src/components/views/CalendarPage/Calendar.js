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
  let endpoints = ['/api/mogakos/get', '/api/studyContests/get']
  const [posts, setPosts] = useState({
    mogako: [],
    study: [],
    contest: [],
  })
  const events = posts[props.gatheringType] || [] // gatheringType에 따라 posts에서 이벤트 가져오기
  const eventColor =
    props.gatheringType === 'mogako'
      ? mute_navy_color
      : event => (event.type === 'study' ? secondary_color : primary_color)

      const recruitingClosed = post => {
        let datetime = post.type == 'mogako' ? post.datetime : post.deadline
        return (
          Date.now() > new Date(datetime) || post.registeredNum == post.maximumNum
        )
      }
    
      const recruiting = post => {
        let datetime = post.type == 'mogako' ? post.datetime : post.deadline
        return (
          Date.now() < new Date(datetime) && post.registeredNum < post.maximumNum
        )
      }

  useEffect(() => {
    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))

      .then(function (response) {
        let combinedPosts = response[0].data.concat(response[1].data)
        if (props.pastDeadline == 'all') {
          setPosts({
            mogako: combinedPosts.filter(post => post.type === 'mogako'),
            study: combinedPosts.filter(post => post.type === 'study'),
            contest: combinedPosts.filter(post => post.type === 'contest'),
          })
        } else if (props.pastDeadline) {
          const filteredPosts = combinedPosts.filter(recruitingClosed)
          setPosts({
            mogako: filteredPosts.filter(post => post.type === 'mogako'),
            study: filteredPosts.filter(post => post.type === 'study'),
            contest: filteredPosts.filter(post => post.type === 'contest'),
          })
        } else {
          const filteredPosts = combinedPosts.filter(recruiting)
          setPosts({
            mogako: filteredPosts.filter(post => post.type === 'mogako'),
            study: filteredPosts.filter(post => post.type === 'study'),
            contest: filteredPosts.filter(post => post.type === 'contest'),
          })
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
          events={events.map(event => ({
            id: event._id,
            title: event.title,
            date: event.datetime,
            color: mute_navy_color,
            extendedProps: { type: event.type }, // type을 extendedProps에 추가
          }))}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
          eventDidMount={info => {
            info.el.classList.add(styles.clickable)
          }}
        />
      )}

      {props.gatheringType === 'study' && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({
            id: event._id,
            title: event.title,
            start: event.createdAt,
            end: event.deadline,
            color: event.type === "study" ? secondary_color : primary_color,
            extendedProps: { type: event.type }, // type을 extendedProps에 추가
          }))}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러 설정
          eventContent={arg => {
            return { html: `<div>${arg.event.title}</div>` }; // 시간 없이 제목만 표시
          }}
          eventDidMount={info => {
            info.el.classList.add(styles.clickable)
          }}
        />
      )}   
      {props.gatheringType === 'contest' && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events.map(event => ({
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
          eventDidMount={info => {
            info.el.classList.add(styles.clickable)
          }}
        />
      )}   
    </>
  )
}
