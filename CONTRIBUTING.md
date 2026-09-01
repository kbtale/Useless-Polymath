# Contributing to Useless Polymath

Thank you for considering contributing to Useless Polymath. This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Install dependencies with `npm install --ignore-scripts`.
4. Start the development server with `npm run dev`.

## Code Standards

- Biome is the single linter and formatter. Run `npm run check` before every commit.
- Code must be self-documenting. Express intent through precise naming of functions, variables, and types. Do not add conversational, tutorial, or obvious comments. The only exception is a mathematical formula citation when the underlying domain equation cannot be inferred from clean variable names.

## Commit Conventions

Use the [Conventional Commits](https://www.conventionalcommits.org/) specification with these types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `ci`, `a11y`, `style`. Keep each commit atomic and single-purpose.

## Pull Request Process

- Target `master` as the base branch.
- All automated checks must pass: `npm run check`, `npm run test`, and `npm run build`.
- Include `logic.test.ts` unit tests for any logic change.
- Ensure the change is covered by the CI quality gates workflow.

## Testing

- Run the full suite with `npm run test`.
- Add a `logic.test.ts` file for any new module logic, following the existing module test patterns.

## Internationalization

- All user-facing strings must use i18n translation keys. Never hardcode display text in components.
- Add every new key to all 3 locales: `en`, `es`, and `it`.

## Styling

- Use SCSS modules for component styling. Prefer design system variables from `src/styles/_variables.scss`.
- No inline styles except computed dynamic values (for example, a background color derived from state).