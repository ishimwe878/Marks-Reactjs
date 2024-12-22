import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/TeacherDashboard.css";


const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState({ subjects: [] }); // Default structure
  const [students, setStudents] = useState([]); // Default to an empty array
  const teacherId = "98765"; // Replace with dynamic teacher ID logic if needed

  // Fetch teacher details on component load
  useEffect(() => {
    axios
      .get(`/api/teachers/${teacherId}`)
      .then((response) => {
        setTeacherData(response.data || { subjects: [] }); // Ensure default structure
      })
      .catch((error) => {
        console.error("Error fetching teacher data:", error);
      });
  }, [teacherId]);

  // Fetch students for the teacher
  useEffect(() => {
    axios
      .get(`/api/teachers/${teacherId}/students`)
      .then((response) => {
        const data = response.data;
        setStudents(Array.isArray(data) ? data : []); // Ensure it is an array
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setStudents([]); // Fallback to an empty array on error
      });
  }, [teacherId]);

  // Function to update marks for a student
  const updateMarks = (studentId, newMarks) => {
    axios
      .put(`/api/students/${studentId}/marks`, null, { params: { marks: newMarks } })
      .then((response) => {
        const updatedStudent = response.data;
        setStudents((prev) =>
          prev.map((student) =>
            student.id === updatedStudent.id ? { ...student, marks: updatedStudent.marks } : student
          )
        );
      })
      .catch((error) => {
        console.error("Error updating marks:", error);
      });
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button className="logout-button" onClick={() => localStorage.clear() && window.location.reload()}>Logout</button>
      </div>
      {teacherData.name ? (
        <>
          <h2>Welcome, {teacherData.name}</h2>
          <div className="teacher-info">
            <p><strong>ID:</strong> {teacherData.id || "N/A"}</p>
            <p><strong>Email:</strong> {teacherData.email || "N/A"}</p>
            <p><strong>Subjects:</strong> {teacherData.subjects.length > 0 ? teacherData.subjects.join(", ") : "None"}</p>
          </div>
        </>
      ) : (
        <p>Loading teacher details...</p>
      )}

      <div className="student-management">
        <h3>Manage Students</h3>
        <table className="students-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id || "N/A"}</td>
                  <td>{student.name || "N/A"}</td>
                  <td>{student.subject || "N/A"}</td>
                  <td>{student.marks || "N/A"}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => {
                        const newMarks = prompt(
                          `Update marks for ${student.name}:`,
                          student.marks
                        );
                        if (newMarks !== null && !isNaN(newMarks)) {
                          updateMarks(student.id, parseInt(newMarks, 10));
                        }
                      }}
                    >
                      Edit Marks
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherDashboard;
