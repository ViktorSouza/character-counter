import { useEffect, useState } from 'react'
function useSettings() {
	const [settings, setSettings] = useState(
		JSON.parse(window.localStorage.getItem('settings')) || {
			sortMethod: 'BIGGEST',
			ignoreSpaces: true,
			ignoreCase: true,
			isSettingsOpen:false,
			ignoreSpecialChars:false
		}
	)

	useEffect(() => {
		let localStorageSettings = window.localStorage.getItem('settings')
		if (!localStorageSettings) {
			window.localStorage.setItem('settings', JSON.stringify(settings))
			localStorageSettings = window.localStorage.getItem('settings')
		}
		setSettings(() => JSON.parse(localStorageSettings))
	}, [])

	useEffect(() => {
		window.localStorage.setItem('settings', JSON.stringify(settings))
	}, [settings.ignoreCase, settings.ignoreSpaces, settings.sortMethod, settings.isSettingsOpen, settings.ignoreSpecialChars])

	return [settings, setSettings]
}
export { useSettings }
