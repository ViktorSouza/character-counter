import { useEffect, useMemo, useState } from 'react'
import './infos.css'
import { sortLetters } from './utils.js'
export default function Infos({
	refTextArea,
	text,
	sortMethod,
	ignoreCase,
	includeSpaces,
}) {
	const [info, setInfo] = useState(Object.entries({}))
	const [maxValue, setMaxValue] = useState(0)
	const [letterHighlighted, setLetterHighlighted] = useState('')
	useEffect(() => {
		let lettersCount = {}
		let modifiedText = text
		if (ignoreCase) {
			modifiedText = text.toLowerCase()
		}
		modifiedText.split('').forEach((letter) => {
			if (letter === ' ' && !includeSpaces) return
			lettersCount[letter] = (Number(lettersCount[letter]) || 0) + 1
		})
		let lettersInfo = Object.entries(lettersCount)

		lettersInfo = sortLetters(sortMethod, lettersInfo)
		const maxNumber = Math.max(...lettersInfo.map((letter) => letter[1]))
		// console.table(lettersInfo)
		setMaxValue(maxNumber)
		setInfo(lettersInfo)
	}, [text, includeSpaces, sortMethod, ignoreCase])

	useEffect(() => {
		let firstTime = true
		if (firstTime) {
			refTextArea.current.innerHTML = ''
			firstTime = false
		}
		text.split('').forEach((letter) => {
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
		setEndOfContenteditable(refTextArea.current)
	}, [letterHighlighted])
	return (
		<table className='infos-table'>
			<thead>
				<tr>
					<th>Letter</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				{info.map((letter) => {
					return (
						<tr>
							<td
								onMouseEnter={() => {
									setLetterHighlighted(letter[0])
								}}
								onMouseLeave={() => setLetterHighlighted('')}
							>
								{letter[0] !== ' ' ? letter[0] : '[space]'}
							</td>
							<td>
								<span className='amount-text'>{letter[1]}</span>{' '}
								<div
									className='percentageDiv'
									style={{
										width: `${
											(letter[1] / maxValue) * 100
										}%`,
									}}
								></div>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

function setEndOfContenteditable(contentEditableElement) {
	var range, selection
	if (document.createRange) {
		//Firefox, Chrome, Opera, Safari, IE 9+
		range = document.createRange() //Create a range (a range is a like the selection but invisible)
		range.selectNodeContents(contentEditableElement) //Select the entire contents of the element with the range
		range.collapse(false) //collapse the range to the end point. false means collapse to end rather than the start
		selection = window.getSelection() //get the selection object (allows you to change selection)
		selection.removeAllRanges() //remove any selections already made
		selection.addRange(range) //make the range you have just created the visible selection
	} else if (document.selection) {
		//IE 8 and lower
		range = document.body.createTextRange() //Create a range (a range is a like the selection but invisible)
		range.moveToElementText(contentEditableElement) //Select the entire contents of the element with the range
		range.collapse(false) //collapse the range to the end point. false means collapse to end rather than the start
		range.select() //Select the range (make it the visible selection
	}
}