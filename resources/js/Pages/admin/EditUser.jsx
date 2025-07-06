
import { router, useForm, Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";

export default function EditUser({ user }) {
    const { data, setData, processing, errors } = useForm({
        name: user.name || "",
        email: user.email || "",
        usertype: user.usertype || "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("usertype", data.usertype);
        if (data.password) formData.append("password", data.password);
        if (data.password_confirmation)
            formData.append(
                "password_confirmation",
                data.password_confirmation
            );

        formData.append("_method", "PUT");

        router.post(route("admin.users.update", user.id), formData, {
            onSuccess: () => {
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            },
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <AdminLayout>
            <Head title="Edit User" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb Navigation */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-black dark:text-white">
                        <li>
                            <Link
                                href={route("admin.dashboard")}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </li>
                        <li>
                            <Link
                                href={route("admin.users")}
                                className="hover:text-blue-600 transition-colors"
                            >
                                Users
                            </Link>
                        </li>
                        <li className="flex items-center dark:text-white">
                            <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </li>
                        <li className="text-black dark:text-white font-medium">
                            Edit User
                        </li>
                    </ol>
                </nav>

                {/* Main Content Header */}
                <div className="mb-8 border-b border-gray-200 pb-5">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex items-center">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-7 w-7 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    <span className="bg-gradient-to-r text-black dark:from-blue-600  dark:bg-clip-text dark:text-transparent dark:text-pimary  dark:to-orange-300">
                                        Edit Akun Pengguna
                                    </span>
                                </h2>
                                <p className="mt-1 text-sm text-black dark:text-white">
                                    Update user information and permissions.
                                </p>
                            </div>
                        </div>

                        <Link
                            href={route("admin.users")}
                            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg border border-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to User List
                        </Link>
                    </div>
                </div>

                {/* Success Message */}
                {updateSuccess && (
                    <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md animate-fade-in-down">
                        <div className="flex items-center">
                            <svg
                                className="h-5 w-5 text-green-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-medium">
                                User updated successfully!
                            </span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Summary Card */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-min">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {user.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-4">
                                {user.email}
                            </p>

                            <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-6
                                ${
                                    user.usertype === "admin"
                                        ? "bg-indigo-100 text-indigo-800"
                                        : "bg-green-100 text-green-800"
                                }`}
                            >
                                <svg
                                    className="mr-1.5 h-2 w-2 text-indigo-400"
                                    fill="currentColor"
                                    viewBox="0 0 8 8"
                                >
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                {user.usertype.charAt(0).toUpperCase() +
                                    user.usertype.slice(1)}
                            </div>

                            <div className="w-full border-t border-gray-100 pt-4 mt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        User ID:
                                    </span>
                                    <span className="text-gray-800 font-medium">
                                        #{user.id}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                        >
                            <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Edit User Information
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    Update user details and credentials
                                </p>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                        {/* <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="User Full Name"
                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                            required
                                        /> */}

                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="User Full Name"
                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm placeholder-gray-600 dark:placeholder-gray-600 text-black dark:text-black"
                                            required
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            placeholder="user@example.com"
                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black dark:text-black"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </div>
                                        <select
                                            value={data.usertype}
                                            onChange={(e) =>
                                                setData(
                                                    "usertype",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm appearance-none text-black dark:text-black"
                                            required
                                        >
                                            <option value="" disabled hidden>
                                                Select Role
                                            </option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                    {errors.usertype && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.usertype}
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-4">
                                        Password Settings
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-4">
                                        Leave password fields empty if you don't
                                        want to change the password
                                    </p>

                                    {/* Password */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="New Password"
                                                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black dark:text-black"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                value={
                                                    data.password_confirmation
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Confirm Password"
                                                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-black dark:text-black"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={
                                                    toggleConfirmPasswordVisibility
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                        {errors.password_confirmation && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                <Link
                                    href={route("admin.users")}
                                    className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                            Update User
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

// export default function EditUser({ user }) {
//     const { data, setData, processing, errors } = useForm({
//         name: user.name || '',
//         email: user.email || '',
//         usertype: user.usertype || '',
//         password: '',
//         password_confirmation: '',
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', data.name);
//         formData.append('email', data.email);
//         formData.append('usertype', data.usertype);
//         if (data.password) formData.append('password', data.password);
//         if (data.password_confirmation) formData.append('password_confirmation', data.password_confirmation);

//         formData.append('_method', 'PUT');

//         router.post(route('admin.users.update', user.id), formData, {
//             onSuccess: () => alert('User updated successfully!'),
//         });
//     };

//     return (
//         <AdminLayout>
//             <Head title="Edit User" />

//             <div className="p-4 md:p-6 max-w-4xl mx-auto">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-6 flex items-center gap-2">
//                         <img src="/images/edit.png" alt="Edit Icon" className="w-8 h-8 mr-2" />
//                         Edit User Account
//                     </h2>

//                     <Link
//                         href={route('admin.users')}
//                         className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm shadow transition"
//                     >
//                         Back to List
//                     </Link>
//                 </div>

//                 <form
//                     onSubmit={handleSubmit}
//                     className="bg-white rounded-xl shadow-md p-4 md:p-6 space-y-6"
//                 >
//                     {/* Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             value={data.name}
//                             onChange={(e) => setData('name', e.target.value)}
//                             placeholder="User Full Name"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                         {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                     </div>

//                     {/* Email */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             placeholder="user@example.com"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         />
//                         {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                     </div>

//                     {/* Role */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Role
//                         </label>
//                         <select
//                             value={data.usertype}
//                             onChange={(e) => setData('usertype', e.target.value)}
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             required
//                         >
//                             <option value="" disabled hidden>Select Role</option>
//                             <option value="admin">Admin</option>
//                             <option value="user">User</option>
//                         </select>
//                         {errors.usertype && <p className="text-red-500 text-xs mt-1">{errors.usertype}</p>}
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                         <input
//                             type="password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="New Password"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
//                     </div>

//                     {/* Confirm Password */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//                         <input
//                             type="password"
//                             value={data.password_confirmation}
//                             onChange={(e) => setData('password_confirmation', e.target.value)}
//                             placeholder="Confirm Password"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                         />
//                         {errors.password_confirmation && <div className="text-red-500 text-xs mt-1">{errors.password_confirmation}</div>}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={processing}
//                         className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition shadow-md"
//                     >
//                         Update User
//                     </button>
//                 </form>
//             </div>
//         </AdminLayout>
//     );
// }


// import AdminLayout from '@/Layouts/AdminLayout copy 2'
// import React from 'react'

// const EditUser = () => {
//     return (
//         <>
//             <AdminLayout>
//                 <h1>Tampilan Edit User</h1>
//             </AdminLayout>
//         </>
//     )
// }

// export default EditUser
