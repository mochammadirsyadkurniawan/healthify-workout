import { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    useEffect(() => {
        // Disable scroll on register page
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <Head>
                <title>Register</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="h-screen w-screen overflow-hidden bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: "url('/images/background-register.png')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

                <div className="z-10 w-full max-w-md px-4 sm:px-6">
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg px-6 py-10">
                        <h1
                            className="text-4xl font-bold text-center text-[#0D5EAD] mb-8"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Register
                        </h1>

                        {/* <img
                            src="/assets/kemenkeu.png"
                            alt="Logo"
                            className="w-20 max-w-[100px] max-h-[100px] object-contain mx-auto mb-6"
                        /> */}

                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                                <ul className="list-disc list-inside">
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
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
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0D5EAD]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-4 w-full bg-[#ff9000] hover:bg-[#0D5EAD] text-white font-bold py-3 rounded transition-transform duration-300"
                            >
                                Register
                            </button>
                        </form>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="text-[#0D5EAD] font-semibold hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

// import { useEffect, useState } from 'react';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
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
//                 <title>Register - FitZone Gym</title>
//                 <link rel="icon" type="image/png" href="/assets/logo.png" />
//                 <link
//                     href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>

//             <div className="min-h-screen flex">
//                 {/* Left side - Register Form */}
//                 <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
//                     <div className="w-full max-w-md">
//                         {/* Logo and Header */}
//                         <div className="text-center mb-8">
//                             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4">
//                                 <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//                                     <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
//                                 </svg>
//                             </div>
//                             <h2 className="text-3xl font-bold text-gray-900 mb-2">Join FitZone Today!</h2>
//                             <p className="text-gray-600">Start your fitness journey with us</p>
//                         </div>

//                         {/* Error Messages */}
//                         {Object.keys(errors).length > 0 && (
//                             <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm">
//                                 <div className="font-semibold mb-2">Please fix the following errors:</div>
//                                 <ul className="list-disc list-inside space-y-1">
//                                     {Object.entries(errors).map(([key, message]) => (
//                                         <li key={key}>{message}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}

//                         {/* Registration Form */}
//                         <form onSubmit={submit} className="space-y-5">
//                             {/* Full Name Field */}
//                             <div>
//                                 <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Full Name
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         id="name"
//                                         type="text"
//                                         name="name"
//                                         value={data.name}
//                                         onChange={(e) => setData('name', e.target.value)}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
//                                         placeholder="Enter your full name"
//                                     />
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                         </svg>
//                                     </div>
//                                 </div>
//                             </div>

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
//                                         onChange={(e) => setData('email', e.target.value)}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white"
//                                         placeholder="Enter your email"
//                                     />
//                                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                                         <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//                                         </svg>
//                                     </div>
//                                 </div>
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
//                                         onChange={(e) => setData('password', e.target.value)}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white pr-12"
//                                         placeholder="Create a strong password"
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
//                                 <div className="mt-2 text-xs text-gray-500">
//                                     Password must be at least 8 characters long
//                                 </div>
//                             </div>

//                             {/* Confirm Password Field */}
//                             <div>
//                                 <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-700 mb-2">
//                                     Confirm Password
//                                 </label>
//                                 <div className="relative">
//                                     <input
//                                         id="password_confirmation"
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         name="password_confirmation"
//                                         value={data.password_confirmation}
//                                         onChange={(e) => setData('password_confirmation', e.target.value)}
//                                         required
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-white pr-12"
//                                         placeholder="Confirm your password"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                         className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-xl transition-colors"
//                                     >
//                                         {showConfirmPassword ? (
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
//                             </div>

//                             {/* Terms and Conditions */}
//                             <div className="flex items-start">
//                                 <input
//                                     type="checkbox"
//                                     required
//                                     className="w-4 h-4 mt-1 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
//                                 />
//                                 <span className="ml-2 text-sm text-gray-600">
//                                     I agree to the{' '}
//                                     <a href="#" className="text-orange-600 hover:text-orange-500 font-medium">
//                                         Terms of Service
//                                     </a>
//                                     {' '}and{' '}
//                                     <a href="#" className="text-orange-600 hover:text-orange-500 font-medium">
//                                         Privacy Policy
//                                     </a>
//                                 </span>
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
//                                         Creating account...
//                                     </div>
//                                 ) : (
//                                     'Create Account'
//                                 )}
//                             </button>
//                         </form>

//                         {/* Sign In Link */}
//                         <div className="mt-8 text-center">
//                             <p className="text-gray-600">
//                                 Already have an account?{' '}
//                                 <Link
//                                     href={route('login')}
//                                     className="font-semibold text-orange-600 hover:text-orange-500 transition-colors"
//                                 >
//                                     Sign in here
//                                 </Link>
//                             </p>
//                         </div>

//                         {/* Footer */}
//                         <div className="mt-6 text-center text-xs text-gray-500">
//                             Join over 50,000+ fitness enthusiasts worldwide
//                         </div>
//                     </div>
//                 </div>

//                 {/* Right side - Image */}
//                 <div className="hidden lg:flex lg:w-1/2 relative">
//                     <div
//                         className="w-full bg-cover bg-center relative"
//                         style={{
//                             backgroundImage: "linear-gradient(135deg, rgba(255,144,0,0.3), rgba(0,0,0,0.7)), url('/images/gym-register.jpg')"
//                         }}
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 via-transparent to-black/70"></div>
//                         <div className="relative z-10 flex flex-col justify-center items-start h-full px-16">
//                             <div className="text-white">
//                                 <h1 className="text-5xl font-bold mb-6 leading-tight">
//                                     Start Your<br />
//                                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
//                                         Fitness Journey
//                                     </span>
//                                 </h1>
//                                 <p className="text-xl text-gray-200 mb-8 leading-relaxed">
//                                     Join our community and get access to:<br />
//                                     • World-class equipment & facilities<br />
//                                     • Expert personal trainers<br />
//                                     • Group fitness classes<br />
//                                     • Nutrition guidance
//                                 </p>
//                                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                                     <h3 className="text-lg font-semibold mb-4">What you get:</h3>
//                                     <div className="grid grid-cols-2 gap-4 text-sm">
//                                         <div className="flex items-center space-x-2">
//                                             <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
//                                             <span>Free trial week</span>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
//                                             <span>Fitness assessment</span>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
//                                             <span>Custom workout plan</span>
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
//                                             <span>Mobile app access</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
