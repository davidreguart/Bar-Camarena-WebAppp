/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'salmon': '#fff0e9',
				'salmon-dark': '#f6cdb7',
				'rojo': '#ea5857',
				'negro': '#484848',
				'amarillo': '#fecc67',
				'azul': '#68a1fc',
				'blanco': '#fbfbfb'
			},
			fontFamily: {
				outfit: ['Outfit', 'sans-serif'],
			},
			backgroundImage: {
				'background-rectangle': "url('/img/rectangulo_background.svg')",
			},
			translate: {
				'0': '0',
				'full': '100%',
				'-full': '-100%',
			},
			// Agregar opacidades
			opacity: {
				'0': '0',
				'100': '1',
			},
		}
	},
	plugins: [],
}
