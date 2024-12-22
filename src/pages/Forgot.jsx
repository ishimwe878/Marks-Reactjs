import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleResetPassword = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        if (!email) {
            setErrorMessage("Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const contentType = response.headers.get("content-type");
            let data;

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                try {
                    data = JSON.parse(text);
                } catch {
                    throw new Error(text || "Unexpected server response");
                }
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to send reset email");
            }

            setSuccessMessage(data.message || "Password reset email sent successfully!");
            setEmail("");
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconContainer}>
                    <i className="fas fa-lock" style={styles.icon}></i>
                </div>
                <h2 style={styles.heading}>Forgot Password?</h2>
                <p style={styles.description}>
                    Enter your email address, and we'll help you reset your password.
                </p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={styles.input}
                />
                {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
                {successMessage && <div style={styles.successMessage}>{successMessage}</div>}
                <button
                    onClick={handleResetPassword}
                    style={styles.button}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Reset Password"}
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
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        padding: "1rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxWidth: "400px",
        textAlign: "center",
        width: "100%",
    },
    iconContainer: {
        background: "#e3f2fd",
        borderRadius: "50%",
        padding: "1rem",
        display: "inline-block",
        marginBottom: "1rem",
    },
    icon: {
        fontSize: "1.5rem",
        color: "#1976d2",
    },
    heading: {
        fontSize: "1.5rem",
        color: "#1976d2",
        marginBottom: "0.5rem",
    },
    description: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "1rem",
    },
    input: {
        width: "100%",
        padding: "0.75rem",
        border: "1px solid #ddd",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        fontSize: "1rem",
        outline: "none",
        transition: "0.3s",
    },
    inputFocus: {
        borderColor: "#1976d2",
    },
    button: {
        width: "100%",
        padding: "0.75rem",
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "0.5rem",
        fontSize: "1rem",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
    },
    buttonHover: {
        background: "#1565c0",
    },
    errorMessage: {
        color: "#d32f2f",
        fontSize: "0.875rem",
        marginTop: "0.5rem",
    },
    successMessage: {
        color: "#2e7d32",
        fontSize: "0.875rem",
        marginTop: "0.5rem",
    },
};

export default ForgotPassword;
