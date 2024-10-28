// src/pages/_app.tsx
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
