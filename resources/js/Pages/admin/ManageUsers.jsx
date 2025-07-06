// import { useForm } from '@inertiajs/react';
// import { useState } from 'react';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, Link } from '@inertiajs/react';

// export default function ManageUsers({ users = [] }) {
//     const { data, setData, post, delete: destroy, reset, processing, errors } = useForm({
//         name: '',
//         email: '',
//         usertype: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const [showForm, setShowForm] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route('admin.users.store'), {
//             onSuccess: () => {
//                 alert('User added successfully!');
//                 reset();
//                 setShowForm(false); // Hide form after successful add
//             },
//         });
//     };

//     const handleDelete = (id) => {
//         if (confirm('Are you sure you want to delete this user?')) {
//             destroy(route('admin.users.destroy', id));
//         }
//     };

//     return (
//         <AdminLayout>
//             <Head title="Manage Users" />
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-gray-800 font-sans">

//                 <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-primary mb-6 flex items-center gap-2">
//                     <img src="/images/admin/management.png" alt="Membership Icon" className="w-16 h-16 mr-1" />
//                     Manage Users Account
//                 </h2>

//                 {/* TOGGLE BUTTON */}
//                 <div className="mb-6 text-left lg:text-right">
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition
//                             ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white shadow`}
//                     >
//                         {showForm ? 'Close Form' : 'Add New User'}
//                     </button>
//                 </div>

//                 {/* ANIMATED FORM */}
//                 <div
//                     className={`transition-all duration-500 overflow-hidden ${showForm ? 'max-h-[1000px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
//                         }`}
//                 >
//                     <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6 max-w-full md:max-w-3xl mx-auto mb-12">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                             <input
//                                 type="text"
//                                 value={data.name}
//                                 onChange={(e) => setData('name', e.target.value)}
//                                 placeholder="User Name"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                             {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                             <input
//                                 type="email"
//                                 value={data.email}
//                                 onChange={(e) => setData('email', e.target.value)}
//                                 placeholder="Email"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                             {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//                             <select
//                                 value={data.usertype}
//                                 onChange={(e) => setData('usertype', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
//                                 required
//                             >
//                                 <option value="" disabled hidden>Select Role</option>
//                                 <option value="admin">Admin</option>
//                                 <option value="user">User</option>
//                             </select>
//                             {errors.usertype && <div className="text-red-500 text-sm mt-1">{errors.usertype}</div>}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                             <input
//                                 type="password"
//                                 value={data.password}
//                                 onChange={(e) => setData('password', e.target.value)}
//                                 placeholder="Password"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                             {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                             <input
//                                 type="password"
//                                 value={data.password_confirmation}
//                                 onChange={(e) => setData('password_confirmation', e.target.value)}
//                                 placeholder="Confirm Password"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//                                 required
//                             />
//                             {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
//                         </div>

//                         <button
//                             type="submit"
//                             disabled={processing}
//                             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
//                         >
//                             Add User
//                         </button>
//                     </form>
//                 </div>

//                 {/* TABLE */}
//                 <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
//                     <table className="min-w-full bg-white text-sm text-gray-700">
//                         <thead className="bg-gradient-to-r from-blue-600 to-blue-600 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
//                             <tr>
//                                 <th className="px-4 py-3 border-b text-left">Name</th>
//                                 <th className="px-4 py-3 border-b text-left">Email</th>
//                                 <th className="px-4 py-3 border-b text-left">Role</th>
//                                 <th className="px-4 py-3 border-b text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index) => (
//                                 <tr
//                                     key={user.id}
//                                     className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}
//                                 >
//                                     <td className="px-4 py-3 border-b">{user.name}</td>
//                                     <td className="px-4 py-3 border-b">{user.email}</td>
//                                     <td className="px-4 py-3 border-b capitalize">{user.usertype}</td>
//                                     <td className="px-4 py-3 border-b text-center">
//                                         <div className="flex flex-wrap justify-center gap-2">
//                                             <Link
//                                                 href={route('admin.users.show', user.id)}
//                                                 className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Show
//                                             </Link>
//                                             <Link
//                                                 href={route('admin.users.edit', user.id)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Edit
//                                             </Link>
//                                             <button
//                                                 onClick={() => handleDelete(user.id)}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {users.length === 0 && (
//                                 <tr>
//                                     <td colSpan="4" className="text-center py-6 text-gray-500 text-sm">
//                                         No users available.
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


