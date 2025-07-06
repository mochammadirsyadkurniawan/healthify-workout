import Header from "@/Components/Header";
import React from "react";
import Chatbot from "@/Components/Chatbot";
// import Contact from "./Contact";
import Contact from "./user/Contact";
import { usePage, Head } from "@inertiajs/react";
// import "../../css/styles.css";
import "../../css/user/styles.css";

const PrivacyPolicy = () => {
    return (
        <>
        <Head title="Privasi Policy"/>
        <Header/>
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
                <h2 className="text-3xl font-bold mb-10 md:text-5xl">Privacy Policy</h2>
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
                <p className="mb-6 text-justify"> Beberapa informasi pada aplikasi ini menyediakan tautan kepada sumber daya lain untuk memudahkan anda melihat informasi yang berhubungan dengan sumber daya lain. Kami tidak melakukan pemeliharaan dan kontrol terhadap para organisasi pemilik sumber daya atau para organisasi penyedia informasi tersebut. Oleh karena itu informasi yang tersaji tersebut berada di luar tanggung jawab kami.</p>
                <h3 className="text-xl font-bold mb-2">9. Terminasi Akses</h3>
                <p className="mb-6 text-justify">
                                        Kami berhak untuk menghentikan akses pengguna terhadap aplikasi ini apabila terdapat penyalahgunaan yang dilakukan oleh pengguna.
                </p>

                <h3 className="text-xl font-bold mb-2">10. Umpan Balik</h3>
                <p className="mb-6 text-justify">
                    Untuk menghindari segala kesalahpahaman, Kami menghargai segala masukan yang diberikan ataupun yang Anda kirimkan kepada Kami, baik ide, saran, usulan, dan sebagainya; akan menjadi milik Kami tanpa diberikan kompensasi dan tidak ada klaim untuk hal tersebut.
                </p>
            </section>

            <Chatbot />


                <Contact />


        </>
    )
};

export default PrivacyPolicy;
