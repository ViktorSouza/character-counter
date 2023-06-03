import Head from './components/head'
import { useRef, useState } from 'react'
import Infos from './components/infos'
import Settings from './components/settings'
import TextInfos from './components/textinfo'
import { useSettings } from './hooks/useSettings'
import { useTheme } from './hooks/useTheme'

function App() {
	const [text, setText] = useState('')
	const [settings, setSettings] = useSettings()
	const [theme, setTheme] = useTheme()
	const textAreaRef = useRef<HTMLDivElement>(null)

	return (
		<main className='bg-gray-950 w-full min-h-screen px-8 py-4'>
			<Head
				setText={setText}
				setSettings={setSettings}
			/>
			<div className=' flex flex-col md:grid  grid-cols-10'>
				<div className=' col-span-4'>
					<div className='group relative'>
						<button className='bg-gray-900 px-2 py-1 rounded mb-5 peer'>
							Settings
						</button>
						{settings.isSettingsOpen && null}
						<Settings
							settings={settings}
							setSettings={setSettings}
						/>
					</div>
					<div
						contentEditable='true'
						ref={textAreaRef}
						className='bg-gray-900 rounded px-2 py-1 mb-5'
						onInput={(e) => {
							setText(e.currentTarget.innerText)
						}}></div>
					<TextInfos
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
		</main>
	)
}
export default App
