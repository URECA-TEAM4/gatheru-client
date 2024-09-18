import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { secondary_color } from '../../constants/colors'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

function Post(props) {
  const [pastDeadline, setPastDeadline] = useState(false)

  useEffect(() => {
    if (Date.now() > new Date(props.datetime)) setPastDeadline(true)
  }, [])

  return (
    <Card sx={{ borderRadius: 5, mb: 3 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            {pastDeadline ? (
              <Box
                sx={{
                  borderRadius: 5,
                  bgcolor: '#EADDFF',
                  color: 'gray',
                  height: '30px',
                  padding: 1,
                  mr: 1,
                }}
              >
                모집 마감
              </Box>
            ) : (
              <Box
                sx={{
                  borderRadius: 5,
                  bgcolor: secondary_color,
                  color: 'white',
                  height: '30px',
                  padding: 1,
                  mr: 1,
                }}
              >
                모집중
              </Box>
            )}

            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.content}
          </Typography>

          {props.postType == 'mogako' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <LocationOnOutlinedIcon />{' '}
                <Typography sx={{ ml: 1 }}>{props.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthOutlinedIcon />{' '}
                <Typography sx={{ ml: 1 }}>
                  {new Date(props.datetime).toLocaleString('ko-KR', {
                    timeZone: 'UTC',
                  })}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ my: 1 }}>방식: {props.method}</Typography>
              <Typography>
                마감:{' '}
                {new Date(props.datetime).toLocaleString('ko-KR', {
                  timeZone: 'UTC',
                })}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post
