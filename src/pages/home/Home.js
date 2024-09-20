import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/home', {
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <h1>Home Page</h1>
            <p>{message}</p>
        </div>
    );
};

export default HomePage;