

import { router, useForm, Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function PersonalTrainerEdit({ trainer }) {
    const { data, setData, processing, errors } = useForm({
        name: trainer.name || '',
        specialty: trainer.specialty || '',
        membership_type: trainer.membership_type || '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('specialty', data.specialty);
        formData.append('membership_type', data.membership_type);
        if (data.image) formData.append('image', data.image);
        formData.append('_method', 'PUT');

        router.post(route('admin.trainers.update', trainer.id), formData, {
            onSuccess: () => alert('Trainer updated successfully!'),
        });
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
            <Head title="Edit Trainer" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 p-3 rounded-xl shadow-lg">
                                    <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                        Edit Trainer
                                    </h1>
                                    {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 dark:from-amber-400 dark:via-orange-400 dark:to-amber-300 bg-clip-text text-transparent">
                                        Edit Trainer
                                    </h1> */}
                                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
                                        Update trainer information
                                    </p>
                                </div>
                            </div>

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

                        {/* Current Trainer Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
                                    {trainer.image ? (
                                        <img
                                            src={`/storage/${trainer.image}`}
                                            alt={trainer.name}
                                            className="w-16 h-16 object-cover rounded-full"
                                        />
                                    ) : (
                                        <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">Currently Editing</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{trainer.name} - {trainer.specialty}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 backdrop-blur-sm">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Trainer Information
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Update the trainer's details below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Trainer Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter trainer name"
                                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
                                        required
                                    />
                                    {errors.name && (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

                                {/* Specialty */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Specialty
                                    </label>
                                    <select
                                        value={data.specialty}
                                        onChange={(e) => setData('specialty', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200"
                                        required
                                    >
                                        <option value="" disabled>Select Specialty</option>
                                        {specialtyOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.specialty && (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.specialty}
                                        </div>
                                    )}
                                </div>

                                {/* Membership Type */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Membership Type
                                    </label>
                                    <select
                                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200"
                                        value={data.membership_type}
                                        onChange={(e) => setData('membership_type', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Membership Type</option>
                                        <option value="Reguler Gym">Regular Gym</option>
                                        <option value="PilatesPlus">Pilates+</option>
                                    </select>
                                    {errors.membership_type && (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.membership_type}
                                        </div>
                                    )}
                                </div>

                                {/* Image */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Trainer Image
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 dark:file:bg-amber-900 dark:file:text-amber-200"
                                            accept="image/*"
                                        />
                                    </div>
                                    {errors.image && (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.image}
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Leave empty to keep current image
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            Update Trainer
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}


// import { router, useForm, Head, Link } from '@inertiajs/react';
// import AdminLayout from '@/Layouts/AdminLayout';

// export default function PersonalTrainerEdit({ trainer }) {
//     const { data, setData, processing, errors } = useForm({
//         name: trainer.name || '',
//         specialty: trainer.specialty || '',
//         membership_type: trainer.membership_type || '',
//         image: null,
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', data.name);
//         formData.append('specialty', data.specialty);
//         formData.append('membership_type', data.membership_type);
//         if (data.image) formData.append('image', data.image);
//         formData.append('_method', 'PUT');

//         router.post(route('admin.trainers.update', trainer.id), formData, {
//             onSuccess: () => alert('Trainer updated successfully!'),
//         });
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
//             <Head title="Edit Trainer" />

//             <div className="p-4 md:p-6 max-w-5xl mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-primary mb-6 flex items-center gap-2">
//                         <img src="/images/edit.png" alt="Membership Icon" className="w-9 h-9 mr-1" />
//                         Edit Personal Trainers
//                     </h2>

//                     <Link
//                         href={route('admin.trainers.index')}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm shadow transition"
//                     >
//                         Back to List
//                     </Link>
//                 </div>

//                 {/* Form Card */}
//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white rounded-xl shadow-md p-4 md:p-6 space-y-6"
//                 >
//                     {/* Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Trainer Name
//                         </label>
//                         <input
//                             type="text"
//                             value={data.name}
//                             onChange={(e) => setData('name', e.target.value)}
//                             placeholder="Trainer Name"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                         {errors.name && (
//                             <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                         )}
//                     </div>

//                     {/* Specialty */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Specialty
//                         </label>
//                         <select
//                             value={data.specialty}
//                             onChange={(e) => setData('specialty', e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//                             required
//                         >
//                             <option value="" disabled>Select Specialty</option>
//                             {specialtyOptions.map((option, index) => (
//                                 <option key={index} value={option}>
//                                     {option}
//                                 </option>
//                             ))}
//                         </select>
//                         {errors.specialty && (
//                             <p className="text-red-500 text-xs mt-1">{errors.specialty}</p>
//                         )}
//                     </div>

//                     {/* Membership Type */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Membership Type
//                         </label>
//                         <select
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
//                             value={data.membership_type}
//                             onChange={(e) => setData('membership_type', e.target.value)}
//                             required
//                         >
//                             <option value="" disabled hidden>Pilih Tipe Membership</option>
//                             <option value="Reguler Gym">Reguler Gym</option>
//                             <option value="Pilates+">Pilates+</option>
//                         </select>
//                         {errors.membership_type && (
//                             <p className="text-red-500 text-xs mt-1">{errors.membership_type}</p>
//                         )}
//                     </div>

//                     {/* Image */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Trainer Image
//                         </label>
//                         <input
//                             type="file"
//                             onChange={(e) => setData('image', e.target.files[0])}
//                             className="w-full text-sm"
//                         />
//                         {errors.image && (
//                             <p className="text-red-500 text-xs mt-1">{errors.image}</p>
//                         )}
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition shadow-md"
//                     >
//                         Update Trainer
//                     </button>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// }
