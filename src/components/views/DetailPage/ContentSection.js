import React from 'react'
import { Box, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

function ContentSection(props) {
  return (
    <>
      {' '}
      {props.type == 'mogako' ? (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, mb: 1 }}>
            <LocationOnOutlinedIcon />{' '}
            <Typography sx={{ ml: 1 }}>{props.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarMonthOutlinedIcon />{' '}
            <Typography sx={{ ml: 1 }}>
              {new Date(props.datetime).toLocaleString([], {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ my: 1 }}>방식: {props.method}</Typography>
          <Typography>
            마감:{' '}
            {new Date(props.studyContestDateTime).toLocaleString([], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </>
      )}
      <Typography sx={{ my: 1 }}>
        모집현황: {props.registeredNum} / {props.maximumNum}
      </Typography>
      <Typography variant="body1" sx={{ my: 3, lineHeight: 2 }}>
        {props.content}
      </Typography>
    </>
  )
}

export default ContentSection
