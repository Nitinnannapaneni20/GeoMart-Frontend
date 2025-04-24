import { getSession } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  const session = await getSession(req, res);

  if (!session || !session.idToken) {
    return res.status(401).json({ error: 'No session' });
  }

  res.status(200).json({ token: session.idToken });
}
