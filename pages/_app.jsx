import { Provider as AuthProvider } from 'next-auth/client';

import '../styles.css';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;

  return (
    <AuthProvider options={{ site: process.env.SITE }} session={session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
