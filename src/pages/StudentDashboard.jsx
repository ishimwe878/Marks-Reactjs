import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/StudentDashboard.css"; // Import the CSS file for styling

const StudentDashboard = () => {
    const [studentData, setStudentData] = useState({ subjects: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const studentId = "S12345"; // Replace with dynamic student ID retrieval logic

    // Fetch student details on component load
    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/students/${studentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                setStudentData(response.data || { subjects: [] });
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
                setError("Failed to load student details. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [studentId]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="student-dashboard">
            <header className="dashboard-header">
                <h1>Student Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <main className="dashboard-content">
                {loading ? (
                    <p className="loading-message">Loading student details...</p>
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : (
                    studentData && (
                        <>
                            <div className="student-info">
                                <h2>Welcome, {studentData.name || "Student"}</h2>
                                <p><strong>ID:</strong> {studentData.id || "N/A"}</p>
                                <p><strong>Email:</strong> {studentData.email || "N/A"}</p>
                            </div>

                            <div className="subjects-section">
                                <h3>Your Subjects and Marks</h3>
                                {studentData.subjects && studentData.subjects.length > 0 ? (
                                    <table className="subjects-table">
                                        <thead>
                                            <tr>
                                                <th>Subject</th>
                                                <th>Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentData.subjects.map((subject, index) => (
                                                <tr key={index}>
                                                    <td>{subject.name || "N/A"}</td>
                                                    <td>{subject.marks || "N/A"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No subjects available.</p>
                                )}
                            </div>
                        </>
                    )
                )}
            </main>
        </div>
    );
};

export default StudentDashboard;
