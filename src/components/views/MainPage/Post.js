import React, { useState } from 'react'
import { Box } from '@mui/material'
import { secondary_color } from '../../constants/colors'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'

function Post(props) {
  return (
    <Card sx={{ borderRadius: 5, mb: 3 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            {props.pastDeadline ? (
              <Box
                sx={{
                  height: 15,
                  borderRadius: 5,
                  bgcolor: '#EADDFF',
                  color: 'gray',
                  padding: 1.2,
                  mr: 1,
                }}
              >
                모집 마감
              </Box>
            ) : (
              <Box
                sx={{
                  height: 15,
                  borderRadius: 5,
                  bgcolor: secondary_color,
                  color: 'white',
                  padding: 1.2,
                  mr: 1,
                }}
              >
                모집중
              </Box>
            )}

            <Typography gutterBottom variant="h6" component="div">
              강남역에서 모각코 할 분 구합니다.
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>

          {props.postType == 'mogako' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <LocationOnOutlinedIcon />{' '}
                <Typography sx={{ ml: 1 }}>서울 강남역</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthOutlinedIcon />{' '}
                <Typography sx={{ ml: 1 }}>2024-09-30 14:00 - 15:00</Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography sx={{ my: 1 }}>방식: 온라인</Typography>
              <Typography>마감: 2024-09-12 15:00</Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Post
