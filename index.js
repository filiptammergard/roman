// @ts-check

export const pattern =
	/^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/

const romanArabicMap = new Map([
	["M", 1000],
	["D", 500],
	["C", 100],
	["L", 50],
	["X", 10],
	["V", 5],
	["I", 1],
])

/**
 * @param {number} arabic An arabic number.
 * @returns {string} The input converted to roman numeral.
 */
export function toRoman(arabic) {
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
	if (Math.floor(arabic) !== arabic) {
		throw new Error("decimal numbers cannot be represented in roman numerals")
	}
	let roman = ""
	let acc = arabic
	const values = [...romanArabicMap.values()]
	const keys = [...romanArabicMap.keys()]
	values.forEach((value, index, array) => {
		while (acc >= value) {
			roman += keys[index]
			acc -= value
		}
		array.slice(index + 1).forEach((subractor, i, a) => {
			if (subractor.toString().startsWith("1") && acc >= value - subractor) {
				roman += keys[index + 1 + i] + keys[index]
				acc -= value - subractor
			}
		})
	})
	return roman
}

/**
 * @param {string} roman A roman numeral.
 * @returns {number} The input converted to arabic number.
 */
export function fromRoman(roman) {
	if (typeof roman !== "string") {
		throw new Error(`input needs to be of type string, got ${typeof roman}`)
	}
	if (!pattern.test(roman)) {
		throw new Error("input is not a valid roman numeral")
	}
	const split = roman.split("").map((r) => romanArabicMap.get(r))
	let arabic = 0
	split.forEach((value, index, array) => {
		if (!value) {
			return
		}
		const nextValue = array[index + 1]
		if (nextValue && nextValue > value) {
			arabic -= value
		} else {
			arabic += value
		}
	})
	return arabic
}
