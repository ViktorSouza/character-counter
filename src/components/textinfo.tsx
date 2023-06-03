import { ISortMethods } from '../types/ISettings'

export default function TextInfos({
	text,
	sortMethod,
	ignoreCase,
	ignoreSpaces,
}: {
	sortMethod: ISortMethods
	text: string
	ignoreCase: boolean
	ignoreSpaces: boolean
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
