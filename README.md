<h1 align="center">Useless Polymath</h1>

<p align="center">
  A React suite for practicing technical, mathematical, and cryptographic skills to impress absolutely nobody at parties.
  <br>
  <br>
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-purple?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Sass-1.83-pink?logo=sass" alt="Sass" />
  <img src="https://img.shields.io/badge/Dexie.js-4.0-blue" alt="Dexie.js" />
  <img src="https://img.shields.io/badge/Vitest-3.0-green?logo=vitest" alt="Vitest" />
</p>

<hr>

## Modules

The application is structured into isolated domains, each containing a **Tool** (calculator/converter), a **Practice** mode (drills), and a **Guide**.

### Chronometry
* **Doomsday Algorithm:** Calculate the day of the week for any date mentally.
* **Time Zones:** Offset calculations and UTC conversions.
* **Moon Phases:** Algorithmic calculation of the moon's age (0-29).
* **Calendar Ordinals:** Day-of-year calculations.

### Logic & Electronics
* **Binary/Hex:** Base conversion drills (Decimal ↔ Binary ↔ Hex).
* **Bitwise Operations:** Visualizing AND, OR, XOR, NOT, and bit shifting.
* **Resistor Codes:** Reading 4-band and 5-band electronic resistors.
* **Roman Numerals:** Standard and non-standard conversion logic.

### Cryptography
* **Ciphers:** Caesar Cipher (ROT-N).
* **Encodings:** Morse Code, Braille, Semaphore flags.
* **NATO Alphabet:** Phonetic spelling drills.

### Networks
* **Subnetting:** IPv4 CIDR, Network ID, and Broadcast address calculations.
* **Storage Units:** Bit/Byte conversion (Base 2 vs Base 10).
* **Color Theory:** RGB to Hex conversion logic.
* **ASCII:** Character code lookups.

### Algorithms & Science
* **Validation:** Luhn Algorithm (Credit Cards) and EAN-13 (Barcodes).
* **Science:** Periodic Table data and Thermodynamics (C/F/K) conversion.
* **Financial:** Rule of 72 (Interest rate doubling).

## Technical Stack

* **Core:** React 19, TypeScript, Vite.
* **State/Persistence:** [Dexie.js](https://dexie.org/) (IndexedDB wrapper) for persisting user statistics and progress.
* **Styling:** SCSS Modules (`*.module.scss`) for component-scoped styles.
* **Localization:** `i18next` with lazy-loading backends (English, Spanish, Italian).
* **Linting:** ESLint (Flat Config).
