# Useless Polymath

A React suite for practicing mental math, base conversions, ciphers, and technical systems.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vite.dev/)
[![Sass](https://img.shields.io/badge/Sass-1.83-pink?logo=sass)](https://sass-lang.com/)
[![i18next](https://img.shields.io/badge/i18next-24-green)](https://www.i18next.com/)

## Modules

The application is structured into the following domains:

- **Chronometry**: Doomsday Algorithm, Time Zones, Moon Phases, Calendar Ordinals.
- **Logic & Electronics**: Binary, Hexadecimal, Bitwise Operations, Resistor Codes, Roman Numerals.
- **Cryptography**: Caesar Cipher, Morse Code, Braille, Semaphore.
- **Networks**: Subnetting, Storage Units, Color Theory, ASCII.
- **Science & Systems**: Luhn Algorithm, EAN-13, Periodic Table, Thermodynamics, Rule of 72.

Each module supports:
1. **Visualizer / Tool**: An interactive utility.
2. **Practice**: Practice drills with persistent streak recording.
3. **Guide**: Markdown-rendered reference manuals.

## Project Setup

### Installation

```bash
npm install
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

## Architecture

- **Core Framework**: React 19, TypeScript, Vite.
- **Styling**: SCSS Modules (`*.module.scss`) using a theme style switcher (Mono, Wellfound, Ori, Motherduck).
- **Internationalization**: Localized translations (`en`/`es`/`it`) managed through `i18next`.
