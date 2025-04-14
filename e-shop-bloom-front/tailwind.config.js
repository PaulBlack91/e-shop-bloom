export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#866CEB",
        secondary: "#F5D9FB",
        accent: "#0CE9E3",
        dark: "#1D1D1B",
        bgrosa: "#F9F0FF",

      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        georgia: ['Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],

      },
      animation: {
        'fade-slide': 'fadeSlide 1s ease-out forwards',
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
