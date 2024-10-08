import React from 'react';
import './Input.css';
import { TextField, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function Input(props) {
  const { size = 'medium', ...rest } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        {...rest}
        label="제목"
        required
        fullWidth
        sx={{
          mb: 3,
          height: size === 'small' ? '2rem' : size === 'medium' ? '2.5rem' : '3rem',
          fontSize: size === 'small' ? '0.875rem' : size === 'medium' ? '1rem' : '1.25rem',
        }}
      />
    </ThemeProvider>
  );
}

export default Input;