import { create } from '@platformatic/vfs';

// Create an in-memory VFS
const vfs = create();

// Write files relative to the provider root. After mounting at /app,
// this file becomes visible at /app/index.mjs.
vfs.writeFileSync('/index.mjs', 'export default "hello world";');

// Mount at /app — now import sees virtual files
vfs.mount('/app');

// This loads from the VFS, not disk
const mod = await import('/app/index.mjs');
console.log(mod.default); // 'hello world'

// Inspect with fs functions
console.log(vfs.existsSync('/app/index.mjs')); // true
console.log(vfs.readdirSync('/app')); // ['index.mjs']

// Unmount to restore normal behavior
vfs.unmount();