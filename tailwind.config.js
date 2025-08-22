/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			boxShadow: {
				custom: "0px 9.29px 28.57px 0px rgba(27, 25, 86, 0.06)",
				"active-link": "0px 13px 40px 0px rgba(27, 25, 86, 0.06)",
			},
			colors: {
				gradient: {
					"yellow-light": "#F6E7B2", // bottom left
					"teal-light": "#B2F6E2", // bottom right
					"pink-light": "#F7AAAA", // bottom center
					peach: "#FFE1A6", // top center
					lime: "#E9F6B2", // top right
					mint: "#B2F6B9", // top left
				},
				cream: "#FBFBFB",
				offwhite: "#FFFAF4",
				purple: "#F4F4FF",
				"light-green": "#E9F6B2", // Light green for navbar background
				"gradient-start": "#B2F6B9", // Right color
				"gradient-mid": "#D8F6B2", // Middle color
				"gradient-end": "#E9F6B2", // Left color
				light: {
					green: "#E9F6B2", // Light green for navbar background
				},
				text: {
					primary: "#1F2937", // Dark gray for text
					hover: "#22C55E", // Green for hover states
				},
				green: {
					50: "#52CE06",
				},
				gray: {
					50: "#fafafa",
					55: "#1D2432",
					100: "#f5f5f5",
					150: "#F1F1F1", // New gray-150 for button background
					200: "#e5e5e5",
					225: "#EBEBEB", // New gray-225 for button border and hover
					300: "#d4d4d4",
					400: "#a3a3a3",
					500: "#555555", // Custom gray matching your request
					600: "#525252",
					700: "#404040",
					800: "#262626",
					900: "#171717",
				},
				primary: {
					50: "#f0fdf4",
					100: "#dcfce7",
					200: "#bbf7d0",
					300: "#86efac",
					400: "#0B6614",
					500: "#22c55e",
					600: "#16a34a",
					700: "#15803d",
					800: "#166534",
					900: "#14532d",
					950: "#052e16",
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
      height: {
        vhs: "80vh",
      },
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				"4xl": "100px",
			},
			fontFamily: {
				inter: ["var(--font-inter)", "sans-serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
				"open-sans": ["var(--font-open-sans)", "sans-serif"],
				nunito: ["var(--font-nunito)", "sans-serif"],
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			addUtilities({
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none'
					}
				}
			})
		}
	],
	darkMode: ["class", "class"],
};
