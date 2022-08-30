/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"]
        },
        colors: {
            'main-black': '#0a1c0f',
            'main-white': '#d2f2f6',
            'secondary-gray': '#4F5673',
            'main-green': '#14a35b',
            'dark-purple': '#245e36',
            'secondary-green': '#245e36',
            'jungler-white': '#edf9ff',
        },
    },
  },
  plugins: [],
}
