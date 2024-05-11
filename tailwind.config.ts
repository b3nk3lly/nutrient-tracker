import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
			},
			keyframes: {
				flash: {
					"0%": { "background-color": "inherit" },
					"50%": { "background-color": "#b1d9e9" }, // flash to INFO color
					"100%": { "background-color": "inherit" }
				}
			},
			animation: {
				flash: "flash 0.33s ease-in-out"
			}
		}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["lemonade"]
	}
};
export default config;
