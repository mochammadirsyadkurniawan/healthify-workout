import { Link, Head } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import "../../css/user/styles.css";

const KebijakanPrivasi = () => {
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
                <title>Privacy Policy</title>
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
            {/* <Header/> */}
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
                            // href="#profile"
                            href="/"
                            className={`text-base font-medium hover:text-primary transition-colors duration-300
    ${isSticky ? "text-[#0D5EAD]" : "text-[#0D5EAD] lg:text-white"}
    `}
                        >
                            About Us
                        </Link>

                        <Link
                            href="/"
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
                            href="/"
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
            <div
                id="home"
                className="relative w-full h-[270px] flex items-center justify-center bg-[url('/images/banner-bg.jpg')] bg-cover bg-center bg-fixed text-center font-[Poppins]"
            >
                <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none"></div>
                <h1 className="relative text-white text-3xl md:text-5xl lg:text-5xl font-bold z-10">
                    Privacy Policy
                </h1>
            </div>

            <section className="max-w-4xl mx-auto px-6 py-12 font-[Poppins] text-[#333]">
                <h2 className="text-3xl font-bold mb-10 md:text-5xl">
                    Privacy Policy
                </h2>
                <h3 className="text-xl font-bold mb-2">1. Umum</h3>
                <p className="mb-6 text-justify">
                    Dengan mengakses aplikasi ini, Anda setuju untuk terikat
                    dengan Syarat dan Ketentuan Penggunaan, semua hukum dan
                    peraturan, dan setuju bahwa Anda bertanggung jawab untuk
                    mematuhi hukum dan peraturan yang berlaku. Bacalah dengan
                    seksama Syarat dan Ketentuan Penggunaan di bawah sebelum
                    mengakses aplikasi ini, sehingga Anda dapat menggunakan
                    aplikasi ini dengan baik. Bila Anda tidak menyetujui
                    prasyarat penggunaan, sebaiknya Anda tidak meneruskan ke
                    langkah berikutnya.
                </p>

                <h3 className="text-xl font-bold mb-2">
                    2. Modifikasi Syarat dan Ketentuan
                </h3>
                <p className="mb-6 text-justify">
                    Kementerian Keuangan Republik Indonesia (Kementerian
                    Keuangan atau Kemenkeu) dapat merevisi Syarat dan Ketentuan
                    Penggunaan untuk aplikasi ini setiap saat tanpa
                    pemberitahuan. Oleh sebab itu diharapkan Anda mengikuti
                    perkembangannya secara periodik.
                </p>

                <h3 className="text-xl font-bold mb-2">3. Hukum</h3>
                <p className="mb-6 text-justify">
                    Setiap klaim yang berkaitan dengan aplikasi Website
                    Pusdiklat Keuangan Umum ini terikat oleh hukum di Negara
                    Republik Indonesia tanpa terkecuali.
                </p>

                <h3 className="text-xl font-bold mb-2">
                    4. Revisi dan Kesalahan
                </h3>
                <p className="mb-6 text-justify">
                    Materi yang muncul di aplikasi Website Pusdiklat Keuangan
                    Umum dapat memiliki kesalahan teknis, kesalahan ketik, atau
                    fotografi. Kementerian Keuangan dapat membuat perubahan
                    materi yang terkandung di situs setiap saat tanpa adanya
                    pemberitahuan. Kementerian Keuangan tidak membuat komitmen
                    apapun untuk memperbarui materi.
                </p>
                <h3 className="text-xl font-bold mb-2">5. Jaminan Sajian</h3>
                <p className="mb-6 text-justify">
                    Aplikasi ini dibangun untuk kenyamanan pengguna. Untuk itu
                    Kami berusaha menyajikan seluruh informasi (teks, grafis dan
                    seluruh atribut yang ada) dengan sebaik-baiknya. Namun Kami
                    tidak dapat menjamin bahwa informasi yang kami sajikan dapat
                    memenuhi keinginan seluruh pengguna aplikasi ini.
                </p>
                <h3 className="text-xl font-bold mb-2">6. Copyright</h3>
                <p className="mb-6 text-justify">
                    Isi keseluruhan (teks, grafis dan seluruh atribut yang ada)
                    pada situs ini adalah karya cipta dan properti Kementerian
                    Keuangan yang dilindungi hukum. Segala bentuk penggunaan
                    material yang bersifat komersial harus seizin Kementerian
                    Keuangan. Segala tindakan yang dengan sengaja mengakibatkan
                    rusaknya data, program, informasi dan hal-hal yang berkaitan
                    dengan itu, dianggap sebagai perbuatan melanggar hukum.
                </p>
                <h3 className="text-xl font-bold mb-2">
                    7. Keamanan Transmisi
                </h3>
                <p className="mb-6 text-justify">
                    Penggunaan Internet dan e-mail tidaklah bersifat rahasia
                    karena terdapat kemungkinan informasi yang dikirimkan kepada
                    Kami terbaca atau digunakan oleh pihak lain. Untuk
                    melindungi rahasia Anda, sebaiknya e-mail yang dikirimkan
                    tidak berisi informasi yang sensitif seperti nilai rekening,
                    laporan keuangan, dsb. Seluruh data yang ditransmisikan
                    melalui aplikasi ini telah menggunakan protokol keamanan
                    untuk melindungi dari akses yang tidak sah. Untuk menjamin
                    integritas dan kerahasaiaan data, pengguna tidak
                    diperkenankan untuk menginformasikan password yang dimiliki
                    oleh pengguna kepada siapapun.
                </p>
                <h3 className="text-xl font-bold mb-2">
                    8. Link ke Sumber Daya Lain
                </h3>
                <p className="mb-6 text-justify">
                    {" "}
                    Beberapa informasi pada aplikasi ini menyediakan tautan
                    kepada sumber daya lain untuk memudahkan anda melihat
                    informasi yang berhubungan dengan sumber daya lain. Kami
                    tidak melakukan pemeliharaan dan kontrol terhadap para
                    organisasi pemilik sumber daya atau para organisasi penyedia
                    informasi tersebut. Oleh karena itu informasi yang tersaji
                    tersebut berada di luar tanggung jawab kami.
                </p>
                <h3 className="text-xl font-bold mb-2">9. Terminasi Akses</h3>
                <p className="mb-6 text-justify">
                    Kami berhak untuk menghentikan akses pengguna terhadap
                    aplikasi ini apabila terdapat penyalahgunaan yang dilakukan
                    oleh pengguna.
                </p>

                <h3 className="text-xl font-bold mb-2">10. Umpan Balik</h3>
                <p className="mb-6 text-justify">
                    Untuk menghindari segala kesalahpahaman, Kami menghargai
                    segala masukan yang diberikan ataupun yang Anda kirimkan
                    kepada Kami, baik ide, saran, usulan, dan sebagainya; akan
                    menjadi milik Kami tanpa diberikan kompensasi dan tidak ada
                    klaim untuk hal tersebut.
                </p>
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
                                href="https://www.instagram.com/pusdiklat.ku/"
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

export default KebijakanPrivasi;
