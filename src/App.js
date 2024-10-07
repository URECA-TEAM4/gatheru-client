import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import MainPage from "./components/views/MainPage/MainPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CalendarPage from "./components/views/CalendarPage/CalendarPage";
import MyPage from "./components/views/MyPage/MyPage";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/styles/theme";
import MapPage from "./components/views/MapPage/MapPage";
import DetailPage from "./components/views/DetailPage/DetailPage";
import NewpostTab from "./components/common/Tabs/NewPost_Tab";
import Footer from "./components/common/Footer/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/detail/:type/:postId" element={<DetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/newpost" element={<NewpostTab />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
