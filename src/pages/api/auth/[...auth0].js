import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: async (req, res) => {
    try {
      return await handleAuth()(req, res);
    } catch (error) {
      console.error("Auth0 Login Error:", error);
      res.status(error.status || 500).json({ error: error.message });
    }
  }
});
