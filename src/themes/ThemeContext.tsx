import { createContext } from 'react'
const ThemeContext = createContext({
	name: 'Dark',
	bg1: '#151516',
	bg2: '#1a1b1c',
	bg3: '#202124',
	bg4: '#26292c',
	bg5: '#2a2e31',
	mainColor: '#00aabb',
})
export { ThemeContext }
