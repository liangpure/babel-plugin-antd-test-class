import { transformFileSync } from '@babel/core';
import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import plugin from '../src';

describe('index', () => {
  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);

  fixtures.map(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');

    it(`should work with ${caseName}`, () => {
      const actual = function () {
        return transformFileSync(actualFile, {
          presets: ['@babel/preset-react'],
          plugins: [plugin],
        }).code;
      }();

      const expected = readFileSync(expectedFile, 'utf-8');
      expect(actual.trim()).toEqual(expected.trim());
    });
  });
});
