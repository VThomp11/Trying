// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                username,
                password,
            });

            // Assuming your login API returns the username on success
            const loggedInUsername = response.data.username;

            // Update the user context with the logged-in user
            login(loggedInUsername);
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
