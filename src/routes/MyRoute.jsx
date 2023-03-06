import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'

const MyRoute = ({ isLogin }) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/main' element={<MainPage />} />
                <Route path="*" element={<Navigate to={'/main'} />} />
                <Route path='/login' element={<Navigate to={'/main'} />} />
                <Route path='/' element={<Navigate to={'/main'} />} />
            </Routes>
        );
    }
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/main' element={<Navigate to={'/login'} />} />
            <Route path="*" element={<Navigate to={'/login'} />} />
        </Routes>
    );
};

export default MyRoute;
