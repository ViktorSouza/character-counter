export type ISortMethods =
	| 'SMALLEST'
	| 'NEWEST'
	| 'OLDEST'
	| 'ALPHABETIC'
	| 'BIGGEST'

export type ISettings = {
	sortMethod: ISortMethods
	ignoreChars: boolean
	ignoreSpaces: boolean
	ignoreCase: boolean
	isSettingsOpen: boolean
	ignoreSpecialChars: boolean
}
