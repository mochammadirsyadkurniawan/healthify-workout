import { useState, useEffect } from 'react';
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import Typed from "typed.js";
// import "../../css/app.css";
import "../../css/user/styles.css";
import Chatbot from '../../../js/Components/Chatbot';
import Services from "../../../js/Components/Services";
import Contact from '../../../js/Pages/user/Contact';

export default function Dashboard() {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    useEffect(() => {
        // Sticky Navbar
        const handleScroll = () => {
            const header = document.querySelector("header");
            if (header) {
                if (window.scrollY > 0) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Typed.js animation
        const typedElement = document.querySelector(".typing");
        if (typedElement) {
            const typed = new Typed(typedElement, {
                strings: [
                    "Strength & Cardio Training",
                    "Personalized Workouts",
                    "Health & Wellness Tips",
                    "Fitness & Gym Programs",
                    "Daily Workout Routines"
                ],
                typeSpeed: 80,
                backSpeed: 60,
                loop: true
            });

            return () => {
                window.removeEventListener("scroll", handleScroll);
                typed.destroy();
            };
        }
    }, []);

    useEffect(() => {
        const menuToggle = document.querySelector(".menuToggle");
        const navigation = document.querySelector(".navigation");

        const handleClick = () => {
            menuToggle.classList.toggle("active");
            navigation.classList.toggle("active");
        };

        menuToggle.addEventListener("click", handleClick);

        return () => {
            menuToggle.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Head */}
            <Head>
                <title>Dashboard</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
            </Head>

            <header>
                <a href="/dashboard" className="logo">
                    <img src="/assets/logo.png" alt="logo" />
                </a>

                {/* Menu Toggle */}
                <div className="menuToggle" id="menuToggle">

                </div>

                {/* Navigation */}
                <nav>
                    <ul className="navigation" id="navigationMenu">
                        <li><Link href="/dashboard">Home</Link></li>
                        {/* <li><a href="#home">Home</a></li> */}
                        <li><a href="#profile">About Us</a></li>
                        <li><a href="#service">Services</a></li>
                        <li><Link href="/choose-membership">Membership</Link></li>
                        <li><a href="#testimonials">Testimonials</a></li>
                        <li><a href="#contact">Contact Us</a></li>

                        {user && (
                            <li className={`dropdown`}>
                                <a href="#" className="dropdown-toggle" onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('.dropdown').classList.toggle('active');
                                }}>
                                    <i className="fas fa-user-circle"></i>
                                    {user.name}
                                    <i className="fas fa-chevron-down"></i>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="/profile" className="text"><i className="fas fa-user"></i> Profile</a></li>
                                    <li>
                                        <button onClick={handleLogout} className="logout-btn">
                                            <i className="fas fa-sign-out-alt"></i> Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>

            <section
                id="home"
                className="relative w-full min-h-screen flex items-center justify-center bg-[url('/images/banner-bg.jpg')] bg-cover bg-center bg-fixed text-center font-[Poppins]"
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>

                {/* Content */}
                <div className="z-10 w-full flex justify-center items-center px-4">
                    <div className="max-w-[900px] text-center">
                        <div className="text-white text-4xl md:text-5xl font-medium">
                            Welcome to
                        </div>
                        <div className="text-white text-5xl md:text-6xl font-semibold leading-tight mt-2">
                            Healthify Workout
                        </div>
                        <div className="text-white text-2xl mt-4">
                            Unleash Your Potential with:{' '}
                            <span className="text-[#ff9000] font-bold typing">Strength</span>
                        </div>
                        <a
                            href="#profile"
                            className="inline-block text-white bg-[#0D5EAD] mt-6 px-9 py-3 text-lg uppercase tracking-widest rounded-md transition-all duration-500 hover:tracking-[0.2em] hover:font-bold hover:bg-[#ff9000] hover:text-[#0D5EAD] hover:border-2 hover:border-[#0D5EAD]"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </section>


            <section id="profile" className="about">
                <div className="row">
                    <div className="col50">
                        <div className="imgbox prof">
                            <img src="assets/about.jpg" alt="gambar contoh" />
                        </div>
                    </div>
                    <div className="col50">
                        <h2 className="title-text">About Us</h2>
                        <p>Healthify Workout adalah platform digital yang dirancang untuk membantu kamu mencapai tubuh sehat dan
                            bugar dengan program latihan, panduan olahraga, serta rekomendasi nutrisi yang bisa disesuaikan
                            dengan kebutuhanmu.
                        </p>
                        <br />
                        <p>
                            Latihan Sesuai Kebutuhanmu ✨💪 <br />
                            Setiap orang memiliki target kebugaran yang unik. Itulah mengapa kami menyediakan berbagai program,
                            mulai dari: <br />
                            ✔ Latihan di rumah tanpa peralatan <br />
                            ✔ Program gym intensif untuk hasil maksimal <br />
                            ✔ Panduan khusus untuk menurunkan berat badan, membentuk otot, atau meningkatkan daya tahan <br />
                            ✔ Fitur tanya jawab dengan Chatbot sepuasnya tentang apa yang ingin kamu tahu tentang kami
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <Services />

            <section className="testi" id="testimonials">
                <div className="title white">
                    <h2 className="title-text">Testimonials</h2>
                    <p>Dengarkan langsung dari para pengguna Healthify Workout yang telah merasakan manfaat nyata dari platform kami! Dengan bimbingan interaktif dari chatbot AI, rekomendasi latihan yang disesuaikan, serta dukungan untuk berbagai tingkat kebugaran, Healthify Workout membantu mereka mencapai gaya hidup yang lebih sehat dan aktif. Berikut adalah pengalaman mereka dalam menggunakan Healthify Workout untuk mencapai tujuan kebugaran mereka. 💪✨.</p>
                </div>
                <div className="content">
                    <div className="box">
                        <div className="imgbox">
                            <img src="/assets/mark.jpg" alt="photo testi" />
                        </div>
                        <div className="text">
                            <p>Healthify Workout benar-benar membantu saya memulai rutinitas olahraga yang lebih sehat! Dengan panduan latihan yang mudah diikuti dan saran dari Chatbot AI, saya merasa lebih termotivasi untuk tetap terus konsisten setiap hari.</p>
                            <h3>Mark Zuckerberg</h3>
                        </div>
                    </div>
                    <div className="box">
                        <div className="imgbox">
                            <img src="/assets/elon.jpg" alt="photo testi" />
                        </div>
                        <div className="text">
                            <p>Saya suka bagaimana Healthify Workout memberikan rekomendasi latihan yang sesuai dengan tingkat kebugaran saya. Antarmukanya intuitif, dan fitur chatbotnya sangat membantu dalam menjawab pertanyaan seputar olahraga!</p>
                            <h3>Elon Musk</h3>
                        </div>
                    </div>
                    <div className="box">
                        <div className="imgbox">
                            <img src="/assets/jensenhuang.png" alt="photo testi" />
                        </div>
                        <div className="text">
                            <p>Sejak menggunakan Healthify Workout, saya merasa lebih bugar dan produktif! Program latihan yang dipersonalisasi membuat saya lebih konsisten dalam berolahraga tanpa takut cedera.</p>
                            <h3>Jensen Huang</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* <Chatbot /> */}
            {/* <div className="">

            </div> */}
            <Chatbot />
            {/* div#contact */}
            <Contact />
        </div>
    );
}
