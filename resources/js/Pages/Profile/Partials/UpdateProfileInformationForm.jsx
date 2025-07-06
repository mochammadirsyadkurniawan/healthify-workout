import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={`${className} rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg`}>
            <header className="mb-4 border-l-4 border-accent pl-4">
                <h2 className="text-xl font-bold text-dark">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                                    focus:border-accent focus:ring-accent/40"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2 text-red-500" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                                   focus:border-accent focus:ring-accent/40"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2 text-red-500" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-md bg-primary/10 p-4 text-sm text-dark">
                        <p className="mb-2">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 font-medium text-blue-500 underline hover:text-accent"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="text-sm font-medium text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="bg-primary">
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-200"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600">Saved successfully.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}






// <section className={className}>
//     <header>
//         <h2 className="text-lg font-medium text-gray-900">
//             Profile Information
//         </h2>

//         <p className="mt-1 text-sm text-gray-600">
//             Update your account's profile information and email address.
//         </p>
//     </header>

//     <form onSubmit={submit} className="mt-6 space-y-6">
//         <div>
//             <InputLabel htmlFor="name" value="Name" />

//             <TextInput
//                 id="name"
//                 className="mt-1 block w-full"
//                 value={data.name}
//                 onChange={(e) => setData('name', e.target.value)}
//                 required
//                 isFocused
//                 autoComplete="name"
//             />

//             <InputError className="mt-2" message={errors.name} />
//         </div>

//         <div>
//             <InputLabel htmlFor="email" value="Email" />

//             <TextInput
//                 id="email"
//                 type="email"
//                 className="mt-1 block w-full"
//                 value={data.email}
//                 onChange={(e) => setData('email', e.target.value)}
//                 required
//                 autoComplete="username"
//             />

//             <InputError className="mt-2" message={errors.email} />
//         </div>

//         {mustVerifyEmail && user.email_verified_at === null && (
//             <div>
//                 <p className="mt-2 text-sm text-gray-800">
//                     Your email address is unverified.
//                     <Link
//                         href={route('verification.send')}
//                         method="post"
//                         as="button"
//                         className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                     >
//                         Click here to re-send the verification email.
//                     </Link>
//                 </p>

//                 {status === 'verification-link-sent' && (
//                     <div className="mt-2 text-sm font-medium text-green-600">
//                         A new verification link has been sent to your
//                         email address.
//                     </div>
//                 )}
//             </div>
//         )}

//         <div className="flex items-center gap-4">
//             <PrimaryButton disabled={processing}>Save</PrimaryButton>

//             <Transition
//                 show={recentlySuccessful}
//                 enter="transition ease-in-out"
//                 enterFrom="opacity-0"
//                 leave="transition ease-in-out"
//                 leaveTo="opacity-0"
//             >
//                 <p className="text-sm text-gray-600">
//                     Saved.
//                 </p>
//             </Transition>
//         </div>
//     </form>
// </section>
