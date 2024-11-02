// pages/api/get-tokens.js
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  try {
    // Retrieve the Auth0 session
    const session = await getSession(req, res);

    if (!session) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    // Extract id_token and access_token
    const { idToken, accessToken } = session;

    // Log and return the tokens
    console.log("ID Token:", idToken);
    console.log("Access Token:", accessToken);

    res.status(200).json({ idToken, accessToken });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}
