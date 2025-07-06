import { useState, useEffect, useRef } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import {
    Menu, X, Home, ClipboardList, BarChart2, LogOut,
    Dumbbell, Settings, Bell, Search, Users, Moon, Sun
} from "lucide-react";

import "../../css/app.css";
import axios from "axios";

export default function AdminLayout({ children }) {
    const { url, props } = usePage();
    const user = props?.auth?.user;

    const defaultPhoto = "/images/profile/profile-user.png";
    const [selectedImage, setSelectedImage] = useState(user?.profile_photo || defaultPhoto);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        // Check if user previously set a preference
        const savedMode = localStorage.getItem("darkMode");
        // Also check system preference
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        return savedMode ? savedMode === "true" : prefersDark;
    });

    const dropdownRef = useRef();
    const sidebarRef = useRef();

    const isActive = (match) => url.includes(match);

    // Toggle dark mode
    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);

            const formData = new FormData();
            formData.append("photo", file);

            try {
                await axios.post(route("admin.profile.upload-photo"), formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } catch (error) {
                console.error("Upload error:", error);
                alert("Gagal mengupload foto");
            }
        }
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('/admin/notifications/get-notification');
                const notifs = response.data.notifications || [];
                setNotifications(notifs);

                // Ambil id notifikasi terbaru
                const latestNotifId = notifs.length > 0 ? notifs[0].id : null;
                const lastReadNotifId = localStorage.getItem("admin_last_read_notification_id");

                if (latestNotifId && String(latestNotifId) !== lastReadNotifId) {
                    setHasUnread(true);
                } else {
                    setHasUnread(false);
                }
            } catch (err) {
                console.error('Gagal mengambil notifikasi:', err);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // refresh setiap 30 detik
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (searchQuery.length > 1) {
            fetch(`/admin/search?query=${searchQuery}`)
                .then(res => res.json())
                .then(data => setSearchResults(data));
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setNotificationOpen(false);
            }

            // Close sidebar when clicking outside (mobile only)
            if (sidebarRef.current &&
                sidebarOpen &&
                !sidebarRef.current.contains(event.target) &&
                window.innerWidth < 1024) {
                setSidebarOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [sidebarOpen]);

    // Handle responsive sidebar based on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleNotifications = async () => {
        setNotificationOpen(!notificationOpen);

        if (!notificationOpen) {
            try {
                await axios.post("/admin/notifications/mark-read", {}, {
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    },
                });

                if (notifications.length > 0) {
                    const latestNotifId = notifications[0].id;
                    localStorage.setItem("admin_last_read_notification_id", latestNotifId);
                }

                setHasUnread(false);
                setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
            } catch (error) {
                console.error("Failed to mark notifications as read:", error);
            }
        }
    };

    // ucapan berdasarkan waktu
    const getGreeting = () => {
        const now = new Date();

        const jakartaTime = new Date(
            now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
        );

        const hour = jakartaTime.getHours();

        if (hour >= 4 && hour < 12) {
            return "Good Morning";
        } else if (hour >= 12 && hour < 16) {
            return "Good Afternoon";
        } else if (hour >= 16 && hour < 20) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };

    const greetingText = getGreeting();

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'} relative transition-colors duration-300`}>


            {/* Overlay when sidebar is open on mobile */}
            {sidebarOpen && window.innerWidth < 1024 && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
            )}

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 z-50 w-64 ${darkMode ? 'bg-gray-800 shadow-xl shadow-gray-900/30' : 'bg-white shadow-xl'} transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col justify-between rounded-r-2xl`}
            >
                <div className={`flex items-center justify-between px-6 py-5 border-b ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-200 bg-orange-50'}`}>
                    <span className="text-2xl tracking-wide font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                            Healthify Admin
                    </span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X className={`w-6 h-6 ${darkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-600 hover:text-orange-500'}`} />
                    </button>
                </div>

                <div className="flex-grow px-4 py-6 space-y-2 custom-scrollbar overflow-y-auto">
                    <Link
                        href={route("admin.dashboard")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive("admin/dashboard")
                                ? (darkMode ? "bg-orange-900/40 text-orange-100 font-semibold shadow" : "bg-orange-200 text-black font-semibold shadow")
                                : (darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-orange-300" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600")
                        }`}
                    >
                        <Home className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                        <span>Dashboard</span>
                    </Link>

                    <Link
                        href={route("admin.users")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive("admin/users")
                                ? (darkMode ? "bg-orange-900/40 text-orange-100 font-semibold shadow" : "bg-orange-200 text-black font-semibold shadow")
                                : (darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-orange-300" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600")
                        }`}
                    >
                        <Users className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-400'}`} />
                        <span>Manage Users</span>
                    </Link>

                    <Link
                        href={route("admin.trainers.index")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive("personal-trainer")
                                ? (darkMode ? "bg-orange-900/40 text-orange-100 font-semibold shadow" : "bg-orange-200 text-black font-semibold shadow")
                                : (darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-orange-300" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600")
                        }`}
                    >
                        <Dumbbell className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-400'}`} />
                        <span>Personal Trainer</span>
                    </Link>

                    <Link
                        href={route("apply-membership")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive("apply-membership")
                                ? (darkMode ? "bg-orange-900/40 text-orange-100 font-semibold shadow" : "bg-orange-200 text-black font-semibold shadow")
                                : (darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-orange-300" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600")
                        }`}
                    >
                        <ClipboardList className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-400'}`} />
                        <span>Apply Membership</span>
                    </Link>

                    <Link
                        href={route("report")}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                            isActive("report")
                                ? (darkMode ? "bg-orange-900/40 text-orange-100 font-semibold shadow" : "bg-orange-200 text-black font-semibold shadow")
                                : (darkMode ? "text-gray-300 hover:bg-gray-700 hover:text-orange-300" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600")
                        }`}
                    >
                        <BarChart2 className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-400'}`} />
                        <span>Report</span>
                    </Link>
                </div>

                <div className={`px-4 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800/70' : 'border-gray-200 bg-gray-50'}`}>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg w-full transition-colors duration-200 ${
                            darkMode
                                ? 'text-gray-300 hover:bg-red-900/50 hover:text-red-300'
                                : 'text-gray-700 hover:bg-red-100 hover:text-red-600'
                        }`}
                    >
                        <LogOut className={`w-5 h-5 ${darkMode ? 'text-red-300' : 'text-red-400'}`} />
                        <span>Log Out</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col w-full min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
                <header className={`${darkMode ? 'bg-gray-800 shadow-md shadow-black/20' : 'bg-white shadow-md'} px-4 sm:px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between sticky top-0 z-40 transition-colors duration-300`}>
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300 hover:text-orange-400' : 'text-gray-700 hover:text-orange-500'}`} />
                        </button>

                        <div className={`${darkMode ? 'text-gray-100' : 'text-primary'} text-base sm:text-lg font-semibold`}>
                            {greetingText}, <span className="font-bold">Welcome Back!</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap justify-end w-full lg:w-auto mt-4 lg:mt-0">
                        {/* Search */}
                        <div className="relative hidden md:block w-64">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full px-4 py-2 pl-10 text-sm rounded-full border ${
                                    darkMode
                                        ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                                        : 'border-gray-300 bg-gray-100 text-gray-800'
                                } transition-colors duration-300`}
                            />
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} w-5 h-5`} />
                            {searchResults.length > 0 && (
                                <ul className={`absolute z-50 rounded-lg w-full mt-2 max-h-60 overflow-y-auto custom-scrollbar ${
                                    darkMode
                                        ? 'bg-gray-800 shadow-lg shadow-black/30 border border-gray-700'
                                        : 'bg-white shadow-lg border border-gray-100'
                                }`}>
                                    {searchResults.map((result) => (
                                        <li
                                            key={result.id}
                                            className={`p-2 text-sm ${darkMode
                                                ? 'hover:bg-gray-700 text-gray-200'
                                                : 'hover:bg-gray-100 text-gray-800'}`
                                            }
                                        >
                                            {result.name} - {result.specialty}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`flex items-center justify-center rounded-full p-1.5 ${
                                darkMode
                                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600 hover:text-yellow-300'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            } transition-colors duration-300`}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        {/* Notification */}
                        <div className="relative" ref={dropdownRef}>
                            <Bell
                                className={`w-6 h-6 ${
                                    darkMode
                                        ? 'text-gray-300 hover:text-orange-400'
                                        : 'text-gray-600 hover:text-orange-500'
                                } cursor-pointer transition-colors duration-300`}
                                onClick={toggleNotifications}
                            />
                            {hasUnread && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 animate-pulse shadow">
                                    {notifications.length}
                                </span>
                            )}

                            {notificationOpen && (
                                <div className={`absolute right-0 mt-3 w-72 sm:w-80 md:w-96 shadow-2xl rounded-xl overflow-hidden z-50 animate-fade-in-up ${
                                    darkMode
                                        ? 'bg-gray-800 border border-gray-700'
                                        : 'bg-white border border-gray-100'
                                }`}>
                                    <div className={`p-4 border-b flex justify-between items-center font-semibold ${
                                        darkMode
                                            ? 'text-gray-200 bg-gray-850 border-gray-700'
                                            : 'text-gray-800 bg-gray-50 border-gray-100'
                                    }`}>
                                        <span className="text-sm sm:text-base">🔔 Notifications</span>
                                        <button onClick={() => setNotificationOpen(false)}>
                                            <X className={`w-5 h-5 ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`} />
                                        </button>
                                    </div>
                                    <ul className="max-h-64 sm:max-h-72 overflow-y-auto divide-y custom-scrollbar divide-gray-100">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <li
                                                    key={notif.id}
                                                    className={`p-3 sm:p-4 cursor-pointer ${
                                                        darkMode
                                                            ? (notif.read ? 'bg-gray-800 hover:bg-gray-750' : 'bg-blue-900/40 hover:bg-blue-900/50')
                                                            : (notif.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100')
                                                    }`}
                                                >
                                                    <p className={`text-sm ${
                                                        darkMode
                                                            ? (notif.read ? 'text-gray-300' : 'text-gray-100 font-semibold')
                                                            : (notif.read ? 'text-gray-700' : 'text-black font-semibold')
                                                    }`}>
                                                        {notif.message}
                                                    </p>
                                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notif.time}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className={`p-4 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                No new notifications
                                            </li>
                                        )}
                                    </ul>
                                    <Link
                                        href={route('admin.notifications')}
                                        className={`block w-full text-center py-3 font-medium text-sm sm:text-base ${
                                            darkMode
                                                ? 'text-blue-400 hover:bg-gray-750'
                                                : 'text-blue-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        View All
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Settings & Profile */}
                        <Settings
                            className={`w-6 h-6 ${
                                darkMode
                                    ? 'text-gray-300 hover:text-orange-400'
                                    : 'text-gray-600 hover:text-orange-500'
                            } cursor-pointer transition-colors duration-300`}
                            onClick={() => (window.location.href = route("profile.edit"))}
                        />

                        <img
                            src={selectedImage}
                            alt="Profile"
                            className={`w-10 h-10 rounded-full object-cover cursor-pointer ${
                                darkMode
                                    ? 'border-2 border-gray-600 hover:border-orange-400'
                                    : 'border-2 border-gray-300 hover:border-orange-400'
                            } transition-colors duration-300`}
                            onClick={() => setProfileModalOpen(true)}
                        />
                    </div>
                </header>

                <main className={`flex-1 p-4 sm:p-6 overflow-y-auto transition-colors duration-300 ${darkMode ? 'text-gray-100' : ''}`}>
                    {/* Apply dark mode classes to children */}
                    <div className={darkMode ? 'dark' : ''}>
                        {children}
                    </div>
                </main>
            </div>

            {profileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className={`p-6 rounded-lg shadow-lg w-96 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <button className="absolute top-2 right-2" onClick={() => setProfileModalOpen(false)}>
                            <X className={`w-6 h-6 ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`} />
                        </button>
                        <img src={selectedImage} alt="Profile" className="w-full rounded-lg object-cover" />
                        <input
                            type="file"
                            accept="image/*"
                            className={`mt-4 block w-full text-sm ${
                                darkMode
                                    ? 'text-gray-300 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-600 file:rounded-md file:text-sm file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600'
                                    : 'text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 hover:file:bg-gray-200'
                            }`}
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            )}

        </div>
    );
}
