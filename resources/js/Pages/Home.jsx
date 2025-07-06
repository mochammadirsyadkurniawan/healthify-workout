import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import HeroBanner from "@/Components/services/HeroBanner";
import SearchExercises from "@/Components/services/SearchExercises";
import Exercises from "@/Components/services/Exercises";
import "../../css/workout.css";
import Chatbot from "@/Components/Chatbot";
import Contact from "./user/Contact";

const Home = () => {
    const [bodyPart, setBodyPart] = useState("all");
    const [exercises, setExercises] = useState([]);


    const user = usePage().props.auth.user;
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    // sticky
    const [isSticky, setIsSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleToggle = (menu) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    const menuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
    };


    // notif
     // Notifications
    const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [readNotifications, setReadNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/user/notifications');
            const data = await response.json();
            setNotifications(data.notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        const storedRead = JSON.parse(localStorage.getItem('readNotifications')) || [];
        setReadNotifications(storedRead);
    }, []);

    const unreadNotifications = notifications.filter((notif) => !readNotifications.includes(notif.id));
    const unreadCount = unreadNotifications.length;

    const handleDropdownToggle = () => {
        setNotifDropdownOpen(!notifDropdownOpen);
    };

    const handleNotificationClick = (id) => {
        if (!readNotifications.includes(id)) {
            const updatedRead = [...readNotifications, id];
            setReadNotifications(updatedRead);
            localStorage.setItem('readNotifications', JSON.stringify(updatedRead));
        }
    };

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter((notif) => !readNotifications.includes(notif.id))
        : notifications;
    return (
        <>
            <Head>
                <title>Healthify Categories Exercises Workout</title>

                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
            </Head>

            <div
                id="home"
                className="relative w-full h-[100px] flex items-center justify-center bg-[url('/images/banner-bg.jpg')] bg-cover bg-center bg-fixed text-center font-[Poppins]"
            >

                <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>
            </div>

            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                                        ${isSticky ? 'bg-white shadow-lg py-4' : 'bg-transparent py-8'}`}>

                {/* <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 lg:px-32 sm:px-20"> */}
                  <div className="max-w-screen-2xl mx-auto flex justify-between px-8 sm:px-8 lg:px-24 xl:px-24 2xl:px-1">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <img
                            src={isSticky ? "/assets/logo.png" : "/assets/logo.png"}
                            alt="logo"
                            className="h-10"
                        />
                    </Link>

                    {/* Hamburger Menu (mobile) */}
                    <div className="lg:hidden">
                        <button onClick={menuToggle} className="w-7 h-7">
                            <img
                                src={isMobileMenuOpen ? "/assets/close.png" : "/assets/menu.png"}
                                alt="menu icon"
                                className={`${isSticky ? 'invert' : ''}`}
                            />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className={`
                                flex-col lg:flex-row lg:flex items-center gap-6
                                absolute lg:static left-0 top-full w-full lg:w-auto
                                bg-white lg:bg-transparent px-6 lg:px-0 py-6 lg:py-0
                                transition-all duration-300 ease-in-out
                                ${isMobileMenuOpen ? 'flex' : 'hidden'}
                                `}>
                        {/* Links */}
                        <Link
                            href="/dashboard"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                `}
                        >
                            Home
                        </Link>

                        <Link
                            href="/dashboard"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                `}
                        >
                            About Us
                        </Link>


                        <Link
                            href="/choose-membership"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                `}>
                            Membership
                        </Link>

                        <Link
                            href="/workout-categories"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                `}>
                            Workout Categories
                        </Link>

                        <Link href="#exercises"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                        ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                        `}>
                            Exercises
                        </Link>

                        <Link
                            href="#contact"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                `}
                        >
                            Contact Us
                        </Link>
                         {/* Notification Dropdown */}
                        <div className="relative group">
                            <button onClick={handleDropdownToggle} className={`relative text-base font-medium hover:text-primary transition-colors duration-300 ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}`}>
                                <i className="fas fa-bell text-lg"></i>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {notifDropdownOpen && (
                                <div className="absolute mt-3 w-64 sm:w-80 max-h-96 overflow-y-auto overflow-x-hidden bg-white rounded-2xl shadow-2xl py-4 px-5 text-sm space-y-3 z-50 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 animate-fade-in-down custom-scrollbar">
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                        <button onClick={() => setActiveTab('all')} className={`text-sm font-semibold ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'} transition-all duration-200 pb-1`}>
                                            Semua
                                        </button>
                                        <button onClick={() => setActiveTab('unread')} className={`text-sm font-semibold ${activeTab === 'unread' ? 'text-primary border-b-2 border-primary' : 'text-gray-400'} transition-all duration-200 pb-1`}>
                                            Belum Dibaca
                                        </button>
                                    </div>

                                    {filteredNotifications.length === 0 ? (
                                        <div className="text-black text-center py-6">Tidak ada notifikasi</div>
                                    ) : (
                                        filteredNotifications.map((notif) => {
                                            const isRead = readNotifications.includes(notif.id);
                                            return (
                                                <div key={notif.id} onClick={() => handleNotificationClick(notif.id)} className={`p-3 rounded-xl border border-gray-200 transition-colors duration-200 cursor-pointer ${!isRead ? 'bg-blue-50 hover:bg-blue-100' : 'bg-gray-50 hover:bg-gray-100'}`}>
                                                    <p className="text-gray-800 mb-1">{notif.message}</p>
                                                    <p className="text-[11px] text-gray-400">{notif.time_diff}</p>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="relative group">
                            <button
                                onClick={() => handleToggle("user")}
                                className=
                                {`text-base font-medium hover:text-primary transition-colors duration-300
                                        ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                                        `}
                            >
                                <i className="fas fa-user-circle text-lg"></i> {user.name}
                                <i className={`ps-1 fas fa-chevron-${activeDropdown === "user" ? "up" : "down"}`}></i>
                            </button>

                            {activeDropdown === "user" && (
                                <div className="absolute right-0 mt-3 w-44 bg-white rounded-lg shadow-lg py-3 px-4 text-sm space-y-2 z-50">
                                    <Link href="/profile" className="flex items-center gap-2 text-accent hover:text-blue-500">
                                        <i className="fas fa-user"></i> Profile
                                    </Link>
                                    <button onClick={handleLogout} className="logout-btn text-red-700 hover:text-red-500">
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </div>
                            )}
                        </div>

                    </nav>
                </div>
            </header>


            <Box>
                <HeroBanner />
                <SearchExercises
                    setExercises={setExercises}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                />

                <Exercises
                    setExercises={setExercises}
                    exercises={exercises}
                    bodyPart={bodyPart}
                />
            </Box>
            <Contact />

            <Chatbot />

        </>
    );
};

export default Home;


