import React, { useState, useEffect } from "react";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [token, setToken] = useState("");
    const [requirements, setRequirements] = useState({
        lengthReq: false,
        upperReq: false,
        lowerReq: false,
        numberReq: false,
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get("token");
        if (!tokenParam) {
            setErrorMessage("Invalid or missing reset token");
        } else {
            setToken(tokenParam);
        }
    }, []);

    const validatePassword = (value) => {
        setRequirements({
            lengthReq: value.length >= 8,
            upperReq: /[A-Z]/.test(value),
            lowerReq: /[a-z]/.test(value),
            numberReq: /[0-9]/.test(value),
        });
    };

    const handlePasswordToggle = (inputId) => {
        const input = document.getElementById(inputId);
        if (input) {
            input.type = input.type === "password" ? "text" : "password";
        }
    };

    const handleResetPassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const isValid = Object.values(requirements).every(Boolean);
        if (!isValid) {
            setErrorMessage("Please meet all password requirements");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            if (!response.ok) {
                throw new Error(
                    response.status === 403
                        ? "Invalid or expired reset token"
                        : "Failed to reset password. Please try again."
                );
            }

            setSuccessMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.lockIcon}>
                    <i className="fas fa-lock" style={styles.lockIconInner}></i>
                </div>
                <h2 style={styles.heading}>Reset Password</h2>
                <p style={styles.text}>Enter your new password below</p>

                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        id="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        style={styles.input}
                    />
                    <i
                        className="far fa-eye"
                        onClick={() => handlePasswordToggle("password")}
                        style={styles.eyeIcon}
                    ></i>
                </div>

                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                    <i
                        className="far fa-eye"
                        onClick={() => handlePasswordToggle("confirmPassword")}
                        style={styles.eyeIcon}
                    ></i>
                </div>

                <div style={styles.requirements}>
                    {Object.entries(requirements).map(([key, isValid]) => (
                        <div
                            key={key}
                            style={{
                                ...styles.requirement,
                                color: isValid ? "#2e7d32" : "#666",
                            }}
                        >
                            <i
                                className="fas fa-circle"
                                style={{
                                    marginRight: "0.5rem",
                                    color: isValid ? "#2e7d32" : "#ddd",
                                }}
                            ></i>
                            {key === "lengthReq"
                                ? "At least 8 characters"
                                : key === "upperReq"
                                    ? "One uppercase letter"
                                    : key === "lowerReq"
                                        ? "One lowercase letter"
                                        : "One number"}
                        </div>
                    ))}
                </div>

                {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                {successMessage && <div style={styles.successMessage}>{successMessage}</div>}

                <button
                    onClick={handleResetPassword}
                    style={styles.button}
                    disabled={!token || !password || !confirmPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
    },
    card: {
        background: "white",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
    },
    lockIcon: {
        background: "#e3f2fd",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 1rem",
    },
    lockIconInner: {
        fontSize: "1.5rem",
        color: "#1976d2",
    },
    heading: {
        color: "#1d1d1d",
        marginBottom: "0.5rem",
    },
    text: {
        color: "#666",
        marginBottom: "1.5rem",
    },
    inputGroup: {
        marginBottom: "1rem",
        position: "relative",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        outline: "none",
        transition: "border-color 0.2s",
        fontSize: "1rem",
    },
    eyeIcon: {
        position: "absolute",
        right: "1rem",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#666",
    },
    requirements: {
        textAlign: "left",
        marginBottom: "1rem",
    },
    requirement: {
        fontSize: "0.875rem",
        display: "flex",
        alignItems: "center",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        background: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "0.5rem",
        cursor: "pointer",
        fontWeight: "500",
        transition: "background-color 0.2s",
        fontSize: "1rem",
    },
    errorMessage: {
        color: "#d32f2f",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
    successMessage: {
        color: "#2e7d32",
        marginTop: "0.5rem",
        fontSize: "0.875rem",
    },
};

export default ResetPassword;
