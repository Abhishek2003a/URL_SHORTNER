export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        grid: "gridMove 20s linear infinite",
      },

      keyframes: {
        gridMove: {
          "0%": {
            transform: "translateY(0px)",
          },

          "100%": {
            transform: "translateY(25px)",
          },
        },
      },
    },
  },
  plugins: [],
};
