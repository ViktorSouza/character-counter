export function sortLetters(sortMethod, lettersInfo) {
	switch (sortMethod) {
		case 'BIGGEST':
			return lettersInfo.sort((letter1, letter2) =>
				letter1[1] < letter2[1] ? 1 : -1,
			)
		case 'SMALLEST':
			return lettersInfo.sort((letter1, letter2) =>
				letter1[1] < letter2[1] ? -1 : 1,
			)
		case 'NEWEST':
			return lettersInfo
		case 'OLDEST':
			return lettersInfo.reverse()
		case 'ALPHABETIC':
			return lettersInfo.sort()
		default:
			return lettersInfo
	}
}
