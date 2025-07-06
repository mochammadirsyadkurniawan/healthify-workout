import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react"; // Inertia.js




import { exerciseOptions, fetchData, youtubeOptions } from "@/Utils/fetchData";
import Detail from "@/Components/services/Detail";
import ExerciseVideos from "@/Components/services/ExerciseVideos";
import SimilarExercises from "@/Components/services/SimilarExercises";
// import Navbar from "@/Components/services/Navbar";
import Chatbot from "@/Components/Chatbot";
import Contact from "./user/Contact";


const ExerciseDetail = () => {
    const { id } = usePage().props; // Ambil `id` dari props yang dikirim oleh Laravel

    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
            const youtubeSearchUrl =
                "https://youtube-search-and-download.p.rapidapi.com";

            const exerciseDetailData = await fetchData(
                `${exerciseDbUrl}/exercises/exercise/${id}`,
                exerciseOptions
            );
            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await fetchData(
                `${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
                youtubeOptions
            );
            setExerciseVideos(exerciseVideosData.contents);

            const targetMuscleExercisesData = await fetchData(
                `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
                exerciseOptions
            );
            setTargetMuscleExercises(targetMuscleExercisesData);

            const equipmentExercisesData = await fetchData(
                `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
                exerciseOptions
            );
            setEquipmentExercises(equipmentExercisesData);
        };

        fetchExercisesData();
    }, [id]);


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

    return (
        <>
            <Head>
                <title>Exercise Detail</title>
                {/* <Head title="Exercise Detail" /> */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
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

                        {/* <Link
                            href="/dashboard"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                            ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                            `}
                        >
                            Services
                        </Link> */}

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

                        {/* <Link
                            href="/dashboard"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                            ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                            `}
                        >
                            Testimonials
                        </Link> */}

                        <Link
                            href="#contact"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
                            ${isSticky ? 'text-[#0D5EAD]' : 'text-[#0D5EAD] lg:text-white'}
                            `}
                        >
                            Contact Us
                        </Link>

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

            <Box sx={{ mt: { lg: "96px", xs: "60px" } }}>

                <Detail exerciseDetail={exerciseDetail} />
                <ExerciseVideos
                    exerciseVideos={exerciseVideos}
                    name={exerciseDetail.name}
                />
                <SimilarExercises
                    targetMuscleExercises={targetMuscleExercises}
                    equipmentExercises={equipmentExercises}
                />
            </Box>
            <Chatbot />
            <Contact />



        </>
    );
};

export default ExerciseDetail;
