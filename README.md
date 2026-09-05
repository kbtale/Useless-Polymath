# Useless Polymath

https://github.com/user-attachments/assets/08d9f525-e185-4c3d-8a02-507535352181

🔗 **[Live Demo](https://useless-polymath.carlosblog.com)**

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vite.dev/)
[![Sass](https://img.shields.io/badge/Sass-1.103-pink?logo=sass)](https://sass-lang.com/)
[![i18next](https://img.shields.io/badge/i18next-26-green)](https://www.i18next.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-160%2B-green)](https://github.com/kbtale/Useless-Polymath/actions)

## What is Useless Polymath?

A React suite of 24 interactive tools for practicing mental math, base conversions, ciphers, and technical systems. Every module ships as a visualizer, a practice drill with persistent streak tracking, and a markdown-rendered reference guide, in 3 languages and 4 visual themes.

## Features

- 24 interactive modules across 7 domains.
- 3 modes per module: Visualizer, Practice, and Guide.
- Persistent streak tracking with high scores.
- 4 visual themes (Mono, Wellfound, Ori, Motherduck).
- 3 languages (English, Spanish, Italian).
- Lazy-loaded code splitting (90+ discrete chunks).
- Hash-based URL routing with deep linking.
- Fully responsive with a mobile sidebar.

## Modules

The application is structured into the following domains:

| Domain | Modules | Count |
| :--- | :--- | :--- |
| Chronometry | Doomsday Algorithm, Time Zones, Moon Phases, Calendar Ordinals | 4 |
| Logic | Binary, Hexadecimal, Bitwise Operations, Roman Numerals, Rule of 72, EAN-13, Luhn Algorithm | 7 |
| Cryptography | Caesar Cipher, Morse Code, NATO Alphabet, Braille, Semaphore | 5 |
| Science | Periodic Table, Thermodynamics | 2 |
| Electronics | Resistor Codes | 1 |
| Games | Card Counting | 1 |
| Networks | Subnetting, Storage Units, Color Theory, ASCII | 4 |

Each module supports:

1. **Visualizer / Tool**: An interactive utility.
2. **Practice**: Practice drills with persistent streak recording.
3. **Guide**: Markdown-rendered reference manuals.

## Architecture

- **Core Framework**: React 19, TypeScript 5.9, Vite 7.
- **Styling**: SCSS Modules (`*.module.scss`) with 4 token-driven themes via CSS custom properties.
- **Internationalization**: i18next with HTTP backend and per-module namespace lazy loading (`en`/`es`/`it`).
- **Testing**: Vitest with 160+ tests across all domain logic.
- **CI/CD**: GitHub Actions quality gates with GitHub Pages deployment.
- **Linting**: Biome (replaces ESLint and Prettier).

## Getting Started

### Installation

```bash
npm install --ignore-scripts
```

### Development Server

Start the local developer environment with:

```bash
npm run dev
```

### Production Build

Compile and validate type-safety before bundling:

```bash
npm run build
```

## Contributing

Contributions are welcome. Read the [contribution guidelines](CONTRIBUTING.md) before opening an issue or pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file.