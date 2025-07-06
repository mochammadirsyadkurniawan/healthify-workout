import { Link, Head } from "@inertiajs/react";
import "../../css/user/styles.css";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Typed from "typed.js";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/swiper-custom.css";

const Welcome = () => {
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

    // typing effect
    const typedRef = useRef(null);

    useEffect(() => {
        if (typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [
                    "Strength & Cardio Training",
                    "Personalized Workouts",
                    "Health & Wellness Tips",
                    "Fitness & Gym Programs",
                    "Daily Workout Routines",
                ],
                typeSpeed: 80,
                backSpeed: 60,
                loop: true,
            });

            return () => typed.destroy();
        }
    }, []);

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
                />
            </Head>

            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
                            ${
                                isSticky
                                    ? "bg-white shadow-lg py-4"
                                    : "bg-transparent py-8"
                            }`}
            >
                {/* <div className="max-w-screen-xl mx-auto flex items-center justify-between px-8 lg:px-24"> */}
                 <div className="max-w-screen-2xl mx-auto flex justify-between px-8 sm:px-8 lg:px-24 xl:px-24 2xl:px-1">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-50">
                        <img
                            src={
                                isSticky
                                    ? "/assets/logo.png"
                                    : "/assets/logo.png"
                            }
                            alt="logo"
                            className="h-10"
                        />
                    </Link>

                    {/* Hamburger Menu (mobile) */}
                    <div className="lg:hidden">
                        <button onClick={menuToggle} className="w-7 h-7">
                            <img
                                src={
                                    isMobileMenuOpen
                                        ? "/assets/close.png"
                                        : "/assets/menu.png"
                                }
                                alt="menu icon"
                                className={`${isSticky ? "invert" : ""}`}
                            />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav
                        className={`
                    flex-col lg:flex-row lg:flex items-center gap-6
                    absolute lg:static left-0 top-full w-full lg:w-auto
                    bg-white lg:bg-transparent px-6 lg:px-0 py-6 lg:py-0
                    transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? "flex" : "hidden"}
                    `}
                    >
                        {/* Links */}
                        <Link
                            href="/"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            Home
                        </Link>

                        <Link
                            href="#profile"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            About Us
                        </Link>

                        <Link
                            href="#service"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            Services
                        </Link>

                        <Link
                            href="/choose-membership-guest"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            Membership
                        </Link>

                        <Link
                            href="#testimonials"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            Testimonials
                        </Link>

                        <Link
                            href="#contact"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            Contact Us
                        </Link>

                        {/* Login Button */}
                        <Link
                            href={route("login")}
                            className="px-4 py-2 border-2 border-[#0D5EAD] text-[#0D5EAD] font-semibold bg-white rounded-full hover:bg-primary hover:text-white transition uppercase text-sm tracking-wide"
                        >
                            Login
                        </Link>

                        {/* Register Button */}
                        <Link
                            href={route("register")}
                            className="px-4 py-2 bg-[#0D5EAD] text-white font-semibold rounded-full hover:bg-primary hover:text-accent transition uppercase text-sm tracking-wide"
                        >
                            Register
                        </Link>
                    </nav>
                </div>
            </header>

            {/* <HeroSection /> */}
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    pagination={{ clickable: true }}
                    className="w-full h-screen"
                    style={{
                        "--swiper-pagination-color": "#ff9000",
                        "--swiper-pagination-bottom": "30px",
                    }}
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <section
                            className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-fixed text-center font-[Poppins]"
                            style={{
                                backgroundImage: "url('/images/banner-bg.jpg')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="z-10 px-6 text-center max-w-3xl">
                                <h1 className="text-white text-2xl sm:text-3xl md:text-6xl font-bold leading-tight">
                                    Welcome to
                                </h1>
                                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
                                    Healthify Workout
                                </h2>
                                <div className="text-white text-lg sm:text-xl md:text-2xl mt-4">
                                    Unleash Your Potential with:{" "}
                                    <span
                                        ref={typedRef}
                                        className="text-[#ff9000] font-bold"
                                    ></span>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <section
                            className="relative w-full h-screen flex items-center justify-start bg-cover bg-center bg-fixed text-left font-[Poppins]"
                            style={{
                                backgroundImage:
                                    "url('images/banner-slider3.png')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="z-10 pl-6 sm:pl-12 lg:pl-20 max-w-2xl">
                                <Link
                                    href="/workout-categories"
                                    className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-snug hover:text-accent transition duration-300"
                                >
                                    Explore Our Programs
                                </Link>
                                <p className="text-white text-lg mt-4">
                                    From strength training to yoga — find your
                                    fit.
                                </p>
                            </div>
                        </section>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <section
                            className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-fixed font-[Poppins]"
                            style={{
                                backgroundImage:
                                    "url('images/bg-gympilates.png')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="z-10 text-center max-w-2xl">
                                <Link
                                    href="/choose-membership-guest"
                                    className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight hover:text-[#ff9000] transition duration-300"
                                >
                                    Membership <br />
                                    Healthify Workout
                                </Link>
                                <p className="text-white mt-4 text-lg sm:text-xl">
                                    Discover personalized plans for every
                                    workouts level.
                                </p>
                            </div>
                        </section>
                    </SwiperSlide>
                </Swiper>
            </div>

            <section id="profile" className="about">
                <div className="row">
                    <div className="col50">
                        <div className="imgbox prof">
                            <img src="assets/about.png" alt="abous us" />
                        </div>
                    </div>
                    <div className="col50">
                        <h2 className="title-text">About Us</h2>
                        <p>
                            Healthify Workout adalah platform digital yang
                            dirancang untuk membantu kamu mencapai tubuh sehat
                            dan bugar dengan program latihan, panduan olahraga,
                            serta rekomendasi nutrisi yang bisa disesuaikan
                            dengan kebutuhanmu.
                        </p>
                        <br />
                        <p>
                            Latihan Sesuai Kebutuhanmu ✨💪 <br />
                            Setiap orang memiliki target kebugaran yang unik.
                            Itulah mengapa kami menyediakan berbagai program,
                            mulai dari: <br />
                            ✔ Latihan di rumah tanpa peralatan <br />
                            ✔ Program gym intensif untuk hasil maksimal <br />
                            ✔ Panduan khusus untuk menurunkan berat badan,
                            membentuk otot, atau meningkatkan daya tahan <br />✔
                            Fitur tanya jawab dengan Chatbot sepuasnya tentang
                            apa yang ingin kamu tahu tentang kami
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="service" className="py-24 px-4 lg:px-20">
                <div className="flex flex-col items-center text-center mb-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#0D5EAD]">
                        Services
                    </h2>
                    <p className="mt-2 text-gray-700">
                        Here's the services that we build for you
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    <div className="w-[320px] bg-white border-[15px] border-white shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="relative h-72 w-full overflow-hidden">
                            <img
                                src="assets/service1.jpg"
                                alt="Workout"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="py-4">
                            <h3 className="text-center font-bold text-gray-800">
                                Workout
                            </h3>
                        </div>
                    </div>

                    <div className="w-[320px] bg-white border-[15px] border-white shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="relative h-72 w-full overflow-hidden">
                            <img
                                src="assets/service2.jpg"
                                alt="Gym"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="py-4">
                            <h3 className="text-center font-bold text-gray-800">
                                Gym
                            </h3>
                        </div>
                    </div>

                    <div className="w-[320px] bg-white border-[15px] border-white shadow-lg hover:scale-105 transition-transform duration-300">
                        <div className="relative h-72 w-full overflow-hidden">
                            <img
                                src="assets/service3.jpg"
                                alt="Leg Day"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="py-4">
                            <h3 className="text-center font-bold text-gray-800">
                                Leg Day
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <a
                        href="/login"
                        className="bg-[#ff9000] text-white px-6 py-3 rounded-md uppercase tracking-widest hover:tracking-wider transition-all duration-300"
                    >
                        Login dahulu dan Lihat Semua!
                    </a>
                </div>
            </section>

            <section
                className="py-24 px-4 lg:px-20 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: 'url("assets/12.jpg")' }}
                id="testimonials"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-white">
                        Testimonials
                    </h2>
                    {/* <p className="mt-4 text-white max-w-4xl mx-auto">
                        Dengarkan langsung dari para pengguna Healthify Workout
                        yang telah merasakan manfaat nyata dari platform kami!
                        Dengan bimbingan interaktif dari chatbot AI, rekomendasi
                        latihan yang disesuaikan, serta dukungan untuk berbagai
                        tingkat kebugaran, Healthify Workout membantu mereka
                        mencapai gaya hidup yang lebih sehat dan aktif. Berikut
                        adalah pengalaman mereka dalam menggunakan Healthify
                        Workout untuk mencapai tujuan kebugaran mereka. 💪✨
                    </p> */}
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

            {/* contact us */}
            <section
                className="contact-section pt-32 px-8 py-12 contact bg-black min-h-screen"
                id="contact"
            >
                <div className="mb-10"></div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Contact Info */}
                    <div className="w-full lg:w-1/2 text-white text-center">
                        <h2 className="text-3xl font-bold text-white text-center mb-2 mt-12">
                            Head Office Healthify
                        </h2>
                        <div
                            className="mx-auto mb-10"
                            style={{
                                width: "160px",
                                borderBottom: "3px solid #ff9000",
                            }}
                        ></div>
                        <div className="space-y-2 mb-6">
                            <p className="text-white">
                                Jl. Meruya Selatan No.1, RT.4/RW.1,
                            </p>
                            <p className="text-white">
                                Joglo, Kecamatan Kembangan,
                            </p>
                            <p className="text-white">Kota Jakarta Barat,</p>
                            <p className="text-white">
                                Daerah Khusus Ibukota Jakarta 11650
                            </p>
                        </div>

                        <div className="flex justify-center gap-2 mb-6 p-4">
                            <a
                                href="https://www.instagram.com/univmercubuana/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-spin flex items-center justify-center w-14 h-14 rounded-[6px] bg-white text-black hover:bg-[#ff9000]"
                            >
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                            <a
                                href="https://wa.me/6287854592659"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-spin flex items-center justify-center w-14 h-14 rounded-[6px] bg-white text-black hover:bg-[#ff9000]"
                            >
                                <i className="fab fa-whatsapp text-2xl"></i>
                            </a>
                            <a
                                href="mailto:kemenkeu.prime@kemenkeu.go.id"
                                className="hover-spin flex items-center justify-center w-14 h-14 rounded-[6px] bg-white text-black hover:bg-[#ff9000]"
                            >
                                <i className="fas fa-envelope text-2xl"></i>
                            </a>
                        </div>

                        <h3 className="text-primary text-2xl font-semibold">
                            <a
                                href="https://wa.me/6287854592659"
                                target="_blank"
                            >
                                0878-5459-2659
                            </a>
                        </h3>
                    </div>

                    {/* Google Maps */}
                    <div className="w-full lg:w-1/2 h-[400px] mt-14 mr-20">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4265.9548567809015!2d106.73573127531162!3d-6.209744193778133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f71f5a41c197%3A0x628259f9e8d6d7b4!2sUniversitas%20Mercu%20Buana!5e1!3m2!1sid!2sid!4v1744352430369!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>
                </div>
            </section>

            <footer className="text-center py-3 text-white-50 bg-black">
                <div>
                    <a
                        href={"/kebijakan-privasi"}
                        className="text-primary text-decoration-none"
                    >
                        Privacy Policy
                    </a>
                </div>
                <small className="d-block mt-2 text-white">
                    All Rights Reserved. © PHKM 2025 Kelompok Stack Engineers
                </small>
            </footer>
        </>
    );
};

export default Welcome;
