import { describe, expect, it } from 'vitest';
import { parseSources, safeSource } from './chat';

describe('chat source safety', () => {
  it('allows only portfolio anchors, CV files and Omar GitHub sources', () => {
    for (const url of [
      '/#skills',
      '/Curriculo_Omar_Saliba.pdf',
      'https://github.com/OmarFLK/MAUA_IA',
    ]) {
      expect(safeSource(url)).toBe(true);
    }
    for (const url of [
      null,
      'javascript:alert(1)',
      '//evil.example',
      '/#skills\n',
      'https://github.com.evil.example/OmarFLK/test',
      'https://evil.example',
    ]) {
      expect(safeSource(url)).toBe(false);
    }
  });
  it('drops malformed or unsafe sources without breaking the conversation', () => {
    const source = { id: 'skills', title: 'Skills', url: '/#skills' };
    expect(parseSources([null, 1, {}, { ...source, url: 'javascript:alert(1)' }, source])).toEqual([
      source,
    ]);
    expect(parseSources(null)).toEqual([]);
    expect(parseSources(Array(100).fill(source))).toHaveLength(7);
  });
});
