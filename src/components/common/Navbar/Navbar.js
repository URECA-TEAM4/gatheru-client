import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../Logo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const pages = ["모집글 ", "캘린더"];
export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="static"
      sx={{
        height: "89px",
        flexShrink: 0,
        marginTop: "-7px",
        background: "rgba(234, 221, 255, 0.75)",
        boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* 로고 */}
          <div className={styles.desktopLogo}>
            <Logo />
          </div>
          <div className={styles.mobileLogo}>
            <Logo />
          </div>
          {/* mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <React.Fragment key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  className={styles.pageButton}
                  sx={{
                    my: 2,
                    fontSize: "1.3rem",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
                {index < pages.length - 1 && <div className={styles.divider} />}
              </React.Fragment>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <div>
              <svg
                onClick={handleMenu}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <g clipPath="url(#clip0_48_2114)">
                  <path
                    d="M21.375 11.25C21.375 12.7418 20.7429 14.1726 19.6176 15.2275C18.4924 16.2824 16.9663 16.875 15.375 16.875C13.7837 16.875 12.2576 16.2824 11.1324 15.2275C10.0071 14.1726 9.375 12.7418 9.375 11.25C9.375 9.75816 10.0071 8.32742 11.1324 7.27252C12.2576 6.21763 13.7837 5.625 15.375 5.625C16.9663 5.625 18.4924 6.21763 19.6176 7.27252C20.7429 8.32742 21.375 9.75816 21.375 11.25Z"
                    fill="#4F2F92"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM15 1.875C12.5283 1.87513 10.1069 2.57318 8.01451 3.8888C5.92207 5.20442 4.24366 7.08414 3.17243 9.31161C2.10121 11.5391 1.68072 14.0238 1.95937 16.4797C2.23802 18.9356 3.20447 21.2629 4.7475 23.1938C6.07875 21.0487 9.00938 18.75 15 18.75C20.9906 18.75 23.9194 21.0469 25.2525 23.1938C26.7955 21.2629 27.762 18.9356 28.0406 16.4797C28.3193 14.0238 27.8988 11.5391 26.8276 9.31161C25.7563 7.08414 24.0779 5.20442 21.9855 3.8888C19.8931 2.57318 17.4717 1.87513 15 1.875Z"
                    fill="#4F2F92"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_48_2114">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>내가 작성한 글</MenuItem>
                <MenuItem onClick={handleClose}>로그아웃</MenuItem>
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
