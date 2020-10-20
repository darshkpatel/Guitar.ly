import { Provider as AuthProvider } from 'next-auth/client';
import { Provider } from 'react-redux';
import { useStore } from '../store';

import '../styles.css';

const App = ({ Component, pageProps }) => {
  const { session } = pageProps;
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <AuthProvider options={{ site: process.env.SITE }} session={session}>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
};

export default App;
