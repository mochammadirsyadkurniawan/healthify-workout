import React from 'react';
import { router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import "../../Components/Chatbot";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Chatbot from '../../Components/Chatbot';
import { motion, AnimatePresence } from "framer-motion";
import Contact from '../user/Contact';
import Header from '@/Components/Header';

import "../../../css/user/styles.css";

export default function ChooseMembership() {
    const handleSelect = (packageName) => {
        router.get('/apply-membership', { membership: packageName });
    };

    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { post } = useForm();


    const trainers = [
        { name: "William", image: "/images/trainers/1.png" },
        { name: "Rio", image: "/images/trainers/2.png" },
        { name: "Aprilia", image: "/images/trainers/5.png" },
        { name: "Calvin", image: "/images/trainers/7.png" },
        { name: "Juan", image: "/images/trainers/10.png" },
        { name: "Angely", image: "/images/trainers/6.png" },
    ];


    // FAQ Section
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Bagaimana cara mendaftar membership?",
            answer: "Kamu bisa memilih paket yang tersedia lalu klik \"Pilih Paket\". Setelah itu, kamu akan diarahkan ke halaman pengisian data dan pembayaran.",
        },
        {
            question: "Apakah saya bisa upgrade ke Pilates+ setelah daftar reguler?",
            answer: "Tentu saja! Kamu bisa melakukan upgrade melalui halaman profil member setelah pembayaran pertama.",
        },
        {
            question: "Kapan membership saya aktif?",
            answer: "Membership akan aktif maksimal 24 jam setelah bukti pembayaran diverifikasi oleh tim kami.",
        },
        {
            question: "Apakah membership bisa dibatalkan?",
            answer: "Membership yang sudah aktif tidak bisa dibatalkan, tapi kamu bisa menghentikan perpanjangan otomatis.",
        },
        {
            question: "Apakah ada masa percobaan gratis?",
            answer: "Untuk saat ini belum tersedia masa percobaan gratis. Tapi kamu bisa memanfaatkan promo yang sedang berlangsung.",
        },
        {
            question: "Apakah bisa mendaftar lebih dari satu paket?",
            answer: "Tidak, kamu hanya bisa mendaftar satu jenis paket pada satu waktu. Namun kamu bisa mengganti paket setelah masa aktif berakhir.",
        },
        {
            question: "Apa saja metode pembayaran yang tersedia?",
            answer: "Kami mendukung transfer bank, e-wallet, dan QRIS. Informasi detail akan muncul di halaman pembayaran.",
        },
        {
            question: "Apakah tersedia trainer pribadi?",
            answer: "Ya! Kamu bisa menambahkan personal trainer saat pendaftaran atau melalui halaman profil.",
        },
        {
            question: "Apakah fasilitas gym buka setiap hari?",
            answer: "Fasilitas gym buka setiap hari dari pukul 06.00 sampai 22.00 WIB, kecuali pada hari libur nasional tertentu.",
        },
        {
            question: "Bagaimana jika saya lupa membawa kartu member?",
            answer: "Tenang, kamu cukup menunjukkan QR code digital dari aplikasi kami saat check-in.",
        },
    ];


    // Countdown Timer
    const [remainingTime, setRemainingTime] = useState(0);
    const countdownKey = "membershipCountdownEnd";
    const endTimeRef = useRef(null);

    const setNewEndTime = () => {
        const now = Math.floor(Date.now() / 1000); // Detik sekarang
        const newEndTime = now + 3 * 24 * 60 * 60; // 3 hari dari sekarang
        localStorage.setItem(countdownKey, newEndTime);
        endTimeRef.current = newEndTime;
        return newEndTime;
    };

    useEffect(() => {
        const now = Math.floor(Date.now() / 1000);
        const storedEndTime = parseInt(localStorage.getItem(countdownKey), 10);

        if (storedEndTime && !isNaN(storedEndTime) && storedEndTime > now) {
            // Kalau ada data di localStorage dan belum lewat
            endTimeRef.current = storedEndTime;
        } else {
            // Kalau tidak ada data atau sudah kadaluarsa
            setNewEndTime();
        }

        const interval = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            let timeLeft = endTimeRef.current - now;

            if (timeLeft <= 0) {
                // Kalau habis, reset lagi 3 hari ke depan
                setNewEndTime();
                timeLeft = endTimeRef.current - now;
            }

            setRemainingTime(timeLeft);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const countdown = [
        Math.floor(remainingTime / (60 * 60 * 24)), // Days
        Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60)), // Hours
        Math.floor((remainingTime % (60 * 60)) / 60), // Minutes
        remainingTime % 60, // Seconds
    ];

    return (
        <>
            <Head>
                <title>Membership</title>

                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0" />
            </Head>

            <Header />


            {/* Hero Section */}
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[url('/images/bg-gympilates.png')] bg-cover bg-center bg-fixed text-white text-center font-[Poppins] px-4 py-16">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-20">
                        Pilih Paket Healthify yang{' '}
                        <span className="underline text-primary">Sesuai</span><br />
                        dengan <span className="underline text-primary">Kebutuhanmu</span>
                    </h2>

                    <p className="mb-5 text-center text-gray-300 max-w-2xl text-sm md:text-base">
                        Nikmati akses penuh ke semua fasilitas dan kelas eksklusif di Healthify Workout
                    </p>

                    {/* Countdown Timer */}
                    <div className="mb-10 text-center text-white mt-10 w-full max-w-4xl overflow-x-auto">
                        <h3 className="text-xl md:text-2xl font-bold mb-4 whitespace-nowrap">
                            PENAWARAN TERBATAS HANYA UNTUKMU
                        </h3>
                        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 px-2">
                            {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((label, index) => (
                                <div
                                    key={label}
                                    className="bg-black/70 px-4 py-3 rounded-lg shadow-lg border border-white min-w-[80px] flex flex-col items-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold">
                                        {countdown[index].toString().padStart(2, "0")}
                                    </div>
                                    <div className="text-xs md:text-sm mt-1 uppercase tracking-wide text-gray-200">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card Memberships */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl w-full px-2 md:px-0">
                        {/* Regular Gym */}
                        <div
                            className="relative bg-cover bg-center rounded-xl overflow-hidden border border-blue-600 min-h-[600px]"
                        >
                            <div className="bg-black/60 p-4 md:p-6 h-full flex flex-col justify-between">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Regular Gym</h1>
                                    <h1 className="text-xl md:text-2xl font-bold mb-4">Membership</h1>
                                    <h1 className="text-sm mb-2">Mulai dari</h1>
                                    <p className="text-gray-300 line-through text-sm md:text-base">Rp 500.000/bulan</p>
                                    <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Rp 333.000<span className="text-base">/bulan</span>
                                    </p>
                                    <ul className="text-sm md:text-lg mb-6 space-y-1 text-left">
                                        <li>✅ Akses gym Healthify Workout se-Indonesia</li>
                                        <li>✅ Akses seluruh kelas reguler</li>
                                        <li>✅ Handuk</li>
                                        <li>✅ Free Access locker system</li>
                                        <li>✅ Buka 24 jam</li>
                                        <li>✅ Akses ke Steam, Sauna, dan fasilitas lainnya</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => handleSelect('Reguler Gym Membership')}
                                    className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded text-white font-semibold mt-4"
                                >
                                    Pilih Paket
                                </button>
                            </div>
                        </div>

                        {/* Pilates+ */}
                        <div
                            className="relative bg-cover bg-center rounded-xl overflow-hidden border border-pink-600 min-h-[600px]"

                        >
                            <div className="bg-black/60 p-4 md:p-6 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2">Pilates+</h3>
                                    <h1 className="text-xl md:text-2xl font-bold mb-4">Membership</h1>
                                    <h1 className="text-sm mb-2">Mulai dari</h1>
                                    <p className="text-gray-300 line-through text-sm md:text-base">Rp 2.000.000/bulan</p>
                                    <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                                        Rp 1.083.000<span className="text-base">/bulan</span>
                                    </p>
                                    <ul className="text-sm md:text-lg mb-6 space-y-1 text-left">
                                        <li>✅ Semua manfaat reguler membership</li>
                                        <li>✅ Akses seluruh kelas grup Pilates setiap hari</li>
                                        <li className="ms-5">⭐ Reformer Pilates (Basic & Flow)</li>
                                        <li className="ms-5">⭐ Tower Pilates (Basic & Flow)</li>
                                        <li className="ms-5">⭐ Chair Pilates</li>
                                        <li className="ms-5">⭐ Dan masih banyak lagi</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => handleSelect('Pilates+ Membership')}
                                    className="bg-pink-600 hover:bg-pink-700 w-full py-2 rounded text-white font-semibold mt-4"
                                >
                                    Pilih Paket
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trainer Section */}
            <section className="w-full min-h-screen bg-black text-white py-16 px-6">
                <div className="max-w-7xl mx-auto overflow-visible">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Personal Trainer dan Instruktur Bersertifikat
                    </h2>
                    <p className="text-center text-gray-300 mb-10">
                        Nikmati bimbingan dari <i>personal trainer</i> bersertifikat nasional dan internasional yang siap menemanimu di setiap latihan serumu
                    </p>

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        pagination={{ clickable: true, el: ".custom-pagination" }}
                        autoplay={{ delay: 4000 }}
                        loop={true}
                        className="px-2 sm:px-4"
                    >
                        {trainers.map((trainer, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-4 sm:p-6 rounded-xl text-center shadow-lg transition-transform duration-300 h-[420px] sm:h-[500px] w-[90%] max-w-[300px] flex flex-col justify-center mx-auto">
                                    <img
                                        src={trainer.image}
                                        alt={trainer.name}
                                        className="w-[180px] h-[230px] object-cover rounded-full mx-auto mb-[20px] sm:mb-[32px] transition-transform duration-500 hover:scale-150"
                                    />

                                    <h3 className="text-xl sm:text-2xl font-bold mb-2 mt-3">{trainer.name}</h3>
                                    <p className="text-sm sm:text-md text-gray-300">Personal Trainer</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="custom-pagination flex justify-center mt-6"></div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="w-full bg-black text-white py-16 px-6 mt-0">
                <div className="mt-16 px-4 max-w-[1140px] mx-auto py-12 sm:py-20 lg:py-[100px]">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[minmax(100px,_auto)] gap-4">

                        {/* Glimpse of */}
                        <div className="col-span-2 sm:col-span-3 md:col-span-2 row-span-1 flex items-center justify-center text-center bg-black rounded-lg">
                            <h2 className="text-xl sm:text-3xl font-bold text-white">
                                <span className="block text-[48px] sm:text-[82px] leading-none">Glimpse</span>
                                <span className="block italic text-[64px] sm:text-[123px] font-mrs-eaves leading-none lg:ms-[200px] md:ms-[200px]">of</span>
                            </h2>
                        </div>

                        {/* Images */}
                        <img src="/images/gallery/gallery-10.jpg" alt="Gallery 3" className="col-span-2 sm:col-span-1 md:col-span-2 row-span-1 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-3.jpg" alt="Gallery 2" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-4.jpg" alt="Gallery 4" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-11.jpg" alt="Gallery 5" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-12.jpg" alt="Gallery 6" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-6.jpg" alt="Gallery 7" className="col-span-2 sm:col-span-2 row-span-3 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-9.jpg" alt="Gallery 8" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-14.jpg" alt="Gallery 9" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-15.jpg" alt="Gallery 8" className="col-span-2 sm:col-span-2 row-span-2 object-cover w-full h-full rounded-lg" />

                        <img src="/images/gallery/gallery-7.jpg" alt="Gallery 9" className="col-span-2 sm:col-span-2 row-span-3 object-cover w-full h-full rounded-lg" />

                        <div className="col-span-2 sm:col-span-3 md:col-span-2 row-span-1 flex items-center justify-center text-center bg-black rounded-lg">
                            <h2 className="text-xl sm:text-3xl font-bold text-white">
                                <span className="block text-[48px] sm:text-[82px] leading-none ms-[20px]">Healthify</span>
                                <span className="block text-[48px] sm:text-[82px] leading-none lg:ms-[125px] md:ms-[200px]">Workout</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-black text-white py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-14 text-white">
                        Pertanyaan yang <span className="text-pink-500">Sering Ditanyakan</span>
                    </h2>

                    <div className="space-y-6 mb-12">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={index}
                                    className="border-b border-gray-700 pb-4"
                                >
                                    <div
                                        className={`flex items-center justify-between cursor-pointer transition-colors duration-300 ${isOpen ? "text-[#0D5EAD]" : ""
                                            }`}
                                        onClick={() => toggleFAQ(index)}
                                    >
                                        <h3
                                            className={`text-xl font-semibold transition-colors duration-300 ${isOpen ? "text-[#0D5EAD]" : "text-white hover:text-[#0D5EAD]"
                                                }`}
                                        >
                                            {faq.question}
                                        </h3>

                                        <span
                                            className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-45 text-[#0D5EAD]" : "rotate-0"
                                                }`}
                                        >
                                            {isOpen ? "+" : "+"}
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.p
                                                className="text-gray-300 mt-3"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {faq.answer}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tombol Tanya CS */}
                    <div className="text-center mt-[-20px]">
                        <p className="text-lg font-medium mb-4 text-white">Punya pertanyaan lain?</p>
                        <a
                            href="https://wa.me/6287854592659" // Ganti dengan nomor CS kamu
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-md transition-colors duration-300"
                            style={{
                                color: "#ff9000",
                                border: "1px solid #0D5EAD"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#ff9000";
                                e.currentTarget.style.color = "#000";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#ff9000";
                            }}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.52 3.48A11.89 11.89 0 0 0 12.05 0C5.71 0 .61 5.11.61 11.44c0 2.02.53 3.98 1.54 5.71L0 24l6.99-2.12a11.94 11.94 0 0 0 5.05 1.18h.01c6.34 0 11.45-5.11 11.45-11.45a11.9 11.9 0 0 0-3.48-8.13zM12.05 22.14c-1.54 0-3.06-.38-4.43-1.1l-.32-.17-4.15 1.26 1.29-4.03-.21-.33a9.47 9.47 0 0 1-1.45-5.06c0-5.26 4.28-9.54 9.54-9.54 2.55 0 4.94.99 6.74 2.79a9.5 9.5 0 0 1 2.8 6.75c0 5.27-4.29 9.53-9.55 9.53zm5.56-7.13c-.3-.15-1.76-.86-2.03-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.94 1.15-.17.2-.35.22-.65.08-.3-.15-1.27-.47-2.42-1.49a9.1 9.1 0 0 1-1.7-2.12c-.18-.3-.02-.46.13-.6.13-.13.3-.35.46-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.66-1.6-.91-2.2-.24-.58-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.8.35-.28.3-1.06 1.03-1.06 2.5s1.09 2.9 1.24 3.1c.15.2 2.13 3.25 5.18 4.56.73.31 1.3.5 1.75.64.73.23 1.39.2 1.92.12.59-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.1-.13-.27-.2-.57-.35z" />
                            </svg>
                            Tanya Customer Service
                        </a>

                    </div>
                </div>
            </section>


            <Chatbot />

            <Contact />
        </>
    );
}
