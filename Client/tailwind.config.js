/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".scrollbar-thin": {
    //       scrollbarWidth: "thin",
    //       scrollbarColor: "rgb(31,29,29) white",
    //     },
    //     ".scrollbar-webkit": {
    //       "&::-webkit-scollbar": {
    //         width: "8px",
    //       },
    //       "&::-webkit-scollbar-track": {
    //         background: "white",
    //       },
    //       "&::-webkit-scollbar-thumb": {
    //         backgroundColor: "rgb(31 41 55)",
    //         borderRadius: "20px",
    //         border: "1px solid white",
    //       },
    //     },
    //   };
    //   addUtilities(newUtilities, "responsive", "hover");
    // },
  ],
};
