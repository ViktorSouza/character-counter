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
			if (letter === ' ' && !ignoreSpaces) return
			if (/[\n\r\s\t]+/g.test(letter) && ignoreSpaces) return
			if (ignoreSpecialChars && !/^[\w&.-]+$/.test(letter)) return
			lettersCount[letter] = (Number(lettersCount[letter]) || 0) + 1
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

	return (
		<div
			className={`bg-gray-950 overflow-auto full pl-3 col-span-6 h-[${
				info.length * 80
			}px]`}>
			<Bar
				data={{
					labels: fillArrayUntilLength(
						info.map((letter) =>
							!/[\n\r\s\t]+/g.test(letter[0]) ? letter[0] : '[space]',
						),
						15,
					),

					datasets: [
						{
							label: 'Letters',
							data: info.map((a) => a[1]),
							borderRadius: 5,
							barThickness: 'flex',
							maxBarThickness: 40,
							backgroundColor: info.map(
								(a) => `hsl(${a[0].charCodeAt(0) * 10},50%,50%)`,
							),
						},
					],
				}}
				options={{
					indexAxis: 'y' as const,

					color: '#123399',
					animation: {
						duration: 1000, // Total duration of the race animation
					},
					elements: {
						bar: {
							borderWidth: 2,
						},
					},
					responsive: true,
					resizeDelay: 100,
					maintainAspectRatio: false,

					scales: {
						y: {
							grid: { color: '#0000' },

							beginAtZero: true,
						},
					},
				}}></Bar>
		</div>
	)
}
function fillArrayUntilLength(array: unknown[], desiredLength: number) {
	if (array.length >= desiredLength) {
		return array // No need to fill the array further
	}

	const remainingLength = desiredLength - array.length
	const emptyValues = Array(remainingLength).fill('')

	return array.concat(emptyValues)
}
