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
	return (
		<div className='group-focus-within:block group-focus-visible:block group-focus:block bg-gray-900 top-10 hidden px-2 py-1 rounded absolute'>
			<table className=''>
				<tr>
					<th className=''>Sort</th>
					<th className='setting'>
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
					</th>
				</tr>
				<tr>
					<th className='setting-name'>Ignore spaces</th>
					<th className='setting'>
						<Checkbox
							isChecked={settings.ignoreSpaces}
							setSettings={setSettings}
							propName={'ignoreSpaces'}
						/>
					</th>
				</tr>
				<tr>
					<th className='setting-name'>Ignore case</th>
					<th className='setting'>
						<Checkbox
							isChecked={settings.ignoreCase}
							setSettings={setSettings}
							propName='ignoreCase'
						/>
					</th>
				</tr>
				<tr>
					<th className='setting-name'>Ignore special characters</th>
					<th className='setting'>
						<Checkbox
							isChecked={settings.ignoreSpecialChars}
							setSettings={setSettings}
							propName='ignoreSpecialChars'
						/>
					</th>
				</tr>
			</table>
		</div>
	)
}
const sortMethods = ['Smallest', 'Biggest', 'Newest', 'Oldest', 'Alphabetic']
export default Settings
