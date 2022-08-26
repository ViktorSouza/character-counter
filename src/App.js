import Head from './components/head/head'
import { useRef, useState } from 'react'
import Infos from './components/infos/infos.js'
import Settings from './components/settings/settings.js'
import { useSettings } from './useSettings.js'
import './App.css'
import { useTheme } from './themes/useTheme'
function App() {
	const [text, setText] = useState('')
	const [settings, setSettings] = useSettings()
	const [theme, setTheme] = useTheme()
	const textAreaRef = useRef('')
	return (
		<div className='main-page'>
			<Head
				setText={setText}
				setSettings={setSettings}
				refTextArea={textAreaRef}
			/>
			{settings.isSettingsOpen && (
				<Settings settings={settings} setSettings={setSettings} />
			)}
			<Infos text={text} {...settings} refTextArea={textAreaRef} />
		</div>
	)
}

export default App
