// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-out": "fadeOut 0.5s ease-in forwards",
        "loading-bar": "loadingBar 1.5s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        loadingBar: {
          "0%": { left: "-50%" },
          "100%": { left: "100%" },
        },
      },
    },
  },
  plugins: [],
};
