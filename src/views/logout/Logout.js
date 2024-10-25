import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await fetch('http://localhost:5000/logout', {
                    credentials: 'include',
                });

                navigate('/login');
            } catch (error) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <h1></h1>
    );
};

export default LoginPage;