export const encrypt = (text: string, shift: number): string => {
  const s = ((shift % 26) + 26) % 26; // Normalize shift to 0-25
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpper = char === char.toUpperCase();
    const base = isUpper ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + s) % 26) + base);
  });
};

export const decrypt = (text: string, shift: number): string => {
  return encrypt(text, -shift);
};

export const ROT13 = (text: string): string => encrypt(text, 13);
