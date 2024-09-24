import React, { useState, useEffect } from 'react';
import { Box, Container, Tabs, Tab, Button, Stack, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GatherToggleButton from '../../common/ToggleButton/GatherToggleButton'; // 경로는 적절히 수정하세요
import Post from '../MainPage/Post'; // Post 컴포넌트 임포트 추가

function MyPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [value, setValue] = useState(0);
  const [sorting, setSorting] = useState('최신순');
  const [gatheringType, setGatheringType] = useState(['mogako']);
  const navigate = useNavigate();

  // 서버에서 내가 작성한 글 목록을 가져오는 함수
  useEffect(() => {
    axios.get("/api/posts/myposts")
      .then(response => {
        console.log(response.data); // 서버에서 받은 데이터 확인
        const filteredPosts = response.data.filter(post => gatheringType.includes(post.type));
        console.log(filteredPosts); // 필터링된 데이터 확인
        setMyPosts(filteredPosts); // 필터링된 데이터 설정
      })
      .catch(error => {
        console.error('Failed to fetch posts:', error);
      });
  }, [gatheringType]); // gatheringType이 변경될 때마다 재실행

  const handleSortingChange = e => {
    setSorting(e.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    console.log(data);
    setGatheringType(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Box sx={{ width: '100%' }}>
        <h2> 내가 작성한 글 </h2>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="전체" />
            <Tab label="모집중" />
            <Tab label="모집 완료" />
          </Tabs>
        </Box>

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
          {sortedPosts.map(post => (
            <Post
              key={post._id}
              id={post._id}
              postType={post.type}
              title={post.title}
              content={post.content}
              location={post.location}
              datetime={post.type === 'mogako' ? post.datetime : post.deadline}
              method={post.type !== 'mogako' ? post.method : ''}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default MyPage;
