import React, { useState } from 'react'

export function Options({
	options = [],
	title = '',
}: {
	options: { name: string; onClick: () => void }[]
	title: string
}) {
	const [isOpened, setIsOpened] = useState(true)
	const [selected, setSelected] = useState<string | null | undefined>(undefined)
	return (
		<div className='relative w-min group/options'>
			<button
				className='p-2 py-1 rounded-lg border border-gray-800 flex justify-center gap-1 items-baseline peer whitespace-nowrap '
				onClick={() => {
					setIsOpened(!isOpened)
				}}>
				{selected ?? title}
				{/* <i className={`bi bi-chevron-${isOpened ? 'up' : 'down'}`}></i> */}
				<i
					className={`bi bi-chevron-up hidden group-focus-within/options:inline`}></i>
				<i
					className={`bi bi-chevron-down  group-focus-within/options:hidden`}></i>
			</button>

			<div className='peer-focus:flex focus:flex hover:flex hidden absolute z-10 bg-gray-800 dark:shadow-none shadow-lg  w-16 right-0 mt-1 rounded-lg overflow-y-auto max-h-56 min-w-max  flex-col'>
				{options.map((option) => (
					<button
						key={option.name}
						onClick={() => {
							setSelected(option.name)
							option.onClick()
							setIsOpened(false)
						}}
						className='hover:bg-slate-700 rounded outline-none focus:bg-slate-700  transition-all py-1 px-2 '>
						{option.name}
					</button>
				))}
			</div>
		</div>
	)
}
