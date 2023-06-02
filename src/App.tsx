import Head from './components/head'
import { useRef, useState } from 'react'
import Infos from './components/infos'
import Settings from './components/settings'
import TextInfos from './components/textinfo'
import { useSettings } from './useSettings'
import { useTheme } from './themes/useTheme'

function App() {
	const [text, setText] = useState('')
	const [settings, setSettings] = useSettings()
	const [theme, setTheme] = useTheme()
	const textAreaRef = useRef<HTMLDivElement>(null)

	return (
		<div className='bg-gray-950 w-full h-full px-8 py-4'>
			<Head
				setText={setText}
				setSettings={setSettings}
				refTextArea={textAreaRef}
			/>
			<div className='group relative'>
				<button className='bg-gray-900 px-2 py-1 rounded mb-5'>Settings</button>
				{settings.isSettingsOpen && null}
				<Settings
					settings={settings}
					setSettings={setSettings}
				/>
				<TextInfos
					refTextArea={textAreaRef}
					text={text}
					{...settings}
				/>
			</div>
			<Infos
				text={text}
				{...settings}
				refTextArea={textAreaRef}
			/>
		</div>
	)
}
export default App
