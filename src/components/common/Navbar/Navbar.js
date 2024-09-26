import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import DesktopLogo from '../../constants/DesktopLogo'
import MobileLogo from '../../constants/MobileLogo'
import {
  Divider,
  MenuItem,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Notification from './Notification'

const pages = ['모집글', '캘린더', '모각코 맵']

export default function Navbar() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.userData && user.userData.isAuth !== undefined) {
      setIsAuth(user.userData.isAuth)
    }
  }, [user.userData])

  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenNavMenu = e => setAnchorElNav(e.currentTarget)
  const handleMenu = e => setAnchorEl(e.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleClose = () => setAnchorEl(null)
  const handleLogoClick = () => navigate('/')

  const logoutClick = () => {
    setAnchorEl(null)
    axios.get('/api/users/logout').then(res => {
      if (res.data.success) {
        navigate('/login')
        window.location.reload()
      } else {
        console.log(res.data)
        alert('로그아웃 실패')
      }
    })
  }

  const handlePageClick = page => {
    if (page === '모집글') {
      navigate('/')
    } else if (page === '캘린더') {
      navigate('/calendar')
    } else if (page === '모각코 맵') {
      navigate('/map')
    }
    handleCloseNavMenu()
  }

  return (
    <AppBar
      position="static"
      sx={{
        height: '80px',
        background: 'rgba(234, 221, 255, 0.75)',
        boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* 로고 */}
          <div className={styles.desktopLogo} onClick={handleLogoClick}>
            <DesktopLogo />
          </div>
          <div className={styles.mobileLogo} onClick={handleLogoClick}>
            <MobileLogo />
          </div>

          {isAuth ? (
            <>
              {/* mobile */}
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {pages.map(page => (
                    <MenuItem key={page} onClick={() => handlePageClick(page)}>
                      <Typography sx={{ textAlign: 'center' }}>
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              {/* desktop */}
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page, index) => (
                  <React.Fragment key={page}>
                    <Button
                      onClick={() => handlePageClick(page)}
                      sx={{ fontSize: '1.2rem' }}
                    >
                      {page}
                    </Button>
                    {index < pages.length - 1 && (
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                        sx={{ bgcolor: '#4f2f92', mx: '10px' }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Box>

              {/* profile */}
              <Box sx={{ flexGrow: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'black',
                      marginRight: '10px', // 이름과 프로필 사진 사이의 간격 조정
                    }}
                  >
                    {user.userData.name} 님
                  </Typography>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="primary"
                    onClick={handleMenu}
                  >
                    <AccountCircle sx={{ fontSize: 30 }} />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={handleClose}>내가 작성한 글</MenuItem>
                    <MenuItem onClick={logoutClick}>로그아웃</MenuItem>
                  </Menu>

                  <Notification userId={user.userData._id} />
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
