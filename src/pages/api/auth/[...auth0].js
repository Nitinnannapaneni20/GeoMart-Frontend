
import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleAuth({
        authorizationParams: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid profile email',
        }
      })(req, res);
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  }
});
