import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { secondary_color } from '../../constants/colors';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useNavigate } from 'react-router-dom';

function Post(props) {
  const navigate = useNavigate();
  const [postClosed, setPostClosed] = useState(false);

  // 게시물 상태(모집 마감 여부)를 설정하는 로직
  useEffect(() => {
    const isPastDeadline = Date.now() > new Date(props.datetime); // 마감일이 지났는지 확인
    const isFull = props.registeredNum >= props.maximumNum; // 등록 인원이 최대 인원과 같은지 확인

    if (isPastDeadline || isFull) {
      setPostClosed(true); // 마감일이 지났거나 등록 인원이 꽉 찼으면 모집 마감 상태로 설정
    }
  }, [props.datetime, props.registeredNum, props.maximumNum]);

  return (
    <Card
      sx={{ borderRadius: 5, mb: 3 }}
      onClick={() => {
        navigate(`/detail/${props.postType}/${props.id}`);
      }}
    >
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            {postClosed ? (
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
            {props.content.length > 200
              ? `${props.content.substring(0, 200)}...`
              : props.content}
          </Typography>

          {props.postType === 'mogako' ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
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
                {new Date(props.datetime).toLocaleString([], {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Post;
