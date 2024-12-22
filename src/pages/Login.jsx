import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/images/logooo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorAlert, setErrorAlert] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.trim())) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorAlert('');
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                const { token } = response.data;
                if (token) {
                    localStorage.setItem('authToken', token);

                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    const jsonPayload = JSON.parse(atob(base64));

                    localStorage.setItem('loggedUser', JSON.stringify({
                        email: jsonPayload.sub,
                        role: jsonPayload.role,
                    }));

                    if (jsonPayload.role === 'TEACHER') {
                        window.location.href = '/teacher';
                    } else if (jsonPayload.role === 'STUDENT') {
                        window.location.href = '/student';
                    } else {
                        window.location.href = '/';
                    }
                } else {
                    throw new Error('Token not defined in the response.');
                }
            }
        } catch (error) {
            const message = error.response?.status === 401
                ? 'Invalid email or password. Please try again.'
                : error.message || 'An error occurred while logging in. Please try again.';
            setErrorAlert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg rounded-lg bg-white p-5" style={{ maxWidth: '900px' }}>
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary text-white rounded-start">
                    <h3 className="text-center">Welcome Back!</h3>
                </div>
                <div className="col-lg-6 p-4">
                    <div className="text-center mb-4">
                        <img src={logo} width="100px" alt="Logo" />
                        <h5 className="mt-3">Login to Your Account</h5>
                    </div>
                    {errorAlert && <div className="alert alert-danger">{errorAlert}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                className={`form-control ${emailError ? 'is-invalid' : ''}`}
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <div className="invalid-feedback">{emailError}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input" id="rememberMe" />
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <Link to='/forgot' className="text-primary">Forgot password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        <div className="text-center mt-3">or login with</div>
                        <div className="d-flex justify-content-center mt-2">
                            <a href="#" className="btn btn-outline-primary mx-1">
                                <i className="fa fa-facebook"></i>
                            </a>
                            <a href="#" className="btn btn-outline-danger mx-1">
                                <i className="fa fa-google"></i>
                            </a>
                            <a href="#" className="btn btn-outline-info mx-1">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </div>
                        <div className="text-center mt-4">
                            Don't have an account? <Link to='/signup' className="text-primary">Register here</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
