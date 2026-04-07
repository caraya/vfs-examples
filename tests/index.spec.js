import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { create } from '@platformatic/vfs';

test.describe('file handler', () => {
  let vfs;

  test.beforeEach(() => {
    vfs = create();
    vfs.writeFileSync('/config.json', JSON.stringify({ debug: true }));
    vfs.mount('/data');
  });

  test.afterEach(() => {
    vfs.unmount();
  });

  test('reads and parses config', () => {
    const config = JSON.parse(fs.readFileSync('/data/config.json', 'utf8'));
    expect(config.debug).toBe(true);
  });

  test('handles missing files gracefully', () => {
    expect(() => {
      fs.readFileSync('/data/missing.json');
    }).toThrow(/ENOENT/);
  });
});