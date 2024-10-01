import React, { useState, useEffect } from 'react';
import { Box, Container, Button, Stack, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GatherToggleButton from '../../common/ToggleButton/GatherToggleButton'; // 경로는 적절히 수정하세요
import Post from '../MainPage/Post'; // Post 컴포넌트 임포트 추가

function MyPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [sorting, setSorting] = useState('최신순');
  const [gatheringType, setGatheringType] = useState(['mogako']); 
  const navigate = useNavigate();

  // 서버에서 내가 작성한 글 목록을 가져오는 함수
  useEffect(() => {
    axios.get("/api/posts/myposts") // 로그인된 사용자의 글을 가져옴
      .then(response => {
        const filteredPosts = response.data.filter(post => gatheringType.includes(post.type)); // 카테고리 필터링
        setMyPosts(filteredPosts); // 필터링된 데이터 설정
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
  }, [gatheringType]); // gatheringType이 변경될 때마다 재실행

  const handleSortingChange = e => {
    setSorting(e.target.value);
  };

  const handleNewPostClick = () => {
    navigate('/newpost');
  };

  const sortedPosts = [...myPosts].sort((a, b) => {
    return sorting === '최신순'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  const handleGatheringType = (data) => {
    setGatheringType(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ width: '100%' }}>
        <h2> 내가 작성한 글 </h2>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <GatherToggleButton sendDataToTab={handleGatheringType} />
          <Button
            sx={{ color: 'white', backgroundColor: '#38406B', borderRadius: 3 }}
            onClick={handleNewPostClick}
          >
            글 쓰기
          </Button>
        </Box>

        <Stack direction="row" justifyContent="end" sx={{ mt: 1 }}>
          <FormControl size="small">
            <Select
              id="sorting"
              value={sorting}
              onChange={handleSortingChange}
              sx={{ borderRadius: 3, fontSize: 15 }}
            >
              <MenuItem value="최신순">최신순</MenuItem>
              <MenuItem value="등록순">등록순</MenuItem>
            </Select>
          </FormControl>
        </Stack>

          <Box sx={{my:2}}>
            {sortedPosts.map(post => {
              const isClosed = post.type === 'mogako' 
                ? new Date(post.datetime) < new Date()
                : new Date(post.deadline) < new Date();
                
              return (
                <Post
                  key={post._id}
                  id={post._id}
                  postType={post.type}
                  title={post.title}
                  content={post.content}
                  location={post.location}
                  datetime={post.type === 'mogako' ? post.datetime : post.deadline}
                  method={post.type !== 'mogako' ? post.method : ''}
                  closed={isClosed} // 모집 마감 여부를 전달
                />
              );
            })}
          </Box>
      </Box>
    </Container>
  );
}

export default MyPage;
