/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/pages/**/*.tsx',
        './src/components/**/*.tsx',],
    theme: {
        extend: {
            colors: {
                'primary': '#161A30',
                'secondary': '#31304D',
                'tertiary': '#B6BBC4',
                'quaternary': '#F0ECE5',
                'red' : '#FF0000'
            }
        },
    },
    plugins: [],
}

