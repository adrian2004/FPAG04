import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardIcon from '../../assets/img/home/dashboard-icon.png';
import homeIcon from '../../assets/img/home/home.png';
import logoutIcon from '../../assets/img/home/logout.png';
import Widget from '../../assets/components/widget/Widget';
import { MdBarChart, MdAccountCircle, MdGroup, MdOutlineCalendarToday, MdArrowDropUp } from 'react-icons/md';
import Card from '../../assets/components/card/Card';
import LineChart from '../../assets/components/charts/charts';
import { lineChartDataTotalSpent, lineChartOptionsTotalSpent } from '../../variables/charts';

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

    const homeStyle = {
        backgroundColor: '#f0f0f0', // Substitua pela cor desejada
        height: '100vh',
        width: '100%',
    };

    return (
        <div style={homeStyle}>
            <div>
                <div className="grid pt-20 pl-20 pr-20 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                    <Widget
                        icon={<MdAccountCircle className="h-7 w-7" />}
                        title={"Users"}
                        subtitle={"$340.5"}
                    />
                    <Widget
                        icon={<MdGroup className="h-6 w-6" />}
                        title={"Spend this month"}
                        subtitle={"$642.39"}
                    />
                    <Widget
                        icon={<MdBarChart className="h-7 w-7" />}
                        title={"Sales"}
                        subtitle={"$574.34"}
                    />
                </div>

                <div className="p-20">
                    <Card extra="!p-[20px] text-center">
                        <div className="flex justify-between">
                            <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200">
                                <MdOutlineCalendarToday />
                                <span className="text-sm font-medium text-gray-600">This month</span>
                            </button>
                            <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200">
                                <MdBarChart className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
                            <div className="flex flex-col">
                                <p className="mt-[20px] text-3xl font-bold text-navy-700">
                                    $37.5K
                                </p>
                                <div className="flex flex-col items-start">
                                    <p className="mt-2 text-sm text-gray-600">Total Spent</p>
                                    <div className="flex flex-row items-center justify-center">
                                        <MdArrowDropUp className="font-medium text-green-500" />
                                        <p className="text-sm font-bold text-green-500"> +2.45% </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-full">
                                <LineChart
                                    options={lineChartOptionsTotalSpent}
                                    series={lineChartDataTotalSpent}
                                />
                            </div>
                        </div>
                    </Card>
                </div>

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
            </div>
        </div>
    );
};

export default HomePage;