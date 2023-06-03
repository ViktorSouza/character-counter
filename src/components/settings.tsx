import Checkbox from './checkbox'
import { ISettings, ISortMethods } from '../types/ISettings'
import { Options } from './Options'
function Settings({
	settings,
	setSettings,
}: {
	settings: ISettings
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}) {
	const sortMethods = [
		'SMALLEST',
		'NEWEST',
		'OLDEST',
		'ALPHABETIC',
		'BIGGEST',
	] as ISortMethods[]
	const checkOptions: { title: string; option: keyof ISettings }[] = [
		{
			title: 'Ignore Case',
			option: 'ignoreCase',
		},
		{
			title: 'Ignore Special Chars',
			option: 'ignoreSpecialChars',
		},
		{
			title: 'Ignore Spaces',
			option: 'ignoreSpaces',
		},
	]
	return (
		<div className='peer-focus-within:block focus-within:block group-focus-within:block focus:block hover:block peer-focus-visible:block peer-focus:block bg-gray-900 top-10 hidden px-2 py-1 rounded absolute'>
			<div className='flex justify-between items-center'>
				<h2 className=''>Sort</h2>
				<div className='setting'>
					<Options
						title='Sort'
						options={sortMethods.map((method) => ({
							name: method.toLowerCase(),
							onClick() {
								setSettings((current) => ({
									...current,
									sortMethod: method,
								}))
							},
						}))}
					/>
				</div>
			</div>

			{checkOptions.map((option) => (
				<div
					className='flex justify-between items-center'
					key={option.title}>
					<h2 className='setting-name'>{option.title}</h2>
					<div className='setting'>
						<Checkbox
							isChecked={!!settings[option.option]}
							setSettings={setSettings}
							propName={option.option}
						/>
					</div>
				</div>
			))}
		</div>
	)
}
const sortMethods = ['Smallest', 'Biggest', 'Newest', 'Oldest', 'Alphabetic']
export default Settings
