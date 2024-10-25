/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      colors: {
        customblue: '#06778b',
        customgold: '#776421',
        customwhite: '#fff',
        customblack: '#000',
       
      },
      boxShadow: {
        custom: '5px 5px 0px 0px #06778b',
      },
    },
  },
  plugins: [],
};

