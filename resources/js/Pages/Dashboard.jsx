import { useState, useEffect } from 'react';
import { Link, Head, usePage, useForm } from "@inertiajs/react";

import "../../css/user/styles.css";
import Chatbot from '../Components/Chatbot';
import Services from "../Components/Services";
import Contact from './user/Contact';
import HeroSection from '@/Components/HeroSection';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    const [isSticky, setIsSticky] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 10);
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
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Dashboard</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
            </Head>

            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isSticky ? 'bg-white shadow-lg py-4' : 'bg-transparent py-8'}`}>
                {/* <div className="max-w-screen-2xl mx-auto flex justify-between px-8"> */}

                <div className="max-w-screen-2xl mx-auto flex justify-between px-8 sm:px-8 lg:px-24 xl:px-24 2xl:px-1">

                    <Link href="/" className="flex items-center gap-2 z-50">
                        <img src="/assets/logo.png" alt="logo" className="h-10" />
                    </Link>

                    <div className="lg:hidden">
                        <button onClick={menuToggle} className="w-7 h-7">
                            <img src={isMobileMenuOpen ? "/assets/close.png" : "/assets/menu.png"} alt="menu icon" className={`${isSticky ? 'invert' : ''}`} />
                        </button>
                    </div>

                    <nav className={`flex-col lg:flex-row lg:flex items-center gap-6 absolute lg:static left-0 top-full w-full lg:w-auto bg-white lg:bg-transparent px-6 lg:px-0 py-6 lg:py-0 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
                        {/* Navigation Links */}
                        {[
                            { href: '/dashboard', label: 'Home' },
                            { href: '#profile', label: 'About Us' },
                            { href: '#service', label: 'Services' },
                            { href: '/choose-membership', label: 'Membership' },
                            { href: '#testimonials', label: 'Testimonials' },
                            { href: '#contact', label: 'Contact Us' }
                        ].map((item, idx) => (
                            <Link key={idx} href={item.href} className={`text-base font-medium hover:text-primary transition-colors duration-300 ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}`}>
                                {item.label}
                            </Link>
                        ))}

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

                        {/* User Dropdown */}
                        <div className="relative group">
                            <button onClick={() => handleToggle("user")} className={`text-base font-medium hover:text-primary transition-colors duration-300 ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}`}>
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

            <HeroSection />

            <section id="profile" className="about">
                <div className="row">
                    <div className="col50">
                        <div className="imgbox prof">
                            <img src="assets/about.png" alt="About Us" />
                        </div>
                    </div>
                    <div className="col50">
                        <h2 className="title-text">About Us</h2>
                        <p>Healthify Workout adalah platform digital yang membantu kamu mencapai tubuh sehat dan bugar dengan latihan, panduan olahraga, dan rekomendasi nutrisi sesuai kebutuhanmu.</p>
                        <br />
                        <p>Latihan Sesuai Kebutuhanmu ✨💪<br />
                            ✔ Latihan di rumah tanpa alat<br />
                            ✔ Program gym intensif<br />
                            ✔ Program menurunkan berat badan atau membentuk otot<br />
                            ✔ Fitur Chatbot tanya jawab sepuasnya
                        </p>
                    </div>
                </div>
            </section>

            <Services />

            <section
                className="py-24 px-4 lg:px-20 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: 'url("assets/12.jpg")' }}
                id="testimonials"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">
                        Testimonials
                    </h2>
                    <p className="mt-4 text-white max-w-4xl mx-auto">
                        Dengarkan langsung dari para pengguna Healthify Workout
                        yang telah merasakan manfaat nyata dari platform kami!
                        Dengan bimbingan interaktif dari chatbot AI, rekomendasi
                        latihan yang disesuaikan, serta dukungan untuk berbagai
                        tingkat kebugaran, Healthify Workout membantu mereka
                        mencapai gaya hidup yang lebih sehat dan aktif. Berikut
                        adalah pengalaman mereka dalam menggunakan Healthify
                        Workout untuk mencapai tujuan kebugaran mereka. 💪✨
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10">
                    {/* Testimonial 1 */}
                    <div className="w-[320px] bg-white shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img
                                src="assets/mark.jpg"
                                alt="photo testi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-center">
                            <p className="italic text-gray-600">
                                Healthify Workout benar-benar membantu saya
                                memulai rutinitas olahraga yang lebih sehat!
                                Dengan panduan latihan yang mudah diikuti dan
                                saran dari Chatbot AI, saya merasa lebih
                                termotivasi untuk tetap terus konsisten setiap
                                hari.

                                Sejak menggunakan Healthify Workout, saya merasa
                                lebih bugar dan produktif! Program latihan yang
                                dipersonalisasi membuat saya lebih konsisten
                                dalam berolahraga tanpa takut cedera.
                            </p>
                            <h3 className="mt-4 font-semibold text-[#ff9000]">
                                Mark Zuckerberg
                            </h3>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="w-[320px] bg-white shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img
                                src="assets/elon.jpg"
                                alt="photo testi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-center">
                            <p className="italic text-gray-600">
                                Saya suka bagaimana Healthify Workout memberikan
                                rekomendasi latihan yang sesuai dengan tingkat
                                kebugaran saya. Antarmukanya intuitif, dan fitur
                                chatbotnya sangat membantu dalam menjawab
                                pertanyaan seputar olahraga!
                                Sejak menggunakan Healthify Workout, saya merasa
                                lebih bugar dan produktif! Program latihan yang
                                dipersonalisasi membuat saya lebih konsisten
                                dalam berolahraga tanpa takut cedera.
                            </p>
                            <h3 className="mt-4 font-semibold text-[#ff9000]">
                                Elon Musk
                            </h3>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="w-[320px] bg-white shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                            <img
                                src="assets/jensenhuang.png"
                                alt="photo testi"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-center">
                            <p className="italic text-gray-600">
                                Sejak menggunakan Healthify Workout, saya merasa
                                lebih bugar dan produktif! Program latihan yang
                                dipersonalisasi membuat saya lebih konsisten
                                dalam berolahraga tanpa takut cedera.
                                Saya suka bagaimana Healthify Workout memberikan
                                rekomendasi latihan yang sesuai dengan tingkat
                                kebugaran saya. Antarmukanya intuitif, dan fitur
                                chatbotnya sangat membantu dalam menjawab
                                pertanyaan seputar olahraga!
                            </p>
                            <h3 className="mt-4 font-semibold text-[#ff9000]">
                                Jensen Huang
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            <Chatbot />
            <Contact />
        </div>
    );
}
