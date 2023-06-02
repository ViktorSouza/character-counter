import { Ref, useEffect, useRef, useState } from 'react'
import { sortLetters } from './utils'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Infos({
	refTextArea,
	text,
	sortMethod,
	ignoreCase,
	ignoreSpaces,
	ignoreSpecialChars,
}: {
	refTextArea: React.RefObject<HTMLDivElement>
	text: string
	sortMethod: string
	ignoreCase: boolean
	ignoreSpaces: boolean
	ignoreChars: boolean
	ignoreSpecialChars: boolean
}) {
	const [info, setInfo] = useState<[string, number][]>(Object.entries({}))
	const [maxValue, setMaxValue] = useState(0)
	const [letterHighlighted, setLetterHighlighted] = useState('')
	const currentLetterHighlighted = useRef(letterHighlighted)
	useEffect(() => {
		const lettersCount: Record<string, number> = {}

		let modifiedText = text
		if (ignoreCase) {
			modifiedText = text.toLowerCase()
		}
		modifiedText.split('').forEach((letter) => {
			// if (/[\n\r\s\t]+/g.test(letter) && ignoreSpaces) return
			// if (ignoreSpecialChars && !/^[\w&.]+$/.test(letter))
			return (lettersCount[letter] = (Number(lettersCount[letter]) || 0) + 1)
		})
		let lettersInfo = Object.entries(lettersCount)
		lettersInfo = sortLetters(sortMethod, lettersInfo)
		const maxNumber = Math.max(...lettersInfo.map((letter) => letter[1]))
		console.log(lettersInfo)
		setMaxValue(maxNumber)
		setInfo(lettersInfo)
	}, [text, ignoreSpaces, sortMethod, ignoreCase, ignoreSpecialChars])
	useEffect(() => {
		if (refTextArea.current === null) return
		refTextArea.current.innerHTML = ''
		text.split('').forEach((letter) => {
			if (refTextArea.current === null) return
			if (letterHighlighted) {
				if (letterHighlighted === letter) {
					refTextArea.current.innerHTML += `<span style='color:cyan;'>${letter}</span>`
				} else {
					refTextArea.current.innerHTML += letter
				}
			} else {
				refTextArea.current.innerHTML += letter
			}
		})
		setEndOfContenteditable(refTextArea)
	}, [letterHighlighted])
	return (
		<table className='border-separate border-spacing-2'>
			<thead>
				<tr>
					<th>Letter</th> <th>Amount</th>
				</tr>
			</thead>
			<tbody className=''>
				{info.map((letter) => {
					return (
						<tr
							key={letter[0]}
							className='w-full odd:bg-gray-900/30'>
							<td
								onClick={() => {
									currentLetterHighlighted.current = letter[0]
									setLetterHighlighted(letter[0])
								}}
								onMouseLeave={() =>
									setTimeout(() => {
										if (currentLetterHighlighted.current !== letterHighlighted)
											return setLetterHighlighted('')
									}, 500)
								}>
								{!/[\n\r\s\t]+/g.test(letter[0]) ? letter[0] : '[space]'}
							</td>
							<td className='relative w-96 h-6'>
								<div
									className='h-full bg-slate-800 transition-all  duration-500 relative top-0 rounded'
									style={{ width: `${(letter[1] / maxValue) * 100}%` }}>
									<span className='z-10 absolute right-2'>{letter[1]}</span>
								</div>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
function setEndOfContenteditable(
	contentEditableElement: React.RefObject<HTMLDivElement>,
) {
	let range, selection
	if (contentEditableElement.current === null) return

	if (document.createRange) {
		//Firefox, Chrome, Opera, Safari, IE 9+
		range = document.createRange() //Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement.current)
		//Select the entire contents of the element with the range
		range.collapse(false)
		//collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection()
		//get the selection object (allows you to change selection)
		selection?.removeAllRanges()
		//remove any selections already made
		selection?.addRange(range) //make the range you have just created the visible selection
	} else if (document.selection) {
		//IE 8 and lower
		range = document.body.createTextRange() //Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement) //Select the entire contents of the element with the range
		range.collapse(false) //collapse the range to the end point. false means collapse to end rather than the start
		range.select() //Select the range (make it the visible selection
	}
}
