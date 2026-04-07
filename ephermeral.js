import fs from 'node:fs';
import { create } from '@platformatic/vfs';

// Simulate a runtime with no writable disk by keeping everything in memory.
const vfs = create();
vfs.writeFileSync('/config.json', JSON.stringify({
  apiBaseUrl: 'https://api.example.com',
  featureFlag: true,
}));
vfs.writeFileSync('/bootstrap.mjs', `
  import fs from 'node:fs';
  const cfg = JSON.parse(fs.readFileSync('/runtime/config.json', 'utf8'));
  export default () => cfg;
`);

vfs.mount('/runtime');

// App code still uses normal fs and import semantics.
const { default: readConfig } = await import('/runtime/bootstrap.mjs');
console.log(readConfig());
// { apiBaseUrl: 'https://api.example.com', featureFlag: true }

vfs.unmount();