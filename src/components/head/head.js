import React from 'react'
import './head.css'
export default function Head({ refTextArea, setText, setSettings }) {
	return (
		<>
			{' '}
			<h1>Letters counter</h1>
			<span></span>
			<div
				contentEditable='true'
				ref={refTextArea}
				className='text-area'
				onInput={(e) => {
					setText(e.target.innerText)
				}}
				name='text'
				id='text-area'
				cols='30'
				rows='10'
			></div>
			<button
				onClick={() =>
					setSettings((oldValue) => {
						return {
							...oldValue,
							isSettingsOpen: !oldValue.isSettingsOpen,
						}
					})
				}
				style={{ color: 'black' }}
			>
				Settings
			</button>
		</>
	)
}
