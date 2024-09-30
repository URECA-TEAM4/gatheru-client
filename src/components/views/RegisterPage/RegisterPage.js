import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../../styles/theme'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../_actions/user_action'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [generation, setGeneration] = useState('')
  const [group, setGroup] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onHandleChange = e => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    else if (name === 'name') setName(value)
    else if (name === 'password') setPassword(value)
    else if (name === 'confirmPassword') setConfirmPassword(value)
    else if (name === 'generation') setGeneration(value)
    else if (name === 'group') setGroup(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
    }

    const body = {
      name: name,
      email: email,
      password: password,
      generation: generation,
      group: group,
    }

    dispatch(registerUser(body)).then(res => {
      if (res.payload.success) {
        navigate('/login')
      } else {
        alert('회원가입에 실패하셨습니다.')
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={name}
                  onChange={onHandleChange}
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="이름"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={onHandleChange}
                  type="email"
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={onHandleChange}
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  autoComplete="new-password"
                />
                <TextField
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onHandleChange}
                  margin="normal"
                  required
                  fullWidth
                  label="비밀번호 확인"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                  <InputLabel id="demo-select-small-label">
                    유레카 기수
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="generation"
                    value={generation}
                    label="유레카 기수"
                    onChange={onHandleChange}
                    required
                  >
                    <MenuItem value={1}>1기</MenuItem>
                    <MenuItem value={2}>2기</MenuItem>
                    <MenuItem value={3}>3기</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                  <InputLabel id="demo-select-small-label">클래스</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    name="group"
                    value={group}
                    label="클래스"
                    onChange={onHandleChange}
                    required
                  >
                    <MenuItem value={1}>프론트 대면</MenuItem>
                    <MenuItem value={2}>프론트 비대면</MenuItem>
                    <MenuItem value={3}>백엔드 대면</MenuItem>
                    <MenuItem value={4}>백엔드 비대면</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
