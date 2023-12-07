// WelcomeMessage.js
import React from 'react';
import { useUser } from './UserContext';

const WelcomeMessage = () => {
    const { user } = useUser();

    return user ? <p>Welcome,you are now logged in!</p> : null;
};

export default WelcomeMessage;
