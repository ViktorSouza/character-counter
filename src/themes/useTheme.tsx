import { useEffect, useState } from 'react'
import Themes from './Themes'

export const useTheme = () => {
	const [theme, setTheme] = useState({
		name: 'Dark',
		bg1: '#151516',
		bg2: '#1a1b1c',
		bg3: '#202124',
		bg4: '#26292c',
		bg5: '#2a2e31',
		mainColor: '#00aabb',
	})
	// useEffect(() => {
	//     	let themeLocalStorage = localStorage.getItem('theme')
	// 	const preferedTheme = 			Themes.find( 				(themeArray) => themeArray.name === themeLocalStorage 			) || Themes[0]
	//     	setTheme(preferedTheme)
	//         	changeThemeRoot(preferedTheme) 	}, [])
	return [theme, setTheme]
}
const changeThemeRoot = (preferedTheme: string) => {
	const root = document.querySelector(':root')
	// Object.values(Themes)
	// 	let theme =   convertTheme(preferedTheme)
	//     	console.log(theme)
	//     	for (let [key, value] of theme) {
	//             	root?.style.setProperty(`--${key}`, value)	 	}
	// root.style.setProperty('--bg1', preferedTheme.bg1) 	// root.style.setProperty('--bg2', preferedTheme.bg2) 	// root.style.setProperty('--bg3', preferedTheme.bg3) 	// root.style.setProperty('--bg4', preferedTheme.bg4) 	// root.style.setProperty('--bg5', preferedTheme.bg5) }

	function convertTheme(theme: Record<string, never>) {
		return Object.entries(theme)
			.filter((x) => x[0] !== 'name')
			.map((key) => [
				key[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
				key[1],
			])
	}
}
