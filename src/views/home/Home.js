import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardIcon from '../../assets/img/home/dashboard-icon.png';
import homeIcon from '../../assets/img/home/home.png';
import logoutIcon from '../../assets/img/home/logout.png';

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
        <div class="absolute inset-x-0 bottom-0 h-16 mb-16">
            <div
                class="flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg w-[20rem] mx-auto transition-all duration-300 hover:shadow-xl hover:bg-opacity-90"
            >
                <button
                    class="text-red-500 hover:text-red-600 mx-2 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                >
                    <img src={dashboardIcon} alt="Dashboard Icon" class="h-6 w-6" />

                </button>
                <button
                    class="text-gray-600 hover:text-gray-800 mx-2 transition-all duration-200 ease-in-out hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                >
                    <img src={homeIcon} alt="Home Icon" class="h-6 w-6" />
                </button>
                
                <a
                    href='/logout' class="text-gray-600 hover:text-gray-800 mx-2 transition-all duration-200 ease-in-out focus:outline-none hover:scale-110 focus:ring-2 focus:ring-gray-500 rounded-full"
                >
                    <img src={logoutIcon} alt="Dashboard Icon" class="h-6 w-6" />
                </a>
            </div>
        </div>
    );
};

export default HomePage;