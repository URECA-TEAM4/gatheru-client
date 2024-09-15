import React, { useState } from 'react';
import { Button, Box, Typography, Card, CardContent } from '@mui/material';

function MyPage() {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const buttonStyles = (isActive) => ({
    backgroundColor: isActive ? '#E80080' : '#d3d3d3',
    borderRadius: '50px', 
    margin: '3px', 
    padding: '5px 20px',
    '&:hover': {
      backgroundColor: isActive ? '#E80080' : '#E80080',
    },
  });

  const posts = [
    { title: '한번만 모여주세요 제발', content: '강남역에서 모각코 해볼 예정입니다.', extraInfo: '모임 장소: 강남역', date: '2024-09-20' },
    { title: '스터디 모집', content: 'CS 면접 대비 스터디 모집합니다.', extraInfo: '온라인', date: '2024-10-01' },
    { title: '공모전 모집', content: '해커톤 같이 나갈 사람', extraInfo: '', date: '2024-09-25' },
  ];

  return (
    <div style={styles.container}>
      <h2> 내가 작성한 글 </h2>
      <Box>
        {["모각코", "스터디", "공모 및 대회"].map((label, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleClick(index)}
            sx={buttonStyles(activeButton === index)}
          >
            {label}
          </Button>
        ))}
      </Box>
        
      <Box sx={{ marginTop: '30px' }}>
        {posts.map((post, index) => (
          <Card key={index} sx={{ marginBottom: '20px', borderRadius: '10px', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
              {post.extraInfo && (
                <Typography variant="body2" color="text.primary" sx={{ marginTop: '10px' }}>
                  {post.extraInfo}
                </Typography>
              )}
              {/* 모임 날짜 표시 */}
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: '10px' }}>
                날짜: {post.date}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
};

export default MyPage;
