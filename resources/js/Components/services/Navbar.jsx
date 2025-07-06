import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { Link, usePage, useForm, Head } from "@inertiajs/react";
import Logo from "../../../../public/assets/logo.png";
// import "../../../css/user/navbar.css";

const Navbar = () => {
    const user = usePage().props.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };

    useEffect(() => {
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
        return () => window.removeEventListener("scroll", handleScroll);
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


    // Notifikasi


    return (
        <>
            <Head>
                <title>Healthify Workout</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" />
            </Head>

            <header>
                <a href="/" className="logo">
                    <img src="/assets/logo.png" alt="logo" />
                </a>

                {/* Menu Toggle */}
                <div className="menuToggle" id="menuToggle">

                </div>

                {/* Navigation */}
                <nav>
                    <ul className="navigation" id="navigationMenu">
                        <li><Link href="/dashboard">Home</Link></li>
                        <li><Link href="/dashboard">About Us</Link></li>
                        <li><Link href="/dashboard">Services</Link></li>
                        <li><Link href="/choose-membership">Membership</Link></li>
                        <li><Link href="/workout-categories" className="nav-link">Workout Categories</Link></li>
                        <li><a href="#exercises" className="nav-link">Exercises</a></li>
                        <li><Link href="/dashboard">Testimonials</Link></li>
                        <li><a href="#contact">Contact Us</a></li>
                        {/* <li><Link href="/user/contact">Contact Us</Link></li> */}

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
        </>
    );
};

export default Navbar;



{/* <header className="navbar">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px="20px"
                    className="nav-container"
                    sx={{ width: "100%" }} // Pastikan width penuh
                >
                    <Link href="/workout-categories">
                        <img src={Logo} alt="logo" className="nav-logo" />
                    </Link>
                    <div className="menuToggle" onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}></div>
                    <nav className={showingNavigationDropdown ? "open" : ""}>
                        <ul className="navigation">
                            <li><Link href="/dashboard">Home</Link></li>
                            <li><Link href="/dashboard">About Us</Link></li>
                            <li><Link href="/dashboard">Services</Link></li>
                            <li><Link href="/dashboard">Testimonials</Link></li>
                            <li><Link href="/workout-categories" className="nav-link">Workout Categories</Link></li>
                            <li><a href="#exercises" className="nav-link">Exercises</a></li>
                            <li><Link href="/user/contact">Contact Us</Link></li>
                            {user && (
                                <li className={`dropdown ${showDropdown ? "active" : ""}`}>
                                    <a href="#" className="dropdown-toggle" onClick={(e) => {
                                        e.preventDefault();
                                        setShowDropdown(!showDropdown);
                                    }}>
                                        <i className="fas fa-user-circle"></i> {user.name}
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
                </Stack>
            </header> */}
