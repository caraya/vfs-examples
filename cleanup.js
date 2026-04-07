import { create, SqliteProvider } from '@platformatic/vfs';

const provider = new SqliteProvider('/tmp/test-vfs.db');
const vfs = create(provider);
let isMounted = false;

try {
  vfs.mount('/app');
  isMounted = true;
  // test or script logic
  console.log('/app mounted successfully');
} finally {
  if (isMounted) vfs.unmount();
  provider.close();
  console.log('VFS closed');
}
