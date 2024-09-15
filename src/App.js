import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import MainPage from "./components/views/MainPage/MainPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CalendarPage from "./components/views/CalendarPage/CalendarPage";
import MyPage from "./components/views/MyPage/MyPage";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/common/theme';
import RegisterTabs from "./components/common/Tabs/NewPost_Tab";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/newpost" element={<RegisterTabs/>} />
    </Routes>
  </Router>
  </ThemeProvider>
    );
}

export default App;
