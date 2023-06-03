import { ISettings } from '../types/ISettings'
export default function Checkbox({
	isChecked,
	setSettings,
	propName,
}: {
	isChecked: boolean
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
	propName: keyof ISettings
}) {
	return (
		<button
			onClick={() =>
				setSettings((oldValue) => {
					return { ...oldValue, [propName]: !oldValue[propName] }
				})
			}
			className='p-1 bg-gray-800 rounded-full'>
			<div
				className='h-4 w-4 rounded-full'
				style={{ background: isChecked ? '#00ddcc' : '#ee1040' }}></div>
		</button>
	)
}
