import { create, SqliteProvider } from '@platformatic/vfs';

const provider = new SqliteProvider('/tmp/test-vfs.db');
const vfs = create(provider);

try {
  vfs.mount('/app');
  // test or script logic
	console.log('/app mounted successfully');
} finally {
  if (vfs.mounted) vfs.unmount();
  provider.close();
	console.log('VFS Closed')
}