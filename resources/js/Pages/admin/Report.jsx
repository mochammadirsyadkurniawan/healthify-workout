import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Report() {
    const { memberships } = usePage().props;

    const handleExportPDF = () => {
        window.open('/admin/reports/memberships/pdf', '_blank');
    };

    return (
        <AdminLayout>
            <Head title="Report" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-lg">
                                    <img
                                        src="/images/report.png"
                                        alt="Report Icon"
                                        className="w-12 h-12 filter brightness-0 invert"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-4xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                        Laporan Membership
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                                        Kelola dan export data membership dengan mudah
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{memberships.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accepted</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {memberships.filter(m => m.status === 'Accepted').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                    <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {memberships.filter(m => m.status === 'Pending').length}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {memberships.filter(m => m.status === 'Rejected').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Data Membership
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Daftar lengkap semua membership yang telah diajukan
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Member
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Membership
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Personal Trainer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {memberships.length > 0 ? (
                                        memberships.map((m, index) => (
                                            <tr
                                                key={m.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                        {index + 1}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {m.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {m.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {m.membership}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {m.personal_trainer ? (
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <img
                                                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-300 dark:ring-gray-600"
                                                                    src={`/storage/${m.personal_trainer.image}`}
                                                                    alt={m.personal_trainer.name}
                                                                />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                    {m.personal_trainer.name}
                                                                </p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                                    {m.personal_trainer.specialty}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 dark:text-gray-500 italic">
                                                            Tidak ada
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                                                            ${m.status === "Accepted"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : m.status === "Rejected"
                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                            }`}
                                                    >
                                                        <span className={`w-2 h-2 rounded-full mr-2 ${m.status === "Accepted"
                                                                ? "bg-green-400"
                                                                : m.status === "Rejected"
                                                                    ? "bg-red-400"
                                                                    : "bg-yellow-400"
                                                            }`}></span>
                                                        {m.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center justify-center">
                                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                        Tidak ada data membership tersedia
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Export Buttons */}
                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Export Data
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                onClick={handleExportPDF}
                                className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export PDF
                            </button>

                            <button
                                onClick={() => window.open('/admin/reports/memberships/excel', '_blank')}
                                className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Export Excel
                            </button>

                            <button
                                onClick={() => window.open('/admin/reports/memberships/csv', '_blank')}
                                className="group relative flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, usePage } from '@inertiajs/react';

// export default function Report() {
//     const { memberships } = usePage().props;

//     const handleExportPDF = () => {
//         window.open('/admin/reports/memberships/pdf', '_blank');
//     };

//     return (
//         <AdminLayout>
//             <Head title="Report" />
//             <div className="px-4 sm:px-6 lg:px-8 py-6 font-sans text-gray-800">

//                 {/* <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 flex items-center gap-2 dark:text-primary">
//                     <img src="/images/report.png" alt="Membership Icon" className="w-11 h-11" />
//                     Laporan Membership List
//                 </h2> */}

//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-primary flex items-center gap-3">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                             <img
//                                 src="/images/report.png"
//                                 alt="Management Icon"
//                                 className="w-16 h-16"
//                             />
//                         </div>
//                         <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-yellow-300 ">
//                             Laporan Membership List
//                         </h2>
//                 </h2>


//                 <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base dark:text-white">
//                     Lihat dan export semua data membership yang telah diajukan.
//                 </p>

//                 {/* TABLE */}
//                 <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100 mb-6">
//                     <table className="min-w-full bg-white text-sm text-gray-700">
//                         <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider">
//                             <tr>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">No</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Name</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Email</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Membership</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Personal Trainer</th> {/* Baru */}
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {memberships.length > 0 ? (
//                                 memberships.map((m, index) => (
//                                     <tr
//                                         key={m.id}
//                                         className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
//                                     >
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{index + 1}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{m.name}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center break-words">{m.email}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{m.membership}</td>

//                                         {/* Tambahan kolom Personal Trainer */}
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">
//                                             {m.personal_trainer ? (
//                                                 <div className="flex flex-col items-center justify-center gap-1 text-sm">
//                                                     <img
//                                                         src={`/storage/${m.personal_trainer.image}`}
//                                                         alt={m.personal_trainer.name}
//                                                         className="w-10 h-10 rounded-full object-cover"
//                                                     />
//                                                     <div className="font-medium text-center">{m.personal_trainer.name}</div>
//                                                     <div className="text-xs text-gray-500 text-center">{m.personal_trainer.specialty}</div>
//                                                 </div>
//                                             ) : "N/A"}
//                                         </td>

//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">
//                                             <span
//                                                 className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide
//                             ${m.status === "Accepted"
//                                                         ? "bg-green-100 text-green-700"
//                                                         : m.status === "Rejected"
//                                                             ? "bg-red-100 text-red-700"
//                                                             : "bg-yellow-100 text-yellow-700"}`}
//                                             >
//                                                 {m.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-6 text-gray-500 text-sm">
//                                         Tidak ada data tersedia.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>

//                         {/* <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider">
//                             <tr>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">No</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Name</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Email</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Membership</th>
//                                 <th className="px-4 py-3 sm:px-5 sm:py-4 border-b text-center">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {memberships.length > 0 ? (
//                                 memberships.map((m, index) => (
//                                     <tr
//                                         key={m.id}
//                                         className={index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
//                                     >
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{index + 1}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{m.name}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center break-words">{m.email}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">{m.membership}</td>
//                                         <td className="px-4 py-2 sm:px-5 sm:py-3 border-b text-center">
//                                             <span
//                                                 className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide
//                                                     ${m.status === "Accepted"
//                                                         ? "bg-green-100 text-green-700"
//                                                         : m.status === "Rejected"
//                                                             ? "bg-red-100 text-red-700"
//                                                             : "bg-yellow-100 text-yellow-700"}`}
//                                             >
//                                                 {m.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
//                                         Tidak ada data tersedia.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody> */}
//                     </table>
//                 </div>

//                 {/* BUTTON GROUP */}
//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
//                     <button
//                         onClick={handleExportPDF}
//                         className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition transform hover:scale-105 hover:shadow-lg"
//                     >
//                         Export ke PDF
//                     </button>

//                     <button
//                         onClick={() => window.open('/admin/reports/memberships/excel', '_blank')}
//                         className="bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition transform hover:scale-105 hover:shadow-lg"
//                     >
//                         Export ke Excel
//                     </button>

//                     <button
//                         onClick={() => window.open('/admin/reports/memberships/csv', '_blank')}
//                         className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition transform hover:scale-105 hover:shadow-lg"
//                     >
//                         Export ke CSV
//                     </button>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }
