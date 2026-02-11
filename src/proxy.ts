export { auth as proxy } from '@/lib/auth';

export const proxyConfig = {
  matcher: ['/admin', '/api/palette'],
};