import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function ManageUsers({ users = [] }) {
    const { data, setData, post, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        email: '',
        usertype: '',
        password: '',
        password_confirmation: '',
    });

    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => {
                alert('User added successfully!');
                reset();
                setShowForm(false); // Hide form after successful add
            },
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            destroy(route('admin.users.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Manage Users" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800 font-sans">
                {/* Page Header */}
                <div className="mb-8 border-b border-gray-200 pb-5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        {/* <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-primary flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <img src="/images/admin/management.png" alt="Management Icon" className="w-10 h-10" />
                            </div>
                            <span className="bg-gradient-to-r font-extrabold from-blue-600 to-indigo-800 bg-clip-text text-transparent dark:text-pimary  dark:to-yellow-300">
                                Manajemen Akun Pengguna
                            </span>
                        </h2> */}

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-primary flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <img
                                src="/images/admin/management.png"
                                alt="Management Icon"
                                className="w-10 h-10"
                            />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                            Manage Users Account
                        </h2>
                        
                    </h2>

                        {/* Toggle Button */}
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className={`mt-4 sm:mt-0 px-5 py-2.5 text-sm font-medium rounded-lg transition duration-300 ease-in-out flex items-center gap-2
                                ${showForm
                                    ? 'bg-red-500 hover:bg-red-600 ring-red-300'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'}
                                text-white shadow-lg hover:shadow-xl focus:ring-4 focus:outline-none`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {showForm ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                )}
                            </svg>
                            {showForm ? 'Close Form' : 'Add New User'}
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-black dark:text-white">
                        Manage user accounts, roles, and permissions in your system.
                    </p>
                </div>

                {/* ANIMATED FORM */}
                <div
                    className={`transition-all duration-500 overflow-hidden ${showForm ? 'max-h-[1000px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
                        }`}
                >
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 space-y-6 max-w-full md:max-w-3xl mx-auto mb-12 border border-gray-100">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Create New User Account</h3>
                            <p className="text-gray-500 text-sm">Fill in the details below to add a new user</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="User Name"
                                        className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        required
                                    />
                                </div>
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Email"
                                        className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        required
                                    />
                                </div>
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <select
                                        value={data.usertype}
                                        onChange={(e) => setData('usertype', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm appearance-none"
                                        required
                                    >
                                        <option value="" disabled hidden>Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                    {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div> */}
                                </div>
                                {errors.usertype && <div className="text-red-500 text-xs mt-1">{errors.usertype}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        required
                                    />
                                </div>
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full border border-gray-300 rounded-lg pl-10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                        required
                                    />
                                </div>
                                {errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>}
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                {processing ? 'Processing...' : 'Add User'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Users Stats Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center">
                        <div className="rounded-full bg-blue-100 p-3 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <h3 className="text-xl font-bold text-gray-800">{users.length}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center">
                        <div className="rounded-full bg-indigo-100 p-3 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Admin Users</p>
                            <h3 className="text-xl font-bold text-gray-800">
                                {users.filter(user => user.usertype === 'admin').length}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center">
                        <div className="rounded-full bg-green-100 p-3 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Regular Users</p>
                            <h3 className="text-xl font-bold text-gray-800">
                                {users.filter(user => user.usertype === 'user').length}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">User Accounts</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-sm text-gray-700">
                            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold text-white uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5 border-b text-left">Name</th>
                                    <th className="px-6 py-3.5 border-b text-left">Email</th>
                                    <th className="px-6 py-3.5 border-b text-left">Role</th>
                                    <th className="px-6 py-3.5 border-b text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <span className="text-sm font-medium text-gray-700">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${user.usertype === 'admin'
                                                    ? 'bg-indigo-100 text-indigo-800'
                                                    : 'bg-green-100 text-green-800'}`}>
                                                {user.usertype === 'admin' && (
                                                    <svg className="mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                )}
                                                {user.usertype === 'user' && (
                                                    <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                                        <circle cx="4" cy="4" r="3" />
                                                    </svg>
                                                )}
                                                {user.usertype.charAt(0).toUpperCase() + user.usertype.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex flex-wrap justify-center gap-2">
                                                <Link
                                                    href={route('admin.users.show', user.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-sm transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('admin.users.edit', user.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-10 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                                <p className="text-gray-500 text-sm font-medium">No users available.</p>
                                                <button
                                                    onClick={() => setShowForm(true)}
                                                    className="mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Add your first user
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}




