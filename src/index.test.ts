import { describe, expect, it } from "vitest"
import { fromRoman, pattern, toRoman } from "./index"

const KNOWN_PAIRS: ReadonlyArray<readonly [number, string]> = [
	[1, "I"],
	[2, "II"],
	[3, "III"],
	[4, "IV"],
	[5, "V"],
	[9, "IX"],
	[10, "X"],
	[14, "XIV"],
	[19, "XIX"],
	[40, "XL"],
	[49, "XLIX"],
	[50, "L"],
	[90, "XC"],
	[99, "XCIX"],
	[100, "C"],
	[400, "CD"],
	[444, "CDXLIV"],
	[500, "D"],
	[900, "CM"],
	[999, "CMXCIX"],
	[1000, "M"],
	[1994, "MCMXCIV"],
	[2024, "MMXXIV"],
	[3000, "MMM"],
	[3999, "MMMCMXCIX"],
]

describe("@tammergard/roman", () => {
	it("converts known pairs in both directions", () => {
		for (const [arabic, roman] of KNOWN_PAIRS) {
			expect(toRoman(arabic)).toBe(roman)
			expect(fromRoman(roman)).toBe(arabic)
		}
	})

	it("roundtrips every value from 1 to 3999", () => {
		for (let n = 1; n < 4000; n++) {
			expect(fromRoman(toRoman(n))).toBe(n)
		}
	})

	it("produces only valid roman numerals across the full range", () => {
		for (let n = 1; n < 4000; n++) {
			expect(pattern.test(toRoman(n))).toBe(true)
		}
	})

	it("throws on invalid roman input", () => {
		const message = "input is not a valid roman numeral"
		expect(() => fromRoman("")).toThrow(message)
		expect(() => fromRoman("A")).toThrow(message)
		expect(() => fromRoman("VIIII")).toThrow(message) // 9 is written as IX
		expect(() => fromRoman("XIIII")).toThrow(message) // 14 is written as XIV
		expect(() => fromRoman("IM")).toThrow(message) // 999 is written as CMXCIX
		expect(() => fromRoman("MMMM")).toThrow(message) // 4000 is out of range
	})

	it("throws on non-string roman input", () => {
		expect(() => fromRoman(123 as unknown as string)).toThrow(
			"input needs to be of type string, got number",
		)
	})

	it("throws on invalid arabic input", () => {
		expect(() => toRoman("123" as unknown as number)).toThrow(
			"input needs to be of type number, got string",
		)
		expect(() => toRoman(0)).toThrow(
			"0 cannot be represented in roman numerals",
		)
		expect(() => toRoman(-123)).toThrow(
			"negative numbers cannot be represented in roman numerals",
		)
		expect(() => toRoman(1.23)).toThrow(
			"decimal numbers cannot be represented in roman numerals",
		)
		expect(() => toRoman(4000)).toThrow(
			"numbers bigger than 3,999 cannot be represented in roman numerals",
		)
	})
})
