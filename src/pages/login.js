import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginstyle.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false); // State to manage error popup
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Make a POST request to the Spring Boot backend
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                console.log('Login successful');
                // Redirect to the home page
                navigate('/home');
            } else {
                console.error('Login failed');
                // Display error popup
                setShowError(true);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            // Handle other errors, e.g., network issues
        }
    };

    return (
        <div className='login-page'>
            <div>
                <h2>Login</h2>
                <form>
                    <div>
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </form>
                {showError && (
                    <div className="error-popup" >
                        <h2 >Invalid username or password. Please try again.</h2>
                        <button onClick={() => setShowError(false)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
