import React, { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import GatherToggleButton from '../../common/ToggleButton/GatherToggleButton';

function MyPage() {
  const [gatheringType, setGatheringType] = useState('모각코');

  const posts = [
    { title: '한번만 모여주세요 제발', content: '강남역에서 모각코 해볼 예정입니다.', extraInfo: '모임 장소: 강남역', date: '2024-09-20' },
    { title: '스터디 모집', content: 'CS 면접 대비 스터디 모집합니다.', extraInfo: '온라인', date: '2024-10-01' },
    { title: '공모전 모집', content: '해커톤 같이 나갈 사람', extraInfo: '', date: '2024-09-25' },
  ];

  const filteredPosts = posts.filter(post => {
    if (gatheringType === '모각코') return post.title.includes('모각코');
    if (gatheringType === '스터디') return post.title.includes('스터디');
    if (gatheringType === '공모 및 대회') return post.title.includes('공모전');
    return true;
  });

  return (
    <div style={styles.container}>
      <h2> 내가 작성한 글 </h2>
      <Box>
        <GatherToggleButton gatheringType={gatheringType} setGatheringType={setGatheringType} />
      </Box>

      <Box sx={{ marginTop: '30px' }}>
        {filteredPosts.map((post, index) => (
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