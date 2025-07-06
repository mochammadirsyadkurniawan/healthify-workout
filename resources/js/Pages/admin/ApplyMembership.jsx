
import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage, router } from "@inertiajs/react";

export default function ApplyMembership() {
    const { flash, memberships } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            const toast = document.createElement("div");
            toast.innerText = flash.success;
            toast.className = "fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all duration-300";
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = "0";
                toast.style.transform = "translateX(100%)";
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    }, [flash]);

    const [filterMembership, setFilterMembership] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const handleStatusUpdate = (id, status, personal_trainer_id) => {
        router.put(`/admin/apply-membership/${id}/status`, { status, personal_trainer_id });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data apply membership ini?")) {
            router.delete(`/admin/apply-membership/${id}`);
        }
    };

    const filteredMemberships = memberships.filter((m) => {
        const matchMembership = filterMembership ? m.membership === filterMembership : true;
        const matchStatus = filterStatus ? m.status === filterStatus : true;
        return matchMembership && matchStatus;
    });

    return (
        <AdminLayout>
            <Head title="Apply Membership" />

            <div className="p-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-blue-600 p-3 rounded-lg">
                            <img
                                src="/images/membercardd.png"
                                alt="Membership Icon"
                                className="w-8 h-8 filter brightness-0 invert"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                Apply Membership
                            </h2>
                            {/* <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Apply Membership
                            </h1> */}
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Manage membership applications
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Membership
                            </label>
                            <select
                                value={filterMembership}
                                onChange={(e) => setFilterMembership(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Memberships</option>
                                <option value="Reguler Gym Membership">Regular Gym</option>
                                <option value="Pilates+ Membership">Pilates+</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Filter by Status
                            </label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Desktop Table */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Member
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Membership
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Personal Trainer
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Proof
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredMemberships.map((m) => (
                                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {m.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {m.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                                                {m.membership}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {m.personal_trainer ? (
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`/storage/${m.personal_trainer.image}`}
                                                        alt={m.personal_trainer.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white text-sm">
                                                            {m.personal_trainer.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {m.personal_trainer.specialty}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-500">No trainer</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={`/storage/${m.bukti_transfer}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                                            >
                                                View
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                                ${m.status === "Accepted"
                                                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                                    : m.status === "Rejected"
                                                        ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                                }`}>
                                                {m.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleStatusUpdate(m.id, "Accepted", m.personal_trainer?.id)}
                                                    disabled={m.status !== "Pending"}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                                        ${m.status === "Pending"
                                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                                            : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                                        }`}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleStatusUpdate(m.id, "Rejected", m.personal_trainer?.id)}
                                                    disabled={m.status !== "Pending"}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                                        ${m.status === "Pending"
                                                            ? "bg-red-600 hover:bg-red-700 text-white"
                                                            : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                                        }`}
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(m.id)}
                                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden">
                        {filteredMemberships.map((m) => (
                            <div key={m.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">
                                            {m.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {m.email}
                                        </p>
                                    </div>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                                        ${m.status === "Accepted"
                                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                                            : m.status === "Rejected"
                                                ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                                                : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                        }`}>
                                        {m.status}
                                    </span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    <div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Membership: </span>
                                        <span className="text-sm text-gray-900 dark:text-white font-medium">
                                            {m.membership}
                                        </span>
                                    </div>

                                    {m.personal_trainer && (
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">Trainer: </span>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={`/storage/${m.personal_trainer.image}`}
                                                    alt={m.personal_trainer.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {m.personal_trainer.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {m.personal_trainer.specialty}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={`/storage/${m.bukti_transfer}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        View Proof
                                    </a>
                                    <button
                                        onClick={() => handleStatusUpdate(m.id, "Accepted", m.personal_trainer?.id)}
                                        disabled={m.status !== "Pending"}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                            ${m.status === "Pending"
                                                ? "bg-green-600 hover:bg-green-700 text-white"
                                                : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(m.id, "Rejected", m.personal_trainer?.id)}
                                        disabled={m.status !== "Pending"}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                            ${m.status === "Pending"
                                                ? "bg-red-600 hover:bg-red-700 text-white"
                                                : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        onClick={() => handleDelete(m.id)}
                                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredMemberships.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No applications found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                No membership applications match your current filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}



// import React, { useState, useEffect } from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
// import { Head, usePage, router } from "@inertiajs/react";

// export default function ApplyMembership() {
//     const { flash, memberships } = usePage().props;

//     useEffect(() => {
//         if (flash?.success) {
//             const toast = document.createElement("div");
//             toast.innerText = flash.success;
//             toast.className = "fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up";
//             document.body.appendChild(toast);

//             setTimeout(() => {
//                 toast.remove();
//             }, 3000);
//         }
//     }, [flash]);

//     const [filterMembership, setFilterMembership] = useState("");
//     const [filterStatus, setFilterStatus] = useState("");

//     const handleStatusUpdate = (id, status, personal_trainer_id) => {
//         router.put(`/admin/apply-membership/${id}/status`, { status, personal_trainer_id });
//     };

//     const handleDelete = (id) => {
//         if (confirm("Yakin ingin menghapus data apply membership ini?")) {
//             router.delete(`/admin/apply-membership/${id}`);
//         }
//     };

//     const filteredMemberships = memberships.filter((m) => {
//         const matchMembership = filterMembership ? m.membership === filterMembership : true;
//         const matchStatus = filterStatus ? m.status === filterStatus : true;
//         return matchMembership && matchStatus;
//     });

//     return (
//         <AdminLayout>
//             <Head title="Apply Membership" />
//             <div className="p-6 font-sans text-gray-800">

//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-primary flex items-center gap-3 mb-5">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                             <img
//                                 src="/images/membercardd.png"
//                                 alt="Management Icon"
//                                 className="w-16 h-16"
//                             />
//                         </div>
//                         <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-yellow-300 ">
//                             Apply Membership List
//                         </h2>
//                 </h2>



//                 {/* FILTER */}
//                 <div className="flex flex-col md:flex-row gap-6 mb-8">
//                     <div className="w-full md:w-1/2">
//                         <label className="block text-sm font-semibold dark:text-primary text-gray-700 mb-2">Filter By Membership</label>
//                         <select
//                             value={filterMembership}
//                             onChange={(e) => setFilterMembership(e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//                         >
//                             <option value="">All</option>
//                             <option value="Reguler Gym Membership">Reguler Gym</option>
//                             <option value="Pilates+ Membership">Pilates+</option>
//                         </select>
//                     </div>
//                     <div className="w-full md:w-1/2">
//                         <label className="block text-sm font-semibold dark:text-primary text-gray-700 mb-2">Filter By Status</label>
//                         <select
//                             value={filterStatus}
//                             onChange={(e) => setFilterStatus(e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//                         >
//                             <option value="">All</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Accepted">Accepted</option>
//                             <option value="Rejected">Rejected</option>
//                         </select>
//                     </div>
//                 </div>

//                 {/* TABLE */}
//                 <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
//                     <table className="min-w-full bg-white text-sm text-gray-700">
//                         <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
//                             <tr>
//                                 <th className="px-5 py-4 border-b text-center">Name</th>
//                                 <th className="px-5 py-4 border-b text-center">Email</th>
//                                 <th className="px-5 py-4 border-b text-center">Membership</th>
//                                 <th className="px-5 py-4 border-b text-center">Personal Trainer</th>

//                                 <th className="px-5 py-4 border-b text-center">Bukti Transfer</th>
//                                 <th className="px-5 py-4 border-b text-center">Status</th>
//                                 <th className="px-5 py-4 border-b text-center">Action</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {filteredMemberships.map((m, index) => (
//                                 <tr key={m.id} className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
//                                     <td className="px-5 py-3 border-b text-center">{m.name}</td>
//                                     <td className="px-5 py-3 border-b text-center">{m.email}</td>
//                                     <td className="px-5 py-3 border-b text-center">{m.membership}</td>
//                                     <td className="px-5 py-3 border-b text-center">
//                                         {m.personal_trainer ? (
//                                             <div className="flex flex-col items-center gap-1">
//                                                 <img
//                                                     src={`/storage/${m.personal_trainer.image}`}
//                                                     alt={m.personal_trainer.name}
//                                                     className="w-10 h-10 rounded-full object-cover"
//                                                 />
//                                                 <div className="text-xs font-medium">{m.personal_trainer.name}</div>
//                                                 <div className="text-[11px] text-gray-500">{m.personal_trainer.specialty}</div>
//                                             </div>
//                                         ) : "N/A"}
//                                     </td>

//                                     <td className="px-5 py-3 border-b text-center">
//                                         <a
//                                             href={`/storage/${m.bukti_transfer}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-600 hover:text-blue-800 underline font-medium"
//                                         >
//                                             Lihat
//                                         </a>
//                                     </td>
//                                     <td className="px-5 py-3 border-b text-center">
//                                         <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide
//                     ${m.status === "Accepted"
//                                                 ? "bg-green-100 text-green-700"
//                                                 : m.status === "Rejected"
//                                                     ? "bg-red-100 text-red-700"
//                                                     : "bg-yellow-100 text-yellow-700"
//                                             }`}>
//                                             {m.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-24 py-3 border-b text-center w-[7px]">
//                                         <div className="flex flex-wrap justify-center items-center gap-2 max-w-full">
//                                             <button
//                                                 onClick={() => handleStatusUpdate(m.id, "Accepted", m.personal_trainer?.id)}
//                                                 disabled={m.status !== "Pending"}
//                                                 className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${m.status === "Pending"
//                                                     ? "bg-green-500 hover:bg-green-600 text-white"
//                                                     : "bg-green-200 text-white opacity-50 cursor-not-allowed"
//                                                     }`}
//                                             >
//                                                 Accept
//                                             </button>
//                                             <button
//                                                 onClick={() => handleStatusUpdate(m.id, "Rejected", m.personal_trainer?.id)}
//                                                 disabled={m.status !== "Pending"}
//                                                 className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${m.status === "Pending"
//                                                     ? "bg-red-500 hover:bg-red-600 text-white"
//                                                     : "bg-red-200 text-white opacity-50 cursor-not-allowed"
//                                                     }`}
//                                             >
//                                                 Reject
//                                             </button>


//                                             <button
//                                                 onClick={() => handleDelete(m.id)}
//                                                 className="bg-blue-100 hover:bg-blue-200 rounded-md px-5 h-[34px] flex items-center justify-center "
//                                                 title="Hapus data"
//                                             >
//                                                 <img
//                                                     src="/images/recycle-bin.png"
//                                                     alt="Delete"
//                                                     className="w-6 h-6"
//                                                 />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {filteredMemberships.length === 0 && (
//                                 <tr>
//                                     <td colSpan="6" className="text-center py-6 text-gray-500 text-sm">
//                                         Tidak ada pengajuan membership.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }
