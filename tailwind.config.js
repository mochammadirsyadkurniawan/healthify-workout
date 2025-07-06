//<><><><><><><><><><><><><><><><><><><><><><> Checkpoint
// tailwind.config.js
// import defaultTheme from 'tailwindcss/defaultTheme'
// import forms from '@tailwindcss/forms'

// export default {
//     content: [
//         './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
//         './storage/framework/views/*.php',
//         './resources/views/**/*.blade.php',
//         './resources/**/*.{blade.php,js,jsx,ts,tsx,vue}',
//     ],

//     theme: {
//         extend: {
//             colors: {
//                 primary: '#ff9000',
//                 dark: '#111',
//                 accent: '#0D5EAD',
//             },
//             fontFamily: {
//                 poppins: ['Poppins', 'sans-serif'],
//                 'mrs-eaves': ['"Mrs Eaves"', 'serif'],
//             },
//         },
//     },

//     plugins: [forms],
// }

// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/**/*.{blade.php,js,jsx,ts,tsx,vue}',
    ],

    // Add this line to enable dark mode with class strategy
    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                primary: '#ff9000',
                dark: '#111',
                accent: '#0D5EAD',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                'mrs-eaves': ['"Mrs Eaves"', 'serif'],
            },
        },
    },

    plugins: [forms],
}
