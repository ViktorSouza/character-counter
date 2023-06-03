export default function TextInfos({
	refTextArea,
	text,
	sortMethod,
	ignoreCase,
	ignoreSpaces,
}) {
	const textSplittedNoSpace = text.split('')
	const wordsAmount = text.split(' ').length
	const lettersAmount = textSplittedNoSpace.filter((letter: string) =>
		/^[\w&.-]+$/.test(letter),
	).length
	const specialCharAmount = textSplittedNoSpace.filter(
		(letter: string) => !/^[\w&.-]+$/.test(letter) && letter !== ' ',
	).length
	const options = [
		{
			title: 'Words',
			value: wordsAmount,
		},
		{
			title: 'Letters',
			value: lettersAmount,
		},
		{
			title: 'Special Characters',
			value: specialCharAmount,
		},
	]
	return (
		<div className='w-48'>
			{options.map((option) => {
				return (
					<div
						className='flex justify-between'
						key={option.title}>
						<h2>{option.title}</h2>
						<span>{option.value}</span>
					</div>
				)
			})}
		</div>
	)
}
