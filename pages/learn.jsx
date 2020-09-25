import { useSession, signin } from 'next-auth/client';
import Layout from '../components/Layout';
import Card from '../components/Card';

const Learn = () => {
  const [session, loading] = useSession();

  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });

  return (
    <>
      <Layout>
        <Card />
      </Layout>
    </>
  );
};

export default Learn;
