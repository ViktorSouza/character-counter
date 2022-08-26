import Head from './components/head/head'
import { useRef, useState } from 'react'
import Infos from './components/infos/infos.js'
import Settings from './components/settings/settings.js'
import TextInfos from './components/textinfos/textinfo.js'
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
<div className='settings-textinfos'>
			{settings.isSettingsOpen && (
				<Settings settings={settings} setSettings={setSettings} />
			)}
			<TextInfos refTextArea={textAreaRef} text={text} {...settings}/>
</div>
			<Infos text={text} {...settings} refTextArea={textAreaRef} />
		</div>
	)
}

export default App
