// import AdminLayout from "@/Layouts/AdminLayout";

// export default function Notifications({ notifications }) {
//     return (
//         <AdminLayout>
//             <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
//                 <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6">
//                     📬 All Notifications
//                 </h1>

//                 {notifications.length > 0 ? (
//                     <ul className="divide-y divide-gray-200 bg-white rounded-2xl shadow-md overflow-hidden">
//                         {notifications.map((notif) => (
//                             <li
//                                 key={notif.id}
//                                 className="p-4 sm:p-5 hover:bg-gray-50 transition-all"
//                             >
//                                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//                                     <p className="text-gray-800 text-sm sm:text-base font-medium">
//                                         {notif.message}
//                                     </p>
//                                     <span className="text-xs sm:text-sm text-gray-500">
//                                         {notif.time}
//                                     </span>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 text-sm">
//                         No notifications available.
//                     </div>
//                 )}
//             </div>
//         </AdminLayout>
//     );
// }

import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { router } from '@inertiajs/react';

export default function Notifications({ notifications }) {
    const [filter, setFilter] = useState('all');
    const [localNotifications, setLocalNotifications] = useState(notifications);
    const [isLoading, setIsLoading] = useState(false);

    // Filter notifications based on read status
    const filteredNotifications = localNotifications.filter(notif => {
        if (filter === 'unread') return !notif.read;
        if (filter === 'read') return notif.read;
        return true;
    });

    const unreadCount = localNotifications.filter(notif => !notif.read).length;

    // Mark single notification as read
    const markAsRead = async (notificationId) => {
        setIsLoading(true);
        try {
            // Update local state immediately for better UX
            setLocalNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId
                        ? { ...notif, read: true }
                        : notif
                )
            );

            // Send request to backend
            await router.patch(`/admin/notifications/${notificationId}/read`, {}, {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    // Revert local state if request fails
                    setLocalNotifications(prev =>
                        prev.map(notif =>
                            notif.id === notificationId
                                ? { ...notif, read: false }
                                : notif
                        )
                    );
                }
            });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Delete single notification
    const deleteNotification = async (notificationId) => {
        if (!confirm('Are you sure you want to delete this notification?')) {
            return;
        }

        setIsLoading(true);
        try {
            // Update local state immediately
            const originalNotifications = [...localNotifications];
            setLocalNotifications(prev => prev.filter(notif => notif.id !== notificationId));

            // Send request to backend
            await router.delete(`/admin/notifications/${notificationId}`, {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    // Revert local state if request fails
                    setLocalNotifications(originalNotifications);
                }
            });
        } catch (error) {
            console.error('Error deleting notification:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        setIsLoading(true);
        try {
            setLocalNotifications(prev =>
                prev.map(notif => ({ ...notif, read: true }))
            );

            await router.patch('/admin/notifications/mark-all-read', {}, {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    setLocalNotifications(notifications);
                }
            });
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Clear all notifications
    const clearAllNotifications = async () => {
        if (!confirm('Are you sure you want to delete all notifications? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        try {
            const originalNotifications = [...localNotifications];
            setLocalNotifications([]);

            await router.delete('/admin/notifications/clear-all', {
                preserveState: true,
                preserveScroll: true,
                onError: () => {
                    setLocalNotifications(originalNotifications);
                }
            });
        } catch (error) {
            console.error('Error clearing all notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                                    📬 Notifications
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                                    Stay updated with your latest activities
                                    {unreadCount > 0 && (
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            {unreadCount} unread
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === 'all'
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    All ({notifications.length})
                                </button>
                                {/* <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === 'unread'
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    Unread ({unreadCount})
                                </button> */}
                                {/* <button
                                    onClick={() => setFilter('read')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        filter === 'read'
                                            ? 'bg-primary text-white shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    Read ({notifications.length - unreadCount})
                                </button> */}
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    {filteredNotifications.length > 0 ? (
                        <div className="space-y-3">
                            {filteredNotifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden ${
                                        !notif.read ? 'ring-2 ring-primary/20 dark:ring-primary/30' : ''
                                    }`}
                                >
                                    {/* Unread indicator */}
                                    {!notif.read && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                                    )}

                                    <div className="p-4 sm:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                {/* Notification Icon & Message */}
                                                <div className="flex items-start gap-3">
                                                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                                                        !notif.read
                                                            ? 'bg-primary/10 text-primary'
                                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                                    }`}>
                                                        {notif.type === 'success' && '✅'}
                                                        {notif.type === 'warning' && '⚠️'}
                                                        {notif.type === 'error' && '❌'}
                                                        {notif.type === 'info' && 'ℹ️'}
                                                        {!notif.type && '🔔'}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm sm:text-base font-medium leading-relaxed ${
                                                            !notif.read
                                                                ? 'text-gray-900 dark:text-white'
                                                                : 'text-gray-700 dark:text-gray-300'
                                                        }`}>
                                                            {notif.message}
                                                        </p>

                                                        {notif.description && (
                                                            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                                {notif.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Time and Actions */}
                                            <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2">
                                                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                    {notif.time}
                                                </span>

                                                {/* Action Buttons */}
                                                {/* <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {!notif.read && (
                                                        <button
                                                            onClick={() => markAsRead(notif.id)}
                                                            disabled={isLoading}
                                                            className="text-xs px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            {isLoading ? '...' : 'Mark as read'}
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteNotification(notif.id)}
                                                        disabled={isLoading}
                                                        className="text-xs px-2 py-1 text-gray-500 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isLoading ? '...' : 'Delete'}
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
                                <div className="text-6xl mb-4">📭</div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    {filter === 'all'
                                        ? "You're all caught up! No new notifications to display."
                                        : `You don't have any ${filter} notifications at the moment.`
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    {/* {filteredNotifications.length > 0 && (
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={markAllAsRead}
                                disabled={isLoading || unreadCount === 0}
                                className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Mark all as read'}
                            </button>
                            <button
                                onClick={clearAllNotifications}
                                disabled={isLoading}
                                className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Clear all notifications'}
                            </button>
                        </div>
                    )} */}
                </div>
            </div>
        </AdminLayout>
    );
}
// import AdminLayout from "@/Layouts/AdminLayout";
// import { useState } from "react";

// export default function Notifications({ notifications }) {
//     const [filter, setFilter] = useState('all');

//     // Filter notifications based on read status (assuming notifications have a 'read' property)
//     const filteredNotifications = notifications.filter(notif => {
//         if (filter === 'unread') return !notif.read;
//         if (filter === 'read') return notif.read;
//         return true;
//     });

//     const unreadCount = notifications.filter(notif => !notif.read).length;

//     return (
//         <AdminLayout>
//             <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
//                 <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-6xl mx-auto">
//                     {/* Header Section */}
//                     <div className="mb-8">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                             <div>
//                                 <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
//                                     📬 Notifications
//                                 </h1>
//                                 <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
//                                     Stay updated with your latest activities
//                                     {unreadCount > 0 && (
//                                         <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
//                                             {unreadCount} unread
//                                         </span>
//                                     )}
//                                 </p>
//                             </div>

//                             {/* Filter Buttons */}
//                             <div className="flex flex-wrap gap-2">
//                                 <button
//                                     onClick={() => setFilter('all')}
//                                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                                         filter === 'all'
//                                             ? 'bg-primary text-white shadow-lg'
//                                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
//                                     }`}
//                                 >
//                                     All ({notifications.length})
//                                 </button>
//                                 <button
//                                     onClick={() => setFilter('unread')}
//                                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                                         filter === 'unread'
//                                             ? 'bg-primary text-white shadow-lg'
//                                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
//                                     }`}
//                                 >
//                                     Unread ({unreadCount})
//                                 </button>
//                                 <button
//                                     onClick={() => setFilter('read')}
//                                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                                         filter === 'read'
//                                             ? 'bg-primary text-white shadow-lg'
//                                             : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
//                                     }`}
//                                 >
//                                     Read ({notifications.length - unreadCount})
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Notifications List */}
//                     {filteredNotifications.length > 0 ? (
//                         <div className="space-y-3">
//                             {filteredNotifications.map((notif) => (
//                                 <div
//                                     key={notif.id}
//                                     className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden ${
//                                         !notif.read ? 'ring-2 ring-primary/20 dark:ring-primary/30' : ''
//                                     }`}
//                                 >
//                                     {/* Unread indicator */}
//                                     {!notif.read && (
//                                         <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
//                                     )}

//                                     <div className="p-4 sm:p-6">
//                                         <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
//                                             <div className="flex-1 min-w-0">
//                                                 {/* Notification Icon & Message */}
//                                                 <div className="flex items-start gap-3">
//                                                     <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
//                                                         !notif.read
//                                                             ? 'bg-primary/10 text-primary'
//                                                             : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//                                                     }`}>
//                                                         {notif.type === 'success' && '✅'}
//                                                         {notif.type === 'warning' && '⚠️'}
//                                                         {notif.type === 'error' && '❌'}
//                                                         {notif.type === 'info' && 'ℹ️'}
//                                                         {!notif.type && '🔔'}
//                                                     </div>

//                                                     <div className="flex-1 min-w-0">
//                                                         <p className={`text-sm sm:text-base font-medium leading-relaxed ${
//                                                             !notif.read
//                                                                 ? 'text-gray-900 dark:text-white'
//                                                                 : 'text-gray-700 dark:text-gray-300'
//                                                         }`}>
//                                                             {notif.message}
//                                                         </p>

//                                                         {notif.description && (
//                                                             <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//                                                                 {notif.description}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Time and Actions */}
//                                             <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:items-end gap-2">
//                                                 <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
//                                                     {notif.time}
//                                                 </span>

//                                                 {/* Action Buttons */}
//                                                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                                     {!notif.read && (
//                                                         <button className="text-xs px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-md transition-colors">
//                                                             Mark as read
//                                                         </button>
//                                                     )}
//                                                     <button className="text-xs px-2 py-1 text-gray-500 hover:text-red-500 transition-colors">
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-12">
//                             <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-md mx-auto">
//                                 <div className="text-6xl mb-4">📭</div>
//                                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                                     {filter === 'all' ? 'No notifications' : `No ${filter} notifications`}
//                                 </h3>
//                                 <p className="text-gray-500 dark:text-gray-400 text-sm">
//                                     {filter === 'all'
//                                         ? "You're all caught up! No new notifications to display."
//                                         : `You don't have any ${filter} notifications at the moment.`
//                                     }
//                                 </p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Footer Actions */}
//                     {filteredNotifications.length > 0 && (
//                         <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
//                             <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
//                                 Mark all as read
//                             </button>
//                             <button className="px-6 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium">
//                                 Clear all notifications
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }
