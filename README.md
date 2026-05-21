# @tammergard/roman

Convert to and from roman numerals.

## Installation

```bash
# npm
npm install @tammergard/roman

# pnpm
pnpm add @tammergard/roman

# bun
bun add @tammergard/roman
```

## Usage

```ts
import { fromRoman, pattern, toRoman } from "@tammergard/roman"

toRoman(123) // "CXXIII"
fromRoman("CXXIII") // 123

pattern.test("MMXXIV") // true
pattern.test("VIIII") // false
```

## API

### `toRoman(arabic: number): string`

Converts an integer in the range `1`–`3999` to a roman numeral. Throws if the
input is not a number, is `0`, is negative, is a decimal, or is `4000` or
greater.

### `fromRoman(roman: string): number`

Parses a roman numeral and returns its arabic value. Throws if the input is
not a string or not a valid roman numeral.

### `pattern: RegExp`

The regular expression used to validate roman numerals (`1`–`3999`).

## License

MIT
