import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                    My Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">

                        {/* Update Profile Info */}
                        <section className="rounded-2xl bg-white p-6 sm:p-8 border-l-4 border-[#0D5EAD] shadow-lg hover:shadow-xl transition-all">
                            <h3 className="mb-4 text-xl font-bold text-[#0D5EAD] tracking-wide">
                                Update Profile Information
                            </h3>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </section>

                        {/* Update Password */}
                        <section className="rounded-2xl bg-white p-6 sm:p-8 border-l-4 border-[#ff9000] shadow-lg hover:shadow-xl transition-all">
                            <h3 className="mb-4 text-xl font-bold text-[#ff9000] tracking-wide">
                                Change Password
                            </h3>
                            <UpdatePasswordForm className="w-full" />
                        </section>

                        {/* Delete User */}
                        <section className="rounded-2xl bg-red-50 p-6 sm:p-8 border-l-4 border-red-500 shadow-lg hover:shadow-xl transition-all">
                            <h3 className="mb-4 text-xl font-bold text-red-600 tracking-wide">
                                Delete Account
                            </h3>
                            <DeleteUserForm className="w-full" />
                        </section>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}



// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import DeleteUserForm from './Partials/DeleteUserForm';
// import UpdatePasswordForm from './Partials/UpdatePasswordForm';
// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

// export default function Edit({ mustVerifyEmail, status }) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Profile
//                 </h2>
//             }
//         >
//             <Head title="Profile" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <UpdateProfileInformationForm
//                             mustVerifyEmail={mustVerifyEmail}
//                             status={status}
//                             className="max-w-xl"
//                         />
//                     </div>

//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <UpdatePasswordForm className="max-w-xl" />
//                     </div>

//                     <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
//                         <DeleteUserForm className="max-w-xl" />
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
