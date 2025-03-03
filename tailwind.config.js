/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'], // Habilita el soporte para el modo oscuro
    safelist: ['dark'], // Habilita el soporte para el modo oscuro
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}', // Incluye todas tus carpetas donde tengas componentes y páginas
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
