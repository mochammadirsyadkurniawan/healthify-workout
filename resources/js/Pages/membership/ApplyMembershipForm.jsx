import React, { useEffect, useState } from "react";
import { useForm, usePage, Head, Link } from "@inertiajs/react";
import Chatbot from "@/Components/Chatbot";
import axios from "axios";
import Header from "@/Components/Header";


export default function ApplyMembership() {
    const { props } = usePage();
    const user = props?.auth?.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const membershipSelected = searchParams.get("membership");
    const [errors, setErrors] = useState({});
    const { data, setData, post, progress, reset } = useForm({
        user_id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
        membership: membershipSelected || "",
        personal_trainer_id: "",
        bukti_transfer: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!data.personal_trainer_id) {
            validationErrors.personal_trainer_id = "The personal trainer field is required.";
        }

        if (!data.bukti_transfer) {
            validationErrors.bukti_transfer = "The bukti transfer field is required.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Jika lolos validasi
        setErrors({});
        post("/store-membership", {
            onSuccess: () => {
                alert("Membership berhasil diajukan!");
                reset();
            },
        });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post("/logout");
    };



    const getHargaMembership = (paket) => {
        switch (paket) {
            case "Reguler Gym Membership":
                return 333000;
            case "Pilates+ Membership":
                return 1083000;
            default:
                return 0;
        }
    };

    const normalizeMembership = (type) => {
        if (!type) return '';
        switch (type.toLowerCase().trim()) {
            case 'reguler gym membership':
                return 'Reguler Gym';
            case 'pilates+ membership':
                // case 'pilatesplus membership':
                return 'PilatesPlus';
            default:
                return type;
        }
    };

    const totalBiaya = getHargaMembership(data.membership);
    const [trainers, setTrainers] = useState([]);

    // kuota dari personal trainer
    const MAX_QUOTA = 10;

    useEffect(() => {
        if (data.membership) {
            const normalized = normalizeMembership(data.membership);
            axios
                .get(`/trainers/by-membership?membership_type=${encodeURIComponent(normalized)}`)
                .then((response) => {
                    setTrainers(response.data);
                })
                .catch((error) => {
                    console.error("Failed to fetch trainers:", error);
                    setTrainers([]);
                });
        }
    }, [data.membership]);


    return (
        <>
            <Head>
                <title>Membership</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"
                />
            </Head>

            <Header />

            <div
                id="applyMembership"
                className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-blue-100 px-4 pt-32 pb-20 font-[Poppins]"
            >
                <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-accent">
                        Formulir Pendaftaran Membership
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6 text-left"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Nama</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                value={data.name}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                value={data.email}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Paket Membership</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                                value={data.membership}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Pilih Personal Trainer</label>
                            {trainers.length === 0 ? (
                                <p className="text-gray-500 italic text-sm">Tidak ada trainer tersedia untuk paket ini.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {trainers.map((trainer) => {
                                        const isFull = trainer.quota_used >= MAX_QUOTA;

                                        return (
                                            <label
                                                key={trainer.id}
                                                className={`relative flex items-center gap-4 p-3 border rounded-lg cursor-pointer shadow-sm transition duration-200
                                                    ${data.personal_trainer_id === trainer.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:shadow-md"}
                                                    ${isFull ? "opacity-50 cursor-not-allowed" : ""}
                                                `}
                                            >
                                                <input
                                                    type="radio"
                                                    name="personal_trainer_id"
                                                    value={trainer.id}
                                                    checked={data.personal_trainer_id === trainer.id}
                                                    onChange={(e) => setData("personal_trainer_id", parseInt(e.target.value))}
                                                    className="accent-accent"
                                                    disabled={isFull}
                                                />
                                                <img
                                                    src={`/storage/${trainer.image}`}
                                                    alt={trainer.name}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">{trainer.name}</p>
                                                    <p className="text-sm text-gray-600">{trainer.specialty}</p>
                                                    <p className="text-xs text-gray-500 mt-1">Kuota: {trainer.quota_used}/{MAX_QUOTA}</p>
                                                </div>
                                                {isFull && (
                                                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                                        Penuh
                                                    </span>
                                                )}
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                            {errors.personal_trainer_id && <div className="text-red-500 text-sm mt-1">{errors.personal_trainer_id}</div>}
                        </div>

                        {totalBiaya > 0 && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Total Biaya Membership</label>
                                <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                                    <p className="text-lg font-bold text-green-700">
                                        Rp {totalBiaya.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Transfer ke Rekening</label>
                            <div className="bg-gray-100 p-4 rounded-lg space-y-1">
                                <p className="text-sm font-semibold">Bank BCA</p>
                                <p className="text-lg font-bold">3100265001</p>
                                <p className="text-sm">
                                    a.n. Mochammad Irsyad Kurniawan <span className="font-extrabold">(CEO Healtify Workout Indonesia)</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">QR Code Pembayaran</label>
                            <div className="flex justify-center mt-3">
                                <img
                                    src="/images/qris-irsyad.jpeg"
                                    alt="QR Code BCA"
                                    className="w-full sm:w-auto max-h-[600px] object-contain rounded-md shadow"
                                    loading="lazy"
                                />
                                {/* <img
                                    src="/images/qr-code-bca.jpg"
                                    alt="QR Code BCA"
                                    className="w-full sm:w-auto max-h-[600px] object-contain rounded-md shadow"
                                    loading="lazy"
                                /> */}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Upload Bukti Transfer</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData("bukti_transfer", e.target.files[0])}
                                className="w-full mt-2 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-600"
                            />
                            {errors.bukti_transfer && (
                                <div className="text-red-500 text-sm mt-1">{errors.bukti_transfer}</div>
                            )}
                            {progress && (
                                <div className="text-sm mt-1 text-blue-500">
                                    Uploading... {progress.percentage}%
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-blue-600 transition duration-200 text-white py-3 rounded-lg font-semibold text-sm sm:text-base mt-2"
                        >
                            Apply Membership
                        </button>
                    </form>
                </div>
            </div>
            <Chatbot />
        </>
    );
}

