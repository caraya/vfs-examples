import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { RealFSProvider, create } from '@platformatic/vfs';

const sandboxRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'vfs-sandbox-'));
const sandboxFS = create(new RealFSProvider(sandboxRoot));

// RealFSProvider writes to the host filesystem under sandboxRoot, so parent
// directories must exist before writing nested files.
sandboxFS.mkdirSync('/notes', { recursive: true });
sandboxFS.writeFileSync('/notes/hello.txt', 'inside sandbox');
sandboxFS.mount('/app');

const virtualText = fs.readFileSync('/app/notes/hello.txt', 'utf8');
console.log(virtualText); // 'inside sandbox'

try {
  sandboxFS.readFileSync('/../../etc/passwd', 'utf8');
} catch (err) {
  console.log(err.code); // 'EINVAL' or 'EPERM' depending on platform
}

sandboxFS.unmount();