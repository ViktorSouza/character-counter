import './settings.css'
import Checkbox from '../checkbox/checkbox'
import { useState } from 'react'
function Settings({ settings, setSettings }) {
	console.table(settings)
	return (
		<div className='settings'>
<div style={{
	display:'flex'
	,justifyContent:'space-between'
	,alignItems:'center'
}}>
			<h1>Settings</h1>
			<span onClick={()=>setSettings(oldValues=>{
				return{...oldValues, isSettingsOpen:!oldValues.isSettingsOpen}
			})}>X</span>
</div>
			<table className='settings-table'>
				<tr>
					<th className='setting-name'>Include spaces</th>
					<th className='setting'>
						<Checkbox
							isChecked={settings.includeSpaces}
							setSettings={setSettings}
							propName={'includeSpaces'}
						/>
					</th>
				</tr>
				<tr>
					<th className='setting-option'>Sort</th>
					<th className='setting'>
						<select
							defaultValue={
								settings.sortMethod?.charAt(0) +
								settings.sortMethod?.slice(1).toLowerCase()
							}
							onChange={(e) => {
								setSettings((sett) => {
									return {
										...sett,
										sortMethod:
											e.target.value.toUpperCase(),
									}
								})
							}}
							name='sort-method'
							id='sort-method'
						>
							{sortMethods.map((method) => (
								<option value={method}>{method}</option>
							))}
						</select>
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
			</table>
		</div>
	)
}

const sortMethods = ['Smallest', 'Biggest', 'Newest', 'Oldest', 'Alphabetic']
export default Settings
