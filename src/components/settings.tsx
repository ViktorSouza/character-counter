import Checkbox from './checkbox'
import { ISettings } from '../types/ISettings'
import { Options } from './Options'
function Settings({
	settings,
	setSettings,
}: {
	settings: ISettings
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>
}) {
	return (
		<div className='group-focus-within:block bg-gray-900 top-10 hidden px-2 py-1 rounded absolute'>
			<table className=''>
				<tr>
					<th className=''>Sort</th>
					<th className='setting'>
						<Options
							title='Sort'
							options={Object.entries(settings).map((setting) => ({
								name: setting[0],
								onClick() {
									console.log('Hey')
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
