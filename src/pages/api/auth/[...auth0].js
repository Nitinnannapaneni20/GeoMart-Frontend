import { handleAuth, initAuth0 } from '@auth0/nextjs-auth0';

const auth0 = initAuth0({
  session: {
    cookieSecret: process.env.AUTH0_SECRET || 'supersecuresecret_change_this', // fallback for now
    cookieLifetime: 60 * 60 * 8, // 8 hours
    storeIdToken: true,
    storeAccessToken: true,
    storeRefreshToken: true,
    cookieSameSite: 'none',       // ✅ Allow cross-site cookies
    cookieSecure: true,           // ✅ Required for SameSite=None
  },
});

export default handleAuth(auth0);
