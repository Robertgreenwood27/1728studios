import { createClient } from '@sanity/client';

export default createClient({
  projectId: '6xz2sxrw',
  dataset: 'production',
  apiVersion: '2023-10-09',
  useCdn: false
});
