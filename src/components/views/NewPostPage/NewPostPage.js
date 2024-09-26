import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField, 
  Container, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  Select, 
  MenuItem, 
  Box, 
  Typography 
} from '@mui/material';
import Grid from '@mui/material/Grid2'; // Grid2 import 추가
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Auth from "../../../hoc/auth";

function NewPostPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [meetingType, setMeetingType] = useState('');

  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registrationData = {
      title,
      writer: user.userData._id,
      content: description,
      deadline,
      maximumNum: maxParticipants,
      type: purpose,
      method: meetingType,
    };

    try {
      const response = await axios.post('/api/studycontests/add', registrationData);
      console.log('등록 성공:', response.data);
      navigate('/');
    } catch (error) {
      console.error('등록 오류:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box mb={2}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', marginBottom: '20px', fontWeight: 'bold', fontSize: '24px' }}>모집 글 작성 (스터디 / 공모 및 대회)</Typography>
      </Box>
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <TextField
          label="내용"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ mb: 3 }}
        />

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid xs={6}>
            <TextField
              label="모집 마감일"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </Grid>

          <Grid xs={6}>
            <TextField
              label="모집 인원 수"
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">모임 목적</FormLabel>
          <RadioGroup
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            row
          >
            <FormControlLabel value="study" control={<Radio />} label="스터디" />
            <FormControlLabel value="contest" control={<Radio />} label="공모 및 대회" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>모임 방식</FormLabel>
          <Select
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
            required
          >
            <MenuItem value="온라인">온라인</MenuItem>
            <MenuItem value="오프라인">오프라인</MenuItem>
            <MenuItem value="온/오프 병행">온/오프 병행</MenuItem>
            <MenuItem value="미정">미정</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth={false}
          sx={{
            padding: '8px 20px',
            fontsize: '14px',
            backgroundColor: '#E80080',
            color: 'white',
            display: 'block',
            margin: '20px auto',
            '&:hover': {
              backgroundColor: '#E80080',
            },          
          }}
        >
          등록
        </Button>
      </form>
    </Container>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default Auth(NewPostPage, true);
