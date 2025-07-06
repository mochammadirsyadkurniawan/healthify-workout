import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ trainer }) {
    return (
        <AdminLayout>
            <Head title={`Trainer - ${trainer.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-3 rounded-xl shadow-lg">
                                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                        Trainer Details
                                    </h1>
                                    {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300 bg-clip-text text-transparent">
                                        Trainer Details
                                    </h1> */}
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                                        Personal trainer information
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={route('admin.trainers.edit', trainer.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </Link>
                                <Link
                                    href={route('admin.trainers.index')}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to List
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                        {/* Header Card */}
                        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                {/* Profile Image */}
                                <div className="relative">
                                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white dark:bg-gray-700 p-2 shadow-xl">
                                        {trainer.image ? (
                                            <img
                                                src={`/storage/${trainer.image}`}
                                                alt={trainer.name}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700">
                                                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Badge */}
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                        Active
                                    </div>
                                </div>

                                {/* Basic Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {trainer.name}
                                    </h2>
                                    <p className="text-blue-100 dark:text-blue-200 text-lg mb-4">
                                        {trainer.specialty}
                                    </p>
                                    <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-semibold">{trainer.membership_type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Information */}
                        <div className="p-6 sm:p-8">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Trainer Information
                                </h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Name Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Full Name</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {trainer.name}
                                    </p>
                                </div>

                                {/* Specialty Card */}
                                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 p-6 rounded-xl border border-amber-200 dark:border-amber-700">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-amber-600 dark:bg-amber-500 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Specialty</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {trainer.specialty}
                                    </p>
                                </div>

                                {/* Membership Type Card */}
                                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700 md:col-span-2 lg:col-span-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-green-600 dark:bg-green-500 rounded-lg">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Membership Type</h4>
                                    </div>
                                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                                        {trainer.membership_type}
                                    </p>
                                </div>
                            </div>

                            {/* Stats or Additional Info Section */}
                            {/* <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                            Active
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Status
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                                            Expert
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Level
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                            {trainer.membership_type === 'PilatesPlus' ? 'Premium' : 'Standard'}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Tier
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}


// import React from 'react';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, Link } from '@inertiajs/react';

// export default function Show({ trainer }) {
//     return (
//         <AdminLayout>
//             <Head title={`Trainer - ${trainer.name}`} />

//             <div className="p-4 md:p-6 max-w-5xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Trainer Details</h1>
//                     <Link
//                         href={route('admin.trainers.index')}
//                         className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm shadow transition"
//                     >
//                         Back to List
//                     </Link>
//                 </div>

//                 {/* Trainer Info Card */}
//                 <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
//                     <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//                         {/* Image */}
//                         {trainer.image ? (
//                             <img
//                                 src={`/storage/${trainer.image}`}
//                                 alt={trainer.name}
//                                 className="w-32 h-32 object-cover rounded-full border border-gray-200"
//                             />
//                         ) : (
//                             <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 text-sm border">
//                                 No Image
//                             </div>
//                         )}

//                         {/* Text Info */}
//                         <div className="text-center md:text-left">
//                             <h2 className="text-xl font-semibold text-gray-800">{trainer.name}</h2>
//                             <p className="text-gray-600 mt-1">{trainer.specialty}</p>
//                         </div>

//                         {/* Membership type */}
//                         <div className="text-center md:text-left">
//                             <h2 className="text-xl font-semibold text-gray-800">{trainer.name}</h2>
//                             <p><strong>Tipe Membership:</strong> {trainer.membership_type}</p>
//                         </div>
//                     </div>
//                 </div>


//             </div>
//         </AdminLayout>
//     );
// }

