import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth({
  session: {
    cookieDomain: ".geomart.co.uk", // ✅ share session across subdomains
    cookieSameSite: "none",         // ✅ allow cross-origin usage
    cookieSecure: true,             // ✅ required for production
  },

  login: async (req, res) => {
    try {
      return await handleAuth()(req, res); // this stays the same
    } catch (error) {
      console.error("Auth0 Login Error:", error);
      res.status(error.status || 500).json({ error: error.message });
    }
  }
});
