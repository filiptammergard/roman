const ROMAN_NUMERALS: ReadonlyArray<readonly [number, string]> = [
	[1000, "M"],
	[900, "CM"],
	[500, "D"],
	[400, "CD"],
	[100, "C"],
	[90, "XC"],
	[50, "L"],
	[40, "XL"],
	[10, "X"],
	[9, "IX"],
	[5, "V"],
	[4, "IV"],
	[1, "I"],
]

export const pattern =
	/^(?=.)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

export function toRoman(arabic: number): string {
	if (typeof arabic !== "number") {
		throw new Error(`input needs to be of type number, got ${typeof arabic}`)
	}
	if (arabic === 0) {
		throw new Error("0 cannot be represented in roman numerals")
	}
	if (arabic < 0) {
		throw new Error("negative numbers cannot be represented in roman numerals")
	}
	if (arabic >= 4000) {
		throw new Error(
			"numbers bigger than 3,999 cannot be represented in roman numerals",
		)
	}
	if (!Number.isInteger(arabic)) {
		throw new Error("decimal numbers cannot be represented in roman numerals")
	}
	let result = ""
	let remaining = arabic
	for (const [value, symbol] of ROMAN_NUMERALS) {
		while (remaining >= value) {
			result += symbol
			remaining -= value
		}
	}
	return result
}

export function fromRoman(roman: string): number {
	if (typeof roman !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof roman}`)
	}
	if (!pattern.test(roman)) {
		throw new Error("input is not a valid roman numeral")
	}
	let result = 0
	let remaining = roman
	for (const [value, symbol] of ROMAN_NUMERALS) {
		while (remaining.startsWith(symbol)) {
			result += value
			remaining = remaining.slice(symbol.length)
		}
	}
	return result
}
