import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Typed from 'typed.js';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../../css/swiper-custom.css';

const HeroSection = () => {
    const typedRef = useRef(null);

    useEffect(() => {
        if (typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [
                    'Strength & Cardio Training',
                    'Personalized Workouts',
                    'Health & Wellness Tips',
                    'Fitness & Gym Programs',
                    'Daily Workout Routines'
                ],
                typeSpeed: 80,
                backSpeed: 60,
                loop: true,
            });

            return () => typed.destroy();
        }
    }, []);

    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-screen"
                style={{
                    '--swiper-pagination-color': '#ff9000',
                    '--swiper-pagination-bottom': '30px',
                }}
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <section
                        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-fixed text-center font-[Poppins]"
                        style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
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
                                Unleash Your Potential with:{' '}
                                <span ref={typedRef} className="text-[#ff9000] font-bold"></span>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <section
                        className="relative w-full h-screen flex items-center justify-start bg-cover bg-center bg-fixed text-left font-[Poppins]"
                        style={{ backgroundImage: "url('images/banner-slider3.png')" }}
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
                                From strength training to yoga — find your fit.
                            </p>
                        </div>
                    </section>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <section
                        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-fixed font-[Poppins]"
                        style={{ backgroundImage: "url('images/bg-gympilates.png')" }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="z-10 text-center max-w-2xl">
                            <Link
                                href="/choose-membership"
                                className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight hover:text-[#ff9000] transition duration-300"
                            >
                                Membership <br />
                                Healthify Workout
                            </Link>
                            <p className="text-white mt-4 text-lg sm:text-xl">
                                Discover personalized plans for every workouts level.
                            </p>
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HeroSection;
