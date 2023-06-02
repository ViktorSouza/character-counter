import { ISettings } from '../types/ISettings'
export default function Checkbox({
	isChecked,
	setSettings,
	propName,
}: {
	isChecked: boolean
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
	propName: string
}) {
	return (
		<div
			className='h-5 w-5 rounded-full'
			onClick={() =>
				setSettings((oldValue) => {
					return { ...oldValue, [propName]: !oldValue[propName] }
				})
			}
			style={{ background: isChecked ? '#00ddcc' : '#ee1040' }}></div>
	)
}
