import React, { Ref } from 'react'
import { ISettings } from '../types/ISettings'
export default function Head({
	setText,
	setSettings,
}: {
	setText: React.Dispatch<React.SetStateAction<string>>
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}) {
	return (
		<>
			<h1 className='text-4xl font-semibold mb-5'>Letters counter</h1>
		</>
	)
}
