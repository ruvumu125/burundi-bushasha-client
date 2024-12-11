import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import RegisterFan from './pages/register/Register';
import RegisterMember from './pages/member/Register';
import RegisterCandidate from './pages/candidate/Register';
import RegisterVolunteer from './pages/volunteer/Register';
import RegisterParrain from './pages/parrain/Register';
import Post from './pages/posts/Post';
import Profile from './pages/profile/Profile';
import Progress from './pages/Progress';
import Sidebar from './pages/Sidebar';
import ErrorPage from './pages/error/Error404';
import Publications from './pages/Publications';
import Calendrier from './pages/Calendrier';
import Fondateur from './pages/Fondateur';
import Vision from './pages/Vision';
import {AuthProvider} from "./components/auth/AuthContext.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailVerification from "./pages/email-verification/EmailVerification.jsx";


function App() {

  return (
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email/:token" element={<EmailVerification />} />
            <Route path="/register" element={<RegisterFan />} />
            <Route path="/member-register" element={<RegisterMember />} />
            <Route path="/volunteer-register" element={<RegisterVolunteer />} />
            <Route path="/candidate-register" element={<RegisterCandidate />} />
            <Route path="/parrain-register" element={<RegisterParrain />} />
            <Route path="/post" element={<Post />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/fondateur" element={<Fondateur />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

  );
}

export default App;      
