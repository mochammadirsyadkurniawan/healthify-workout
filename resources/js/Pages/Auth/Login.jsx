// import { useForm } from '@inertiajs/react';
// import React, { useEffect } from 'react';
// import { Link, Head } from "@inertiajs/react";

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     useEffect(() => {
//         // Disable scroll when component mounts
//         document.body.style.overflow = 'hidden';

//         // Enable scroll again when component unmounts
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, []);

//     return (
//         <>
//             <Head>
//                 <title>Login</title>
//                 <link rel="icon" type="image/png" href="/assets/logo.png" />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>

//             {/* Fullscreen background with overlay */}
//             <div
//                 className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center relative"
//                 style={{ backgroundImage: "url('/images/background-login.jpg')" }}
//             >
//                 <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

//                 {/* Login Form */}
//                 <div className="z-10 w-full max-w-md px-4 sm:px-6">
//                     <div className="bg-white bg-opacity-90 rounded-lg shadow-lg px-6 py-10">
//                         <h1
//                             className="text-4xl font-bold text-center text-[#0D5EAD] mb-6"
//                             style={{ fontFamily: "'Poppins', sans-serif" }}
//                         >
//                             Login
//                         </h1>

//                         {/* Logo moved below the title */}
//                         {/* <img
//                             src="/assets/logo.png"
//                             alt="Logo"
//                             className="w-20 max-w-[100px] max-h-[100px] object-contain mx-auto mb-6"
//                         /> */}

//                         {/* Status Message */}
//                         {status && (
//                             <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
//                                 {status}
//                             </div>
//                         )}

//                         <form onSubmit={submit} className="space-y-4">
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     id="email"
//                                     type="email"
//                                     name="email"
//                                     value={data.email}
//                                     required
//                                     autoFocus
//                                     onChange={(e) => setData('email', e.target.value)}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                             </div>

//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                                     Password
//                                 </label>
//                                 <input
//                                     id="password"
//                                     type="password"
//                                     name="password"
//                                     value={data.password}
//                                     required
//                                     onChange={(e) => setData('password', e.target.value)}
//                                     className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
//                                 />
//                                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                             </div>

//                             <div className="flex items-center justify-between text-sm mt-1">
//                                 <label className="flex items-center gap-2">
//                                     <input
//                                         type="checkbox"
//                                         name="remember"
//                                         checked={data.remember}
//                                         onChange={(e) => setData('remember', e.target.checked)}
//                                         className="accent-[#0D5EAD]"
//                                     />
//                                     Remember me
//                                 </label>
//                                 {canResetPassword && (
//                                     <Link
//                                         href={route('password.request')}
//                                         className="text-[#0D5EAD] font-semibold hover:underline"
//                                     >
//                                         Forgot your password?
//                                     </Link>
//                                 )}
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={processing}
//                                 className="mt-4 w-full bg-[#ff9000] hover:bg-[#0D5EAD] text-white font-bold py-3 rounded transition-transform duration-300"
//                             >
//                                 Login
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { Link, Head } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            {/* Fullscreen background with overlay */}
            <div
                className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: "url('/images/background-login.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

                {/* Login Form */}
                <div className="z-10 w-full max-w-md px-4 sm:px-6">
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg px-6 py-10">
                        <h1
                            className="text-4xl font-bold text-center text-[#0D5EAD] mb-6"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Login
                        </h1>

                        {/* Status Message */}
                        {status && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    required
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    required
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between text-sm mt-1">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="accent-[#0D5EAD]"
                                    />
                                    Remember me
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-[#0D5EAD] font-semibold hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 w-full bg-[#ff9000] hover:bg-[#0D5EAD] text-white font-bold py-3 rounded transition-transform duration-300"
                            >
                                Login
                            </button>

                            {/* Link to Register */}
                            <p className="text-center text-sm mt-4">
                                Don't have an account?{" "}
                                <Link href={route('register')} className="text-[#0D5EAD] font-semibold hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}




// import { useForm } from '@inertiajs/react';
// import React, { useEffect } from 'react';
// import { Link, Head } from "@inertiajs/react";

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     useEffect(() => {
//         // Disable scroll when component mounts
//         document.body.style.overflow = 'hidden';

//         // Enable scroll again when component unmounts
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, []);

//     return (
//         <>
//             <Head>
//                 <title>Login - Healthify Workout</title>
//                 <link rel="icon" type="image/png" href="/assets/logo.png" />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>

//             {/* Fullscreen background with enhanced overlay */}
//             <div
//                 className="min-h-screen w-screen overflow-hidden bg-cover bg-center bg-fixed flex items-center justify-center relative"
//                 style={{ backgroundImage: "url('/images/background-login.jpg')" }}
//             >
//                 {/* Enhanced gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/50 z-0"></div>

//                 {/* Animated background elements */}
//                 <div className="absolute inset-0 z-0">
//                     <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
//                     <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//                     <div className="absolute top-1/2 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-bounce"></div>
//                 </div>

//                 {/* Login Form Container */}
//                 <div className="z-10 w-full max-w-md mx-4 sm:mx-6 lg:max-w-lg">
//                     <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-8 py-12 relative overflow-hidden">
//                         {/* Glass effect inner glow */}
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>

//                         {/* Content */}
//                         <div className="relative z-10">
//                             {/* Logo and Brand */}
//                             <div className="text-center mb-8">
//                                 <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 shadow-lg">
//                                     <img
//                                         src="/assets/logo.png"
//                                         alt="Healthify Workout Logo"
//                                         className="w-12 h-12 object-contain"
//                                     />
//                                 </div>
//                                 <h1 className="text-4xl font-bold text-white mb-2 font-poppins">
//                                     Welcome Back
//                                 </h1>
//                                 <p className="text-white/80 text-sm font-medium">
//                                     Sign in to continue your fitness journey
//                                 </p>
//                             </div>

//                             {/* Status Message */}
//                             {status && (
//                                 <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 p-4 rounded-xl mb-6 text-sm">
//                                     <div className="flex items-center">
//                                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                                         </svg>
//                                         {status}
//                                     </div>
//                                 </div>
//                             )}

//                             <form onSubmit={submit} className="space-y-6">
//                                 {/* Email Field */}
//                                 <div className="group">
//                                     <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
//                                         Email Address
//                                     </label>
//                                     <div className="relative">
//                                         <input
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={data.email}
//                                             required
//                                             autoFocus
//                                             onChange={(e) => setData('email', e.target.value)}
//                                             className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
//                                             placeholder="Enter your email"
//                                         />
//                                         <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                                     </div>
//                                     {errors.email && (
//                                         <p className="text-red-300 text-xs mt-2 flex items-center">
//                                             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                             {errors.email}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Password Field */}
//                                 <div className="group">
//                                     <label htmlFor="password" className="block text-sm font-semibold text-white/90 mb-2">
//                                         Password
//                                     </label>
//                                     <div className="relative">
//                                         <input
//                                             id="password"
//                                             type="password"
//                                             name="password"
//                                             value={data.password}
//                                             required
//                                             onChange={(e) => setData('password', e.target.value)}
//                                             className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 group-hover:bg-white/25"
//                                             placeholder="Enter your password"
//                                         />
//                                         <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
//                                     </div>
//                                     {errors.password && (
//                                         <p className="text-red-300 text-xs mt-2 flex items-center">
//                                             <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                                                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                                             </svg>
//                                             {errors.password}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Remember Me & Forgot Password */}
//                                 <div className="flex items-center justify-between text-sm">
//                                     <label className="flex items-center gap-3 cursor-pointer group">
//                                         <div className="relative">
//                                             <input
//                                                 type="checkbox"
//                                                 name="remember"
//                                                 checked={data.remember}
//                                                 onChange={(e) => setData('remember', e.target.checked)}
//                                                 className="sr-only"
//                                             />
//                                             <div className={`w-5 h-5 rounded border-2 border-white/40 flex items-center justify-center transition-all duration-200 ${data.remember ? 'bg-primary border-primary' : 'bg-white/10'}`}>
//                                                 {data.remember && (
//                                                     <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                                     </svg>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <span className="text-white/80 group-hover:text-white transition-colors">
//                                             Remember me
//                                         </span>
//                                     </label>

//                                     {canResetPassword && (
//                                         <Link
//                                             href={route('password.request')}
//                                             className="text-primary hover:text-white font-semibold transition-colors duration-200 hover:underline"
//                                         >
//                                             Forgot password?
//                                         </Link>
//                                     )}
//                                 </div>

//                                 {/* Login Button */}
//                                 <button
//                                     type="submit"
//                                     disabled={processing}
//                                     className="w-full relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                                 >
//                                     <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//                                     <span className="relative flex items-center justify-center">
//                                         {processing ? (
//                                             <>
//                                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                 </svg>
//                                                 Signing in...
//                                             </>
//                                         ) : (
//                                             'Sign In'
//                                         )}
//                                     </span>
//                                 </button>
//                             </form>

//                             {/* Register Link */}
//                             <div className="text-center mt-8">
//                                 <p className="text-white/80 text-sm">
//                                     Don't have an account?{' '}
//                                     <Link
//                                         href={route('register')}
//                                         className="text-primary hover:text-white font-semibold transition-colors duration-200 hover:underline"
//                                     >
//                                         Create Account
//                                     </Link>
//                                 </p>
//                             </div>

//                             {/* Footer */}
//                             <div className="text-center mt-6">
//                                 <p className="text-white/60 text-xs">
//                                     © 2024 Healthify Workout. All rights reserved.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// import { useForm } from '@inertiajs/react';
// import React, { useEffect, useState } from 'react';
// import { Link, Head } from "@inertiajs/react";

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     useEffect(() => {
//         document.body.style.overflow = 'hidden';
//         return () => {
//             document.body.style.overflow = 'auto';
//         };
//     }, []);

//     return (
//         <>
//             <Head>
//                 <title>Login - FitZone Gym</title>
//                 <link rel="icon" type="image/png" href="/assets/logo.png" />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>

//             <div className="min-h-screen flex">
//                 {/* Left side - Image */}
//                 <div className="hidden lg:flex lg:w-1/2 relative">
//                     <div
//                         className="w-full bg-cover bg-center relative"
//                         style={{
//                             backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(255,144,0,0.3)), url('/images/gym-hero.jpg')"
//                         }}
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-orange-500/20"></div>
//                         <div className="relative z-10 flex flex-col justify-center items-start h-full px-16">
//                             <div className="text-white">
//                                 <h1 className="text-5xl font-bold mb-6 leading-tight">
//                                     Welcome Back to<br />
//                                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
//                                         FitZone
//                                     </span>
//                                 </h1>
//                                 <p className="text-xl text-gray-200 mb-8 leading-relaxed">
//                                     Transform your body, transform your life.<br />
//                                     Join thousands who achieved their fitness goals.
//                                 </p>
//                                 <div className="flex items-center space-x-8">
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-orange-400">50K+</div>
//                                         <div className="text-sm text-gray-300">Active Members</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-orange-400">200+</div>
//                                         <div className="text-sm text-gray-300">Expert Trainers</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-3xl font-bold text-orange-400">24/7</div>
//                                         <div className="text-sm text-gray-300">Access</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side - Login Form */}
//                 <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
//                     <div className="w-full max-w-md">
//                         {/* Logo and Header */}
//                         <div className="text-center mb-8">
//                             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4">
//                                 <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                                     <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
//                                 </svg>
//                             </div>
//                             <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
//                             <p className="text-gray-600">Sign in to your FitZone account</p>
//                         </div>

//                         {/* Status Message */}
//                         {status && (
//                             <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm">
//                                 {status}
//                             </div>
//                         )}

//                         {/* Login Form */}
//                         <form onSubmit={submit} className="space-y-6">
//                             {/* Email Field */}
//                             <div>
//                                 <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Email Address
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         id="email"
//                                         type="email"
//                                         name="email"
//                                         value={data.email}
//                                         required
//                                         autoFocus
//                                         onChange={(e) => setData('email', e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
//                                         placeholder="Enter your email"
//                                     />
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                                 {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
//                             </div>

//                             {/* Password Field */}
//                             <div>
//                                 <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Password
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         id="password"
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={data.password}
//                                         required
//                                         onChange={(e) => setData('password', e.target.value)}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white pr-12"
//                                         placeholder="Enter your password"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
//                                     >
//                                         {showPassword ? (
//                                             <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.051 6.051M9.878 9.878a3 3 0 105.121 5.121m0 0l4.243 4.243M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                             </svg>
//                                         ) : (
//                                             <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                             </svg>
//                                         )}
//                                     </button>
//                                 </div>
//                                 {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
//                             </div>

//                             {/* Remember Me and Forgot Password */}
//                             <div className="flex items-center justify-between">
//                                 <label className="flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         name="remember"
//                                         checked={data.remember}
//                                         onChange={(e) => setData('remember', e.target.checked)}
//                                         className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
//                                     />
//                                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                                 </label>
//                                 {canResetPassword && (
//                                     <Link
//                                         href={route('password.request')}
//                                         className="text-sm text-orange-600 hover:text-orange-500 font-medium"
//                                     >
//                                         Forgot password?
//                                     </Link>
//                                 )}
//                             </div>

//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 disabled={processing}
//                                 className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {processing ? (
//                                     <div className="flex items-center justify-center">
//                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Signing in...
//                                     </div>
//                                 ) : (
//                                     'Sign In'
//                                 )}
//                             </button>
//                         </form>

//                         {/* Sign Up Link */}
//                         <div className="mt-8 text-center">
//                             <p className="text-gray-600">
//                                 Don't have an account?{' '}
//                                 <Link
//                                     href={route('register')}
//                                     className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
//                                 >
//                                     Create account
//                                 </Link>
//                             </p>
//                         </div>

//                         {/* Footer */}
//                         <div className="mt-8 text-center text-xs text-gray-500">
//                             By signing in, you agree to our{' '}
//                             <a href="#" className="text-orange-600 hover:text-orange-500">Terms of Service</a>
//                             {' '}and{' '}
//                             <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
