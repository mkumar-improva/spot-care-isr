const defaultTheme = require("tailwindcss/defaultTheme");

// Custom color with css variable color in __theme_color.scss
function customColors(cssVar) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${cssVar}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${cssVar}))`;
  };
}

module.exports = {
   content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css,scss}"
  ],
  safelist: ["swiper-pagination"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        "2xl": "128px"
      }
    },
    fontFamily: {
      display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
      body: ["var(--font-body)", ...defaultTheme.fontFamily.sans]
    },

    extend: {
      transitionProperty: {
        height: "height",
        spacing: "margin, padding"
      },
      keyframes: {
        "bounce-shadow": {
          "0%, 100%": {
            transform: "translateY(0)",
            boxShadow: "0 0 0 0 rgba(59, 135, 254, 0.6)"
          },
          "50%": {
            transform: "translateY(-10%)",
            boxShadow: "0 0 20px 10px rgba(59, 135, 254, 0.3)"
          }
        },
        "shadow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59, 135, 254, 0.6)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(59, 135, 254, 0.3)" }
        },
        appear: {
          "0%": {
            opacity: "0"
          },
          "100%": {
            opacity: "1"
          }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" }
        }
      },
      animation: {
        "fade-in": "fade-in 1s ease-in forwards",
        shake: "shake 1s ease-in-out 2s forwards",
        "shadow-pulse": "shadow-pulse 2s ease-in-out infinite",
        "bounce-shadow": "bounce-shadow 2s ease-in-out infinite"
      },
      fontSize: {
        "0.9rem": "0.7rem", // Custom font size
        "xs-small": "0.6rem"
      },
      colors: {
        "progress-content": "#f97316",
        primary: {
          50: customColors("--c-primary-50"),
          100: customColors("--c-primary-100"),
          200: customColors("--c-primary-200"),
          300: customColors("--c-primary-300"),
          400: customColors("--c-primary-400"),
          500: customColors("--c-primary-500"),
          600: customColors("--c-primary-600"),
          700: customColors("--c-primary-700"),
          800: customColors("--c-primary-800"),
          900: customColors("--c-primary-900")
        },
        secondary: {
          50: customColors("--c-secondary-50"),
          100: customColors("--c-secondary-100"),
          200: customColors("--c-secondary-200"),
          300: customColors("--c-secondary-300"),
          400: customColors("--c-secondary-400"),
          500: customColors("--c-secondary-500"),
          600: customColors("--c-secondary-600"),
          700: customColors("--c-secondary-700"),
          800: customColors("--c-secondary-800"),
          900: customColors("--c-secondary-900")
        },
        neutral: {
          50: customColors("--c-neutral-50"),
          100: customColors("--c-neutral-100"),
          200: customColors("--c-neutral-200"),
          300: customColors("--c-neutral-300"),
          400: customColors("--c-neutral-400"),
          500: customColors("--c-neutral-500"),
          600: customColors("--c-neutral-600"),
          700: customColors("--c-neutral-700"),
          800: customColors("--c-neutral-800"),
          900: customColors("--c-neutral-900")
        }
      },
      scrollbar: {
        hide: {
          "&::-webkit-scrollbar": {
            display: "none"
          },
          "&": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none"
          }
        }
      },
      screens: {
        "2xs": "200px",
        xs: "300px",
        xsm: "375px",
        ms: "480px",
        "2lg": "1110px",
        "mid-lg": "1112px",
        "xl-custom": "1300px",
        "2xl-custom": "1465px",
        "3xl": "1680px",
        ...defaultTheme.screens
      },
      spacing: {
        98: "32rem"
      },
      width: {
        "7/10": "70%"
      },
      boxShadow: {
        "radio-dark-custom-inset": "0px 0px 0px 2px #1e293b inset",
        "radio-white-custom-inset": "0px 0px 0px 2px white inset"
      }
    }
  },
  variants: {
    extend: {}
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "&::-webkit-scrollbar": {
            display: "none"
          },
          "&": {
            "-ms-overflow-style": "none",
            "scrollbar-width": "none"
          }
        },
        ".responsive-height": {
          "@screen xs": {
            height: "80dvh"
          },
          "@screen sm": {
            height: "80vh"
          },
          "@screen md": {
            height: "80vh"
          },
          "@screen lg": {
            height: "80vh"
          },
          "@screen xl": {
            height: "80vh"
          }
        }
      });
    }
  ]
};
