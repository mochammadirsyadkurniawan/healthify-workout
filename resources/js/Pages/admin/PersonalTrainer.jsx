
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function PersonalTrainer({ trainers = [] }) {
    const { data, setData, post, put, delete: destroy, reset } = useForm({
        id: null,
        name: '',
        specialty: '',
        membership_type: '',
        image: null,
    });

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            put(route('admin.trainers.update', { id: editingId }), {
                forceFormData: true,
                onSuccess: () => {
                    alert('Trainer updated successfully!');
                    reset();
                    setEditingId(null);
                    setShowForm(false);
                },
            });
        } else {
            post(route('admin.trainers.store'), {
                forceFormData: true,
                onSuccess: () => {
                    alert('Trainer added successfully!');
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this trainer?')) {
            destroy(route('admin.trainers.destroy', id));
        }
    };

    const specialtyOptions = [
        'Weight Loss Specialist',
        'Strength & Conditioning Coach',
        'Yoga Instructor',
        'Pilates Coach',
        'HIIT Coach',
        'Functional Fitness Trainer',
        'Bodybuilding Coach',
        'CrossFit Coach',
        'Posture & Mobility Specialist',
        'Senior Fitness Specialist',
        'Athletic Performance Coach',
        'Rehabilitation Trainer',
        'Pre/Postnatal Fitness Trainer',
        'Endurance Training Coach',
        'Zumba Instructor',
    ];

    return (
        <AdminLayout>
            <Head title="Personal Trainer" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-3 rounded-xl shadow-lg">
                                    <img
                                        src="/images/trainer.png"
                                        alt="Management Icon"
                                        className="w-12 h-12 sm:w-16 sm:h-16"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                        Personal Trainers
                                    </h1>
                                    {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
                                        Personal Trainers
                                    </h1> */}
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                                        Manage your fitness professionals
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{trainers.length}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Trainers</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {trainers.filter(t => t.membership_type === 'Reguler Gym').length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Regular Gym</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {trainers.filter(t => t.membership_type === 'PilatesPlus').length}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Pilates+</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Toggle Form Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                                    showForm
                                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                                }`}
                            >
                                {showForm ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Close Form
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add New Trainer
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className={`transition-all duration-500 ease-in-out transform ${
                        showForm
                            ? 'max-h-[1000px] opacity-100 scale-100 translate-y-0 mb-8'
                            : 'max-h-0 overflow-hidden opacity-0 scale-95 -translate-y-4'
                    }`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 backdrop-blur-sm">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {editingId ? 'Edit Trainer' : 'Add New Trainer'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Fill in the information below to {editingId ? 'update' : 'add'} a trainer.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Trainer Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter trainer name"
                                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Specialty
                                        </label>
                                        <select
                                            value={data.specialty}
                                            onChange={(e) => setData('specialty', e.target.value)}
                                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                                            required
                                        >
                                            <option value="" disabled>Select Specialty</option>
                                            {specialtyOptions.map((option, i) => (
                                                <option key={i} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Membership Type
                                        </label>
                                        <select
                                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
                                            value={data.membership_type}
                                            onChange={(e) => setData('membership_type', e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Membership Type</option>
                                            <option value="Reguler Gym">Regular Gym</option>
                                            <option value="PilatesPlus">Pilates+</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                            Trainer Image
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={(e) => setData('image', e.target.files[0])}
                                                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-200"
                                                accept="image/*"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        {editingId ? 'Update Trainer' : 'Add Trainer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trainers List</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Manage and view all registered trainers
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Trainer
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Specialty
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Membership
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {trainers.map((trainer, index) => (
                                        <tr
                                            key={trainer.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {trainer.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {trainer.specialty}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    trainer.membership_type === 'PilatesPlus'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                }`}>
                                                    {trainer.membership_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                {trainer.image ? (
                                                    <div className="flex justify-center">
                                                        <img
                                                            src={`/storage/${trainer.image}`}
                                                            alt={trainer.name}
                                                            className="w-12 h-12 object-cover rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-center">
                                                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={route('admin.trainers.show', trainer.id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('admin.trainers.edit', trainer.id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-200 shadow-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(trainer.id)}
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 shadow-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {trainers.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No trainers found</h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        Get started by adding your first trainer.
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}



// import { useForm } from '@inertiajs/react';
// import { useState } from 'react';
// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, Link } from '@inertiajs/react';

// export default function PersonalTrainer({ trainers = [] }) {
//     const { data, setData, post, put, delete: destroy, reset } = useForm({
//         id: null,
//         name: '',
//         specialty: '',
//         membership_type: '',
//         image: null,
//     });

//     const [editingId, setEditingId] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (editingId) {
//             put(route('admin.trainers.update', { id: editingId }), {
//                 forceFormData: true,
//                 onSuccess: () => {
//                     alert('Trainer updated successfully!');
//                     reset();
//                     setEditingId(null);
//                     setShowForm(false);
//                 },
//             });
//         } else {
//             post(route('admin.trainers.store'), {
//                 forceFormData: true,
//                 onSuccess: () => {
//                     alert('Trainer added successfully!');
//                     reset();
//                     setShowForm(false);
//                 },
//             });
//         }
//     };

//     const handleDelete = (id) => {
//         if (confirm('Are you sure you want to delete this trainer?')) {
//             destroy(route('admin.trainers.destroy', id));
//         }
//     };

//     const specialtyOptions = [
//         'Weight Loss Specialist',
//         'Strength & Conditioning Coach',
//         'Yoga Instructor',
//         'Pilates Coach',
//         'HIIT Coach',
//         'Functional Fitness Trainer',
//         'Bodybuilding Coach',
//         'CrossFit Coach',
//         'Posture & Mobility Specialist',
//         'Senior Fitness Specialist',
//         'Athletic Performance Coach',
//         'Rehabilitation Trainer',
//         'Pre/Postnatal Fitness Trainer',
//         'Endurance Training Coach',
//         'Zumba Instructor',
//     ];

//     return (
//         <AdminLayout>
//             <Head title="Personal Trainer" />
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-gray-800 font-sans">

//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-primary flex items-center gap-3">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                             <img
//                                 src="/images/trainer.png"
//                                 alt="Management Icon"
//                                 className="w-16 h-16"
//                             />
//                         </div>
//                         <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-yellow-300 ">
//                             Manage Personal Trainers
//                         </h2>
//                 </h2>

//                 {/* Toggle Form Button */}
//                 <div className="mb-6 text-left lg:text-right">
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className={`inline-block px-6 py-2 font-semibold text-white rounded-lg transition-all duration-300 shadow-md ${showForm ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
//                             }`}
//                     >
//                         {showForm ? 'Close Form Trainer' : 'Add New Trainer'}
//                     </button>
//                 </div>

//                 {/* FORM */}
//                 <div
//                     className={`transition-all duration-500 ease-in-out transform ${showForm
//                             ? 'max-h-[1000px] opacity-100 scale-100 translate-y-0'
//                             : 'max-h-0 overflow-hidden opacity-0 scale-95 -translate-y-2'
//                         }`}
//                 >
//                     <form
//                         onSubmit={handleSubmit}
//                         className="bg-white rounded-xl shadow-md p-6 space-y-6 max-w-full md:max-w-3xl mx-auto mb-12"
//                     >
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Trainer Name</label>
//                             <input
//                                 type="text"
//                                 value={data.name}
//                                 onChange={(e) => setData('name', e.target.value)}
//                                 placeholder="Trainer Name"
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
//                                 required
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
//                             <select
//                                 value={data.specialty}
//                                 onChange={(e) => setData('specialty', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm"
//                                 required
//                             >
//                                 <option value="" disabled>Select Specialty</option>
//                                 {specialtyOptions.map((option, i) => (
//                                     <option key={i} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
//                             <select
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white shadow-sm"
//                                 value={data.membership_type}
//                                 onChange={(e) => setData('membership_type', e.target.value)}
//                                 required
//                             >
//                                 <option value="" disabled hidden>Pilih Tipe Membership</option>
//                                 <option value="Reguler Gym">Reguler Gym</option>
//                                 <option value="PilatesPlus">Pilates+</option>
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Trainer Image</label>
//                             <input
//                                 type="file"
//                                 onChange={(e) => setData('image', e.target.files[0])}
//                                 className="w-full text-sm"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md transition"
//                         >
//                             {editingId ? 'Update Trainer' : 'Add Trainer'}
//                         </button>
//                     </form>
//                 </div>

//                 {/* TABLE */}
//                 <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
//                     <table className="min-w-full bg-white text-sm text-gray-700">
//                         <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-xs font-bold text-white uppercase tracking-wider shadow-sm">
//                             <tr>
//                                 <th className="px-4 py-3 border-b text-left">Name</th>
//                                 <th className="px-4 py-3 border-b text-left">Specialty</th>
//                                 <th className="px-4 py-3 border-b text-left">Membership Type</th>
//                                 <th className="px-4 py-3 border-b text-center">Image</th>
//                                 <th className="px-4 py-3 border-b text-center">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {trainers.map((trainer, index) => (
//                                 <tr
//                                     key={trainer.id}
//                                     className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                                         } hover:bg-gray-100`}
//                                 >
//                                     <td className="px-4 py-3 border-b">{trainer.name}</td>
//                                     <td className="px-4 py-3 border-b">{trainer.specialty}</td>
//                                     <td className="px-4 py-3 border-b">{trainer.membership_type}</td>
//                                     <td className="px-4 py-3 border-b text-center">
//                                         {trainer.image ? (
//                                             <img
//                                                 src={`/storage/${trainer.image}`}
//                                                 alt={trainer.name}
//                                                 className="w-16 h-16 object-cover rounded-full mx-auto border"
//                                             />
//                                         ) : (
//                                             <span className="text-gray-400 italic">No image</span>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-3 border-b text-center">
//                                         <div className="flex flex-wrap justify-center gap-2">
//                                             <Link
//                                                 href={route('admin.trainers.show', trainer.id)}
//                                                 className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Show
//                                             </Link>
//                                             <Link
//                                                 href={route('admin.trainers.edit', trainer.id)}
//                                                 className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Edit
//                                             </Link>
//                                             <button
//                                                 onClick={() => handleDelete(trainer.id)}
//                                                 className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {trainers.length === 0 && (
//                                 <tr>
//                                     <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
//                                         No trainers available.
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
