import { useEffect, useState } from 'react'
import { ISettings } from '../types/ISettings'
const useSettings = function () {
	const [settings, setSettings] = useState<ISettings>(
		(window.localStorage.getItem('settings') &&
			JSON.parse(window.localStorage.getItem('settings') ?? '')) || {
			sortMethod: 'BIGGEST',
			ignoreSpaces: true,
			ignoreCase: true,
			isSettingsOpen: false,
			ignoreSpecialChars: false,
		},
	)
	useEffect(() => {
		let localStorageSettings = window.localStorage.getItem('settings')
		if (!localStorageSettings) {
			window.localStorage.setItem('settings', JSON.stringify(settings))
			localStorageSettings = window.localStorage.getItem('settings')
		}
		// setSettings(() => localStorageSettings && JSON.parse(localStorageSettings))
	}, [])
	useEffect(() => {
		window.localStorage.setItem('settings', JSON.stringify(settings))
	}, [settings])
	return [settings, setSettings] as const
}
export { useSettings }
