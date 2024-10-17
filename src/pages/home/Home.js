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
        <div class="absolute inset-x-0 bottom-0 h-16 mb-16">
            <div
                class="flex items-center justify-between bg-white bg-opacity-80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg max-w-md mx-auto transition-all duration-300 hover:shadow-xl hover:bg-opacity-90"
            >
                <button
                    class="text-red-500 hover:text-red-600 mx-2 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                >
                    <img src="/images/dashboard-icon.png" alt="Dashboard Icon" class="h-6 w-6" />

                </button>
                <button
                    class="text-gray-600 hover:text-gray-800 mx-2 transition-all duration-200 ease-in-out hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                >
                    <img src="/images/home.png" alt="Home Icon" class="h-6 w-6" />
                </button>
                <button
                    class="text-gray-600 hover:text-gray-800 mx-2 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    <img src="/images/home.png" alt="Home Icon" class="h-6 w-6" />

                </button>
                <button
                    class="text-gray-600 hover:text-gray-800 mx-2 transition-transform duration-200 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                >
                    <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                        <path
                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                    </svg>
                </button>
                <button
                    class="text-gray-600 hover:text-gray-800 mx-2 transition-all duration-200 ease-in-out hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                >
                    <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            stroke-width="2"
                            stroke-linejoin="round"
                            stroke-linecap="round"
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default HomePage;