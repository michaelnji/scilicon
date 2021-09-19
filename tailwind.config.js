const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.svelte"],
    options: {
      safelist: [/data-theme$/],
    },
    enabled: production,
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Satisfy"],
        sans: ["lato"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        desolate: {
          primary: "#5c7cfa",
          "primary-focus": "#4263eb",
          "primary-content": "#ffffff",
          secondary: "#00f05c",
          "secondary-focus": "#16bd00",
          "secondary-content": "#ffffff",
          accent: "#45e876",
          "accent-focus": "#1e9943",
          "accent-content": "#ffffff",
          neutral: "#3d4451",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#ffffff",
          "base-200": "#fefeff",
          "base-300": "#eeeeee",
          "base-content": "#1f2937",
          info: "#2094f3",
          success: "#51cf66",
          warning: "#ff922b",
          error: "#fa5252",
        },
        black: {
          primary: "#22b8cf",
          "primary-focus": "#1098ad",
          "primary-content": "#000",
          secondary: "#00f05c",
          "secondary-focus": "#16bd00",
          "secondary-content": "#ffffff",
          accent: "#45e876",
          "accent-focus": "#1e9943",
          "accent-content": "#ffffff",
          neutral: "#f9fafb",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",
          "base-100": "#000",
          "base-200": "#090a0b",
          "base-300": "#01050b",
          "base-content": "#fff",
          info: "#2094f3",
          success: "#51cf66",
          warning: "#ff922b",
          error: "#fa5252",
        },
      },
      "forest",
      "dracula",
      "halloween",
      "wireframe",
      "emerald",
      "valentine",
      "synthwave",
      "aqua",
      "retro",
      "luxury",
    ],
  },
};
