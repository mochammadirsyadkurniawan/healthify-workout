import React from "react";
import { Link } from "@inertiajs/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper & Carousel Styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";

// Fonts
import "@fontsource/poppins";

const ServicesCarousel = () => {
    const services = [
        { name: "🏋‍♂ Gym & Strength", image: "assets/service1.jpg" },
        { name: "💪 Full Body Workout", image: "assets/service2.jpg" },
        { name: "🦵 Ultimate Leg Day", image: "assets/service3.jpg" },
        { name: "❤️ High-Intensity Cardio", image: "assets/cardio.png" },
        { name: "🏆 Chest Power Training", image: "assets/service-chest.png" },
        { name: "🔥 Sculpted Shoulders", image: "assets/service-shoulders.png" }
    ];

    return (
        <section id="service" className="py-16 bg-gray-100">
            <div className="text-center mb-8">
                <h2 className="font-poppins text-[36px] sm:text-[48px] md:text-[60px] font-bold text-[#0D5EAD]">
                    Services
                </h2>
                <p className="text-base sm:text-lg text-gray-700 italic animate-fade-in">
                    Here's the services that we build for you
                </p>
            </div>

            <div className="relative mt-4 mb-8">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="px-2 sm:px-4"
                >
                    {services.map((service, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 border-4 border-gradient-to-r from-blue-500 to-purple-600">
                                <div className="h-[250px] sm:h-[300px] md:h-[450px] w-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={service.image}
                                        alt={service.name}
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                        {service.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="custom-pagination flex justify-center mt-6"></div>

            <div className="text-center mt-8">
                <Link
                    href="/workout-categories"
                    className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:scale-110 inline-block"
                >
                    Lihat Semua
                </Link>
            </div>
        </section>
    );
};

export default ServicesCarousel;
