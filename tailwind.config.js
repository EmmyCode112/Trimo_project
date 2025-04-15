/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'layout': '1440px',
        'content': '1216px',
      },
      colors: {
        basewhite: "var(--basewhite)",
        "foundationbranddeep-purpledeep-purple-400":
          "var(--foundationbranddeep-purpledeep-purple-400)",
        "foundationbranddeep-purpledeep-purple-50":
          "var(--foundationbranddeep-purpledeep-purple-50)", 
        "foundationbranddeep-purpledeep-purple-500":
          "var(--foundationbranddeep-purpledeep-purple-500)",
        "foundationbrandmaronmaron-400": "var(--foundationbrandmaronmaron-400)",
        "foundationbrandmaronmaron-50": "var(--foundationbrandmaronmaron-50)",
        "foundationbrandmaronmaron-500": "var(--foundationbrandmaronmaron-500)",
        "foundationbrandprimary-blackprimary-black-200":
          "var(--foundationbrandprimary-blackprimary-black-200)",
        "foundationbrandprimary-blackprimary-black-400":
          "var(--foundationbrandprimary-blackprimary-black-400)",
        "foundationbrandprimary-blackprimary-black-50":
          "var(--foundationbrandprimary-blackprimary-black-50)",
        "foundationbrandprimary-blueprimary-blue-100":
          "var(--foundationbrandprimary-blueprimary-blue-100)",
        "foundationbrandprimary-blueprimary-blue-400":
          "var(--foundationbrandprimary-blueprimary-blue-400)",
        "foundationbrandprimary-blueprimary-blue-50":
          "var(--foundationbrandprimary-blueprimary-blue-50)",
        "foundationbrandprimary-blueprimary-blue-500":
          "var(--foundationbrandprimary-blueprimary-blue-500)",
        "foundationtextgreygrey-100": "var(--foundationtextgreygrey-100)",
        "foundationtextgreygrey-200": "var(--foundationtextgreygrey-200)",
        "foundationtextgreygrey-300": "var(--foundationtextgreygrey-300)",
        "foundationtextgreygrey-50": "var(--foundationtextgreygrey-50)",
        "foundationtextgreygrey-500": "var(--foundationtextgreygrey-500)",
        "foundationtexttext-blacktext-black-400":
          "var(--foundationtexttext-blacktext-black-400)",
        "foundationtexttext-blacktext-black-500":
          "var(--foundationtexttext-blacktext-black-500)",
        "gray-100": "var(--gray-100)",
        "gray-200": "var(--gray-200)",
        "gray-300": "var(--gray-300)",
        "gray-400": "var(--gray-400)",
        "gray-50": "var(--gray-50)",
        "gray-500": "var(--gray-500)",
        "gray-700": "var(--gray-700)",
        "gray-900": "var(--gray-900)",
        "primary-50": "var(--primary-50)",
        "primary-600": "var(--primary-600)",
        "primary-700": "var(--primary-700)",
        "success-500": "var(--success-500)",
        white: "var(--white)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        triimo: {
          gray: '#484848',
          border: '#C1BFD0',
          badge: '#EBEBF099',
          red: '#CB1E33',
          purple: '#383268',
        },
      },
      fontFamily: {
        "body-lg-medium": "var(--body-lg-medium-font-family)",
        "body-md-medium": "var(--body-md-medium-font-family)", 
        "body-md-normal": "var(--body-md-normal-font-family)",
        "body-md-regular": "var(--body-md-regular-font-family)",
        "body-sm-medium": "var(--body-sm-medium-font-family)",
        "body-sm-normal": "var(--body-sm-normal-font-family)",
        "body-sm-regular": "var(--body-sm-regular-font-family)",
        "body-xl-medium": "var(--body-xl-medium-font-family)",
        "body-xs-medium": "var(--body-xs-medium-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui", 
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        'general': ['General Sans', 'sans-serif'],
        'figma-hand': ['Figma Hand', 'cursive'],
      },
      boxShadow: {
        "focus-ring-4px-primary-100": "var(--focus-ring-4px-primary-100)",
        "shadow-xs": "var(--shadow-xs)",
        "state-shadow": "var(--state-shadow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-slow': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-in-slow': 'fade-in-slow 0.6s ease-out forwards',
        'slide-in': 'slide-in 0.5s ease-out forwards'
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
}