---
"@tammergard/roman": minor
---

Tighten roman numeral validation and migrate source to TypeScript.

- `fromRoman` now rejects `MMMM` and the empty string (previously accepted as
  `4000` and treated as valid input respectively).
- Source migrated to TypeScript; published output now lives under `dist/`.
  Consumers using the package via `import` continue to work unchanged thanks
  to the `exports` field.
- `engines.node` is now `>=24`.
