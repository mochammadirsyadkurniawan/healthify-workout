// import AdminLayout from "@/Layouts/AdminLayout";
// import { Head, usePage } from "@inertiajs/react";
// import { useEffect } from "react";
// import {
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip,
//     Legend,
//     BarChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {
//     const { auth, statusChart, categoryChart } = usePage().props;
//     const user = auth.user;

//     // Map statusChart ke format PieChart
//     const membershipData = statusChart.map(item => {
//         let color = "#8884d8";
//         if (item.status === "Accepted") color = "#22C55E";
//         else if (item.status === "Pending") color = "#EAB308";
//         else if (item.status === "Rejected") color = "#EF4444";

//         return {
//             name: item.status,
//             value: item.total,
//             color
//         };
//     });

//     // Map categoryChart ke format BarChart
//     const membershipCategoryData = categoryChart.map(item => {
//         let color = "#0D5EAD";
//         if (item.membership === "Pilates+ Membersip") color = "#ff9000";

//         return {
//             name: item.membership,
//             users: item.total,
//             color
//         };
//     });

//     useEffect(() => {
//             // Disable scroll when component mounts
//             document.body.style.overflow = 'hidden';

//             // Enable scroll again when component unmounts
//             return () => {
//                 document.body.style.overflow = 'auto';
//             };
//         }, []);


//     return (
//         <AdminLayout title="Dashboard">
//             <Head title="Dashboard" />
//             <div className="p-6 space-y-6 overflow-hidden">
//                 {/* Welcome Text */}
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                         <span className="text-[#0D5EAD] animate-bounce flex items-center gap-1">
//                             <span className="text-3xl">👋</span> Welcome,
//                         </span>
//                         <span>{user.name}!</span>
//                     </h2>
//                     <p className="text-gray-600 text-sm mt-1">
//                         {/* Manage Healthify Workout platform here. */}
//                         Berikut adalah statistik Users dalam 30 hari terakhir.
//                     </p>
//                 </div>

//                 {/* Charts Section - Split into Two Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Pie Chart Card */}
//                     <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                             Membership Status <span className="text-sm text-gray-400">(Last 30 Days)</span>
//                         </h3>
//                         <div className="flex justify-center">
//                             <PieChart width={300} height={300}>
//                                 <Pie data={membershipData} cx={150} cy={120} outerRadius={120} dataKey="value">
//                                     {membershipData.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={entry.color} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend />
//                             </PieChart>
//                         </div>
//                     </div>

//                     {/* Bar Chart Card */}
//                     <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100">
//                         <h3 className="text-xl font-semibold text-gray-800 mb-6">
//                             Membership Category <span className="text-sm text-gray-400">(Last 30 Days)</span>
//                         </h3>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={membershipCategoryData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Bar dataKey="users">
//                                     {membershipCategoryData.map((entry, index) => (
//                                         <Cell
//                                             key={`bar-${index}`}
//                                             fill={entry.name === "Pilates+ Membership" ? "#ec4899" : entry.color}
//                                         />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
    Area,
    AreaChart
} from "recharts";
// Using custom SVG icons instead of Heroicons

