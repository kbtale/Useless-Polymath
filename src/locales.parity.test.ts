import { describe, expect, it } from 'vitest';

const enModules = import.meta.glob<Record<string, unknown>>('../public/locales/en/*.json', {
  eager: true,
  import: 'default',
});
const esModules = import.meta.glob<Record<string, unknown>>('../public/locales/es/*.json', {
  eager: true,
  import: 'default',
});
const itModules = import.meta.glob<Record<string, unknown>>('../public/locales/it/*.json', {
  eager: true,
  import: 'default',
});

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getKeys(obj[key] as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

describe('Localization Key Parity', () => {
  for (const enPath of Object.keys(enModules)) {
    const filename = enPath.split('/').pop() ?? '';
    const namespace = filename.replace('.json', '');

    it(`matches keys between en, es, and it for namespace: ${namespace}`, () => {
      const enContent = enModules[enPath] ?? {};
      const esPath = `../public/locales/es/${filename}`;
      const itPath = `../public/locales/it/${filename}`;

      const esContent = esModules[esPath] ?? {};
      const itContent = itModules[itPath] ?? {};

      const enKeys = getKeys(enContent);
      const esKeys = getKeys(esContent);
      const itKeys = getKeys(itContent);

      const missingInEs = enKeys.filter((k) => !esKeys.includes(k));
      const missingInIt = enKeys.filter((k) => !itKeys.includes(k));

      expect(missingInEs, `Missing in ES (${namespace}): ${missingInEs.join(', ')}`).toEqual([]);
      expect(missingInIt, `Missing in IT (${namespace}): ${missingInIt.join(', ')}`).toEqual([]);
    });
  }
});
