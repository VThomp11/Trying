// ExampleComponent.js
import React from 'react';
import { useAuth } from './AuthProvider';

const ExampleComponent = () => {
    const { state, dispatch } = useAuth();

    const handleLogout = () => {
        // Dispatch a logout action
        dispatch({ type: 'LOGOUT' });
        // Call your server logout endpoint if needed
    };

    return (
        <div>
            {state.isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <p>You are not logged in</p>
            )}
        </div>
    );
};

export default ExampleComponent;

