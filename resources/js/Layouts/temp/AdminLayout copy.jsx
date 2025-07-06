import { useState, useEffect, useRef } from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import {
    Menu, X, Home, ClipboardList, BarChart2, LogOut,
    Dumbbell, Settings, Bell, Search
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

    const dropdownRef = useRef();

    const isActive = (match) => url.includes(match);

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

                const isAlreadyRead = localStorage.getItem("admin_notifications_read") === "true";
                const unreadCount = notifs.filter(n => !n.read).length;

                if (isAlreadyRead) {
                    setHasUnread(false);
                } else {
                    setHasUnread(unreadCount > 0);
                }
            } catch (err) {
                console.error('Gagal mengambil notifikasi:', err);
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
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
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleNotifications = async () => {
        setNotificationOpen(!notificationOpen);

        if (!notificationOpen && hasUnread) {
            try {
                await axios.post("/admin/notifications/mark-read", {}, {
                    headers: {
                        "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
                    },
                });

                // Update localStorage dan state
                localStorage.setItem("admin_notifications_read", "true");
                setHasUnread(false);
                setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
            } catch (error) {
                console.error("Failed to mark notifications as read:", error);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 relative">
            <Head title="Admin Panel" />

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col justify-between rounded-r-2xl`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-orange-50">
                    <span className="text-2xl font-extrabold text-orange-500">Healthify Admin</span>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X className="w-6 h-6 text-gray-600 hover:text-orange-500" />
                    </button>
                </div>

                <div className="flex-grow px-4 py-6 space-y-2">
                    <Link href={route("admin.dashboard")} className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("admin/dashboard") ? "bg-orange-200 text-black font-semibold shadow" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"}`}>
                        <Home className="w-5 h-5 text-orange-500" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href={route("admin.trainers.index")} className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("personal-trainer") ? "bg-orange-200 text-black font-semibold shadow" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"}`}>
                        <Dumbbell className="w-5 h-5 text-orange-400" />
                        <span>Personal Trainer</span>
                    </Link>
                    <Link href={route("apply-membership")} className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("apply-membership") ? "bg-orange-200 text-black font-semibold shadow" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"}`}>
                        <ClipboardList className="w-5 h-5 text-orange-400" />
                        <span>Apply Membership</span>
                    </Link>
                    <Link href={route("report")} className={`flex items-center gap-3 px-4 py-2 rounded-lg ${isActive("report") ? "bg-orange-200 text-black font-semibold shadow" : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"}`}>
                        <BarChart2 className="w-5 h-5 text-orange-400" />
                        <span>Report</span>
                    </Link>
                </div>

                <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
                    <Link href={route("logout")} method="post" as="button" className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-red-100 hover:text-red-600 w-full">
                        <LogOut className="w-5 h-5 text-red-400" />
                        <span>Log Out</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col w-full min-h-screen bg-gray-50">
                <header className="bg-white px-4 sm:px-6 lg:px-12 py-4 flex flex-wrap items-center justify-between shadow-md sticky top-0 z-40">
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu className="w-6 h-6 text-gray-700 hover:text-orange-500" />
                        </button>
                        <div className="text-primary text-base sm:text-lg font-semibold">
                            Good Morning, <span className="font-bold">Welcome Back!</span>
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
                                className="w-full px-4 py-2 pl-10 text-sm rounded-full border border-gray-300 bg-gray-100"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                            {searchResults.length > 0 && (
                                <ul className="absolute z-50 bg-white shadow-lg rounded-lg w-full mt-2 max-h-60 overflow-y-auto border border-gray-100">
                                    {searchResults.map((result) => (
                                        <li key={result.id} className="p-2 hover:bg-gray-100 text-sm">
                                            {result.name} - {result.specialty}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Notification */}
                        <div className="relative" ref={dropdownRef}>
                            <Bell
                                className="w-6 h-6 text-gray-600 hover:text-orange-500 cursor-pointer"
                                onClick={toggleNotifications}
                            />
                            {hasUnread && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full px-1.5 py-0.5 animate-pulse shadow">
                                    {notifications.length}
                                </span>
                            )}
                            {notificationOpen && (
                                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-100 animate-fade-in-up">
                                    <div className="p-4 border-b flex justify-between items-center font-semibold text-gray-800 bg-gray-50">
                                        <span>🔔 Notifications</span>
                                        <button onClick={() => setNotificationOpen(false)}>
                                            <X className="w-5 h-5 text-gray-600 hover:text-red-500" />
                                        </button>
                                    </div>
                                    <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100 custom-scrollbar">
                                        {notifications.length > 0 ? (
                                            notifications.map((notif) => (
                                                <li
                                                    key={notif.id}
                                                    className={`p-4 hover:bg-gray-50 cursor-pointer ${notif.read ? "bg-white" : "bg-orange-50"}`}
                                                >
                                                    <p className={`text-sm ${notif.read ? "text-gray-700" : "text-black font-semibold"}`}>
                                                        {notif.message}
                                                    </p>
                                                    <span className="text-xs text-gray-500">{notif.time}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="p-4 text-sm text-gray-500 text-center">
                                                No new notifications
                                            </li>
                                        )}
                                    </ul>
                                    <Link
                                        href={route('admin.notifications')}
                                        className="block w-full text-center py-3 text-blue-600 font-medium hover:bg-gray-50"
                                    >
                                        View All
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Settings & Profile */}
                        <Settings className="w-6 h-6 text-gray-600 hover:text-orange-500 cursor-pointer" onClick={() => (window.location.href = route("profile.edit"))} />

                        <img
                            src={selectedImage}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-orange-400 object-cover cursor-pointer"
                            onClick={() => setProfileModalOpen(true)}
                        />
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
            </div>

            {profileModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button className="absolute top-2 right-2" onClick={() => setProfileModalOpen(false)}>
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                        <img src={selectedImage} alt="Profile" className="w-full rounded-lg" />
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
