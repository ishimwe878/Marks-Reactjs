import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './component/Navbar.jsx';
import Spinner from './component/Spinner.jsx';
import Home from './component/Home.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Footer from './component/Footer.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Forgot from './pages/Forgot.jsx';
import ResetPassword from './pages/ResetPassword.jsx';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoginOrRegisterPage =
    window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/teacher'
    || window.location.pathname === '/student';

  return (
    <Router>
      <div className="App">
        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Conditionally render Navbar and Footer */}
            {!isLoginOrRegisterPage && <Navbar />}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                <Route path="/forgot" element={<Forgot />} />
                <Route path="/reset" element={<ResetPassword />} />

                <Route path="/teacher" element={<TeacherDashboard />} />

                <Route path="/student" element={<StudentDashboard />} />

              </Routes>
            </div>
            {!isLoginOrRegisterPage && <Footer />}
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
