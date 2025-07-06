import { Head } from "@inertiajs/react";

export default function Contact() {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
                />

                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    rel="stylesheet"
                />
            </Head>

            {/* contact us */}
            <section
                className="contact-section pt-28 px-8 py-12 contact bg-black min-h-screen"
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
                                href="mailto:mochammadirsyadkurniawan@gmail.com"
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
                        href={"/privacy-policy"}
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
}
