import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function NewPostPagemok() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const registrationData = {
      title,
      description,
      date,
      location,
      maxParticipants,
    };

    console.log('등록 정보:', registrationData);
  };

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'left',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        모집 글 작성 ( 모각코 )
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
          fullWidth
        />

        <Box sx={{ display: 'flex', gap: '20px', mb: 3 }}>
          <TextField
            label="날짜"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            sx={styles.smallInput}
          />

          <TextField
            label="장소"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            sx={styles.smallInput}
          />
        </Box>

        <TextField
          label="모집 인원 수"
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          required
          InputProps={{ inputProps: { min: 1 } }}
          sx={styles.smallInput}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            padding: '8px 20px',
            fontSize: '14px',
            backgroundColor: '#E80080',
            color: '#fff',
            display: 'block',
            margin: '20px auto',
            '&:hover': {
              backgroundColor: '#d40070',
            },
          }}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  smallInput: {
    flex: 1,
  },
};
