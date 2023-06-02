import { Ref, useEffect, useRef, useState } from 'react'
import { sortLetters } from './utils'
import 'chart.js/auto'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
	// const [letterHighlighted, setLetterHighlighted] = useState('')
	// const currentLetterHighlighted = useRef(letterHighlighted)
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
		setMaxValue(maxNumber)
		setInfo(lettersInfo)
	}, [text, ignoreSpaces, sortMethod, ignoreCase, ignoreSpecialChars])

	// useEffect(() => {
	// if (refTextArea.current === null) return
	// refTextArea.current.innerHTML = ''
	// text.split('').forEach((letter) => {
	// if (refTextArea.current === null) return
	// if (letterHighlighted) {
	// 	if (letterHighlighted === letter) {
	// 		refTextArea.current.innerHTML += `<span style='color:cyan;'>${letter}</span>`
	// 	} else {
	// 		refTextArea.current.innerHTML += letter
	// 	}
	// } else {
	// 	refTextArea.current.innerHTML += letter
	// }
	// )
	// }
	// setEndOfContenteditable(refTextArea)
	// }, [letterHighlighted, text, refTextArea])
	const sortedInfos = [...info].sort((a, b) => b[1] - a[1])
	console.log(sortedInfos)

	return (
		<div>
			<Bar
				data={{
					labels: fillArrayUntilLength(
						sortedInfos.map((a) => a[0]),
						20,
					),

					datasets: [
						{
							label: 'Letters',
							data: sortedInfos.map((a) => a[1]),
							borderRadius: 10,
							barThickness: 'flex',

							barPercentage: 1,
							maxBarThickness: 30,
							backgroundColor: sortedInfos.map(
								(a) => `hsl(${a[0].charCodeAt(0) * 10},50%,50%)`,
							),
						},
					],
				}}
				options={{
					indexAxis: 'y' as const,

					color: '#123399',
					elements: {
						bar: {
							borderWidth: 2,
						},
					},
					responsive: true,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}></Bar>
		</div>
	)
}
function setEndOfContenteditable(
	contentEditableElement: React.RefObject<HTMLDivElement>,
) {
	if (!contentEditableElement.current) return

	const range = document.createRange()
	const selection = window.getSelection()

	range.selectNodeContents(contentEditableElement.current)
	range.collapse(false)

	if (selection) {
		selection.removeAllRanges()
		selection.addRange(range)
	}
}

function fillArrayUntilLength(array: unknown[], desiredLength: number) {
	if (array.length >= desiredLength) {
		return array // No need to fill the array further
	}

	const remainingLength = desiredLength - array.length
	const emptyValues = Array(remainingLength).fill('')

	return array.concat(emptyValues)
}
