import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ItemDetail from './itemDetails';
import EditForm from './EditForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ItemDetail />} />
            <Route path="/edit/:id" element={<EditForm />} />
        </Routes>
    );
};

export default AppRoutes;
