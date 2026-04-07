import { SqliteProvider, create } from '@platformatic/vfs';

// ... later, in a new process ...
const provider2 = new SqliteProvider('/tmp/myfs.db');
const vfs2 = create(provider2);

console.log(vfs2.readFileSync('/config/app.json', 'utf8'));
// Still there: { port: 3000 }

provider2.close();