import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ShowUser({ user }) {
    const defaultPhoto = "/images/profile/profile-user.png";

    const profilePhoto = user?.profile_photo
        ? user.profile_photo.startsWith("http")
            ? user.profile_photo
            : user.profile_photo
        : defaultPhoto;

    // Format tanggal ke format lokal
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <AdminLayout>
            <Head title={`Detail User - ${user.name}`} />

            <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header & Back Button */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
                        Detail Akun Pengguna
                    </h1> */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                            Detail Akun Pengguna
                    </h1>
                    <Link
                        // href={route('admin.users.index')}
                        href={route('admin.users')}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md font-semibold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition ease-in-out duration-150"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali ke Daftar
                    </Link>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    {/* Foto dan Info Utama */}
                    <div className="flex flex-col md:flex-row items-center p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="w-32 h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                            <img
                                src={profilePhoto}
                                alt={`${user.name} profile photo`}
                                className="w-full h-full object-cover rounded-full ring-4 ring-blue-100 dark:ring-blue-900"
                            />
                        </div>
                        <div className="text-center md:text-left flex-grow">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {user.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {user.email}
                            </p>
                            <div className="mt-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    user.usertype === 'admin'
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                        : user.usertype === 'staff'
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                    {user.usertype}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Detail */}
                    <div className="p-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Role Pengguna
                                </dt>
                                <dd className="mt-1 text-gray-900 dark:text-white">
                                    {user.usertype}
                                </dd>
                            </div>

                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    ID Pengguna
                                </dt>
                                <dd className="mt-1 text-gray-900 dark:text-white">
                                    #{user.id}
                                </dd>
                            </div>

                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tanggal Pembuatan
                                </dt>
                                <dd className="mt-1 text-gray-900 dark:text-white">
                                    {formatDate(user.created_at)}
                                </dd>
                            </div>

                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Terakhir Diperbarui
                                </dt>
                                <dd className="mt-1 text-gray-900 dark:text-white">
                                    {formatDate(user.updated_at)}
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                        <Link
                            href={route('admin.users.edit', user.id)}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wider hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition ease-in-out duration-150"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wider hover:bg-red-700 active:bg-red-800 focus:outline-none focus:border-red-900 focus:ring focus:ring-red-300 dark:focus:ring-red-700 transition ease-in-out duration-150"
                            onClick={() => confirm('Apakah Anda yakin ingin menghapus pengguna ini?')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}


// import React from 'react';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, Link, usePage } from '@inertiajs/react';

// export default function ShowUser({ user }) {
//     const defaultPhoto = "/images/profile/profile-user.png";

//     const profilePhoto = user?.profile_photo
//         ? user.profile_photo.startsWith("http")
//             ? user.profile_photo
//             : user.profile_photo
//         : defaultPhoto;

//     // Format tanggal ke format lokal
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" };
//         return new Date(dateString).toLocaleDateString("id-ID", options);
//     };

//     return (
//         <AdminLayout>
//             <Head title={`Detail User: ${user.name}`} />
//             <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-6">

//                 {/* Header & Back Button */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <h2 className="text-2xl sm:text-3xl font-extrabold text-orange-600 flex items-center gap-2">
//                         Detail Akun Pengguna
//                     </h2>
//                     <Link
//                         href={route('admin.users')}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm shadow transition"
//                     >
//                         Back to list
//                     </Link>
//                 </div>

//                 {/* Foto dan Info Utama */}
//                 <div className="flex items-center gap-6 border-b pb-6">
//                     <img
//                         src={profilePhoto}
//                         alt="Foto Profil"
//                         className="w-24 h-24 rounded-full border object-cover shadow"
//                     />
//                     <div>
//                         <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
//                         <p className="text-gray-600">{user.email}</p>
//                     </div>
//                 </div>

//                 {/* Informasi Detail */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
//                     <div className="flex flex-col">
//                         <span className="text-gray-500 font-medium">Role Pengguna:</span>
//                         <span className="font-semibold">{user.usertype}</span>
//                     </div> <br />
//                     <div className="flex flex-col">
//                         <span className="text-gray-500 font-medium">Tanggal Pembuatan:</span>
//                         <span>{formatDate(user.created_at)}</span>
//                     </div>
//                     <div className="flex flex-col">
//                         <span className="text-gray-500 font-medium">Terakhir Diperbarui:</span>
//                         <span>{formatDate(user.updated_at)}</span>
//                     </div>
//                 </div>

//             </div>
//         </AdminLayout>
//     );
// }

// import AdminLayout from '@/Layouts/AdminLayout copy 2'
// import React from 'react'

// const ShowUser = () => {
//     return (
//         <>
//             <AdminLayout>
//                 <h1>Halaman - Show Users Details</h1>
//             </AdminLayout>
//         </>
//     )
// }

// export default ShowUser
