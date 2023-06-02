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
	return (
		<div className='text-infos'>
			<table>
				<tr>
					<td>Words</td> <td>{wordsAmount}</td>
				</tr>
				<tr>
					<td>Letters</td> <td>{lettersAmount}</td>
				</tr>
				<tr>
					<td>Special Characters</td> <td>{specialCharAmount}</td>
				</tr>
			</table>
		</div>
	)
}
