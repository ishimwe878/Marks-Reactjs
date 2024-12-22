import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../assets/images/logooo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: 'STUDENT', // Default role
        termsAccepted: false
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // Full name validation
        if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
            errors.fullName = 'Full name must be at least 2 characters long';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!formData.password || !passwordRegex.test(formData.password)) {
            errors.password = 'Password must be at least 6 characters long and contain both letters and numbers';
            isValid = false;
        }

        // Terms acceptance validation
        if (!formData.termsAccepted) {
            errors.terms = 'You must agree to the terms and conditions';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const registrationData = {
                email: formData.email.trim(), // Ensure it matches the backend field
                password: formData.password, // Backend requires this
                username: formData.fullName.trim(), // Map fullName to username
                role: formData.role // Optional; backend will default if omitted
            };

            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData)
            });

            if (response.ok) {
                setSuccessMessage('Registration successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData?.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row shadow-lg rounded-lg bg-white p-5" style={{ maxWidth: '900px' }}>
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary text-white rounded-start">
                    <h3 className="text-center">Join Us Today!</h3>
                </div>
                <div className="col-lg-6 p-4">
                    <div className="text-center mb-4">
                        <img src={logo} width="100px" alt="Logo" />
                        <h5 className="mt-3">Create an Account</h5>
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                className="form-check-input"
                                id="terms"
                                checked={formData.termsAccepted}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="terms">
                                I agree to the <Link to="#">terms & conditions</Link>
                            </label>
                            {errors.terms && <div className="text-danger small">{errors.terms}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                        <div className="text-center mt-3">
                            <p>
                                Already have an account? <Link to="/login">Login here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
