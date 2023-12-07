// RegistrationForm.js

import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                username,
                password,
            });

            console.log(response.data); // Handle success
        } catch (error) {
            console.error('Registration error:', error); // Handle error
        }
    };

    return (
        <form onSubmit={handleRegistration}>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
