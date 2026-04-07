import { create } from '@platformatic/vfs';

const vfs = create();

// Generate a module dynamically
const moduleName = 'helpers';
const moduleCode = `
  export const greet = (name) => \`Hello, \${name}!\`;
`;

vfs.writeFileSync(`/${moduleName}.mjs`, moduleCode);
vfs.mount('/lib');

// Load it like a real module
const helpers = await import(`/lib/${moduleName}.mjs`);
console.log(helpers.greet('World')); // 'Hello, World!'

vfs.unmount();