import { transformFileSync } from '@babel/core';
import { join } from 'path';
import { readdirSync } from 'fs';
import plugin from '../src';

describe('index', () => {
  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);
  fixtures = fixtures.filter(caseName => caseName.indexOf('FormItem33') === -1)
  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');

    it(`should work with ${caseName}`, () => {
      const actual = transformFileSync(actualFile, {
        presets: ['@babel/preset-react'],
        plugins: [plugin],
      }).code;

      // const expected = readFileSync(expectedFile, 'utf-8');
      const expected = transformFileSync(expectedFile, {
        presets: ['@babel/preset-react']
      }).code;
      expect(actual.trim()).toEqual(expected.trim());
    });
  });
});
