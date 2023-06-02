import React, { Ref } from 'react'
import { ISettings } from '../types/ISettings'
export default function Head({
	refTextArea,
	setText,
	setSettings,
}: {
	refTextArea: React.RefObject<HTMLDivElement>
	setText: React.Dispatch<React.SetStateAction<string>>
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}) {
	return (
		<>
			<h1 className='text-4xl font-semibold mb-5'>Letters counter</h1>
			<div
				contentEditable='true'
				ref={refTextArea}
				className='bg-gray-900 rounded px-2 py-1 mb-5'
				onInput={(e) => {
					setText(e.currentTarget.innerText)
				}}
				name='text'
				id='text-area'
				cols='30'
				rows='10'></div>
		</>
	)
}
