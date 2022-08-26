import './checkbox.css'
export default function Checkbox({ isChecked, setSettings, propName }) {
	return (
		<div
			className='checkbox-box'
			onClick={() =>
				setSettings((oldValue) => {
					return {
						...oldValue,
						[propName]: !oldValue[propName],
					}
				})
			}
			style={{ background: isChecked ? '#00ddcc' : '#ee1040' }}
		></div>
	)
}