export default function Dashboard() {
    const { auth, statusChart, categoryChart } = usePage().props;
    const user = auth.user;
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check if dark mode is active
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        // Check on initial load
        checkDarkMode();

        // Create a mutation observer to track class changes on <html> element
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // Get dynamic colors based on dark mode
    const getColors = () => {
        return {
            textPrimary: isDarkMode ? 'text-white' : 'text-gray-800',
            textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
            textAccent: isDarkMode ? 'text-blue-400' : 'text-accent',
            bgPrimary: isDarkMode ? 'bg-gray-800' : 'bg-white',
            borderColor: isDarkMode ? 'border-gray-700' : 'border-gray-100',
            chartGrid: isDarkMode ? '#374151' : '#e5e7eb',
            legendText: isDarkMode ? '#f3f4f6' : '#111827',
        };
    };

    const colors = getColors();

    // Map statusChart to PieChart format
    const membershipData = statusChart.map(item => {
        let color;
        if (item.status === "Accepted") color = isDarkMode ? "#10B981" : "#22C55E";
        else if (item.status === "Pending") color = isDarkMode ? "#FBBF24" : "#EAB308";
        else if (item.status === "Rejected") color = isDarkMode ? "#F87171" : "#EF4444";
        else color = isDarkMode ? "#60A5FA" : "#8884d8";

        return {
            name: item.status,
            value: item.total,
            color
        };
    });

    // Map categoryChart to BarChart format
    const membershipCategoryData = categoryChart.map(item => {
        let color = isDarkMode ? "#60A5FA" : "#0D5EAD";
        if (item.membership === "Pilates+ Membership" || item.membership === "Pilates+ Membersip") {
            color = isDarkMode ? "#F472B6" : "#ec4899";
        }

        return {
            name: item.membership,
            users: item.total,
            color
        };
    });

    // Create some mock data for a growth trend chart
    const growthData = [
        { month: 'Jan', users: 65 },
        { month: 'Feb', users: 59 },
        { month: 'Mar', users: 80 },
        { month: 'Apr', users: 81 },
        { month: 'May', users: 95 },
    ];

    // Summary cards data
    const summaryData = [
        {
            title: "Total Members",
            value: membershipData.reduce((acc, item) => acc + item.value, 0),
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            ),
            color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
        },
        {
            title: "Active Members",
            value: membershipData.find(item => item.name === "Accepted")?.value || 0,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>
            ),
            color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
        },
        {
            title: "Pending Requests",
            value: membershipData.find(item => item.name === "Pending")?.value || 0,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9.75v7.5" />
                </svg>
            ),
            color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
        }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`${colors.bgPrimary} p-3 border ${colors.borderColor} rounded-md shadow-lg`}>
                    <p className={`font-medium ${colors.textPrimary}`}>{label || payload[0].name}</p>
                    <p className={`${colors.textSecondary} text-sm`}>
                        {`${payload[0].name}: ${payload[0].value}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />
            <div className="p-6 space-y-6 overflow-auto h-full pb-24">
                {/* Welcome Text */}
                <div className="mb-8">
                    <h2 className={`text-2xl font-bold ${colors.textPrimary} flex items-center gap-2`}>
                        <span className="text-primary animate-bounce flex items-center gap-1">
                            <span className="text-3xl">👋</span> Welcome,
                        </span>
                        <span>{user.name}!</span>
                    </h2>
                    <p className={`${colors.textSecondary} text-sm mt-1`}>
                        Berikut adalah statistik Users dalam 30 hari terakhir.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {summaryData.map((item, index) => (
                        <div
                            key={index}
                            className={`${colors.bgPrimary} p-5 rounded-xl shadow-md border ${colors.borderColor} transition-all duration-300 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className={`text-sm font-medium ${colors.textSecondary}`}>{item.title}</h3>
                                    <p className={`text-2xl font-bold ${colors.textPrimary} mt-1`}>{item.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${item.color}`}>
                                    {item.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Section - Split into Two Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pie Chart Card */}
                    <div className={`${colors.bgPrimary} p-6 shadow-lg rounded-xl border ${colors.borderColor} transition-all duration-300 hover:shadow-xl`}>
                        <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
                            Membership Status
                        </h3>
                        <p className={`text-sm ${colors.textSecondary} mb-4`}>Distribution of membership status in the last 30 days</p>
                        <div className="flex justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={membershipData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        innerRadius={60}
                                        dataKey="value"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {membershipData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                stroke={isDarkMode ? "#1F2937" : "#FFFFFF"}
                                                strokeWidth={2}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend
                                        formatter={(value) => (
                                            <span className={colors.textPrimary}>{value}</span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart Card */}
                    <div className={`${colors.bgPrimary} p-6 shadow-lg rounded-xl border ${colors.borderColor} transition-all duration-300 hover:shadow-xl`}>
                        <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
                            Membership Category
                        </h3>
                        <p className={`text-sm ${colors.textSecondary} mb-4`}>Distribution by membership types in the last 30 days</p>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={membershipCategoryData} barSize={60}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={colors.chartGrid}
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    formatter={(value) => (
                                        <span className={colors.textPrimary}>{value}</span>
                                    )}
                                />
                                <Bar
                                    dataKey="users"
                                    name="Users"
                                    radius={[10, 10, 0, 0]}
                                >
                                    {membershipCategoryData.map((entry, index) => (
                                        <Cell
                                            key={`bar-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Growth Trend Chart */}
                <div className={`${colors.bgPrimary} p-6 shadow-lg rounded-xl border ${colors.borderColor} transition-all duration-300 hover:shadow-xl`}>
                    <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-2`}>
                        Membership Growth Trend
                    </h3>
                    <p className={`text-sm ${colors.textSecondary} mb-4`}>Monthly growth in user registrations</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={growthData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={isDarkMode ? "#60A5FA" : "#0D5EAD"}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={isDarkMode ? "#60A5FA" : "#0D5EAD"}
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke={colors.chartGrid}
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563' }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: isDarkMode ? '#D1D5DB' : '#4B5563' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke={isDarkMode ? "#60A5FA" : "#0D5EAD"}
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                                name="Users"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AdminLayout>
    );
}
