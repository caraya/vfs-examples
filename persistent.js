import { SqliteProvider, create } from '@platformatic/vfs';

// File-backed database
const provider = new SqliteProvider('/tmp/myfs.db');
const vfs = create(provider);

vfs.writeFileSync('/config/app.json', JSON.stringify({ port: 3000 }));
provider.close();
