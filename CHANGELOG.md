# @tammergard/roman

## 1.1.1

### Patch Changes

- 5d490bf: Use `devEngines` instead of `engines` for the Node version requirement, so it applies to development only and no longer constrains consumers of the package.

## 1.1.0

### Minor Changes

- 9f95eb7: Tighten roman numeral validation and migrate source to TypeScript.
  - `fromRoman` now rejects `MMMM` and the empty string (previously accepted as
    `4000` and treated as valid input respectively).
  - Source migrated to TypeScript; published output now lives under `dist/`.
    Consumers using the package via `import` continue to work unchanged thanks
    to the `exports` field.
  - `engines.node` is now `>=24`.

## 1.0.2

### Patch Changes

- aa325c1: Export pattern.
- 261ac43: Export in declaration file.

## 1.0.1

### Patch Changes

- f7760e9: Turn into ESM package.
- f7760e9: Include declaration file.
