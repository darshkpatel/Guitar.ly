import { useSession, signin } from 'next-auth/client';
import Layout from '../components/Layout';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ListRow from '../components/ListRow';
import styles from '../components/styles/card.module.css';

const titleStyle = {
  fontSize: '26px',
  fontWeight: 400,
  margin: 10,
};

const Learn = () => {
  const [session, loading] = useSession();

  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });
  const chord = 'E2';
  return (
    <>
      <Layout>
        <Card>
          <CardTitle>Choose Your Lesson</CardTitle>
          <ListRow>
            <div style={titleStyle}>Title</div>{' '}
            <div style={titleStyle}>Difficulty</div>{' '}
          </ListRow>
          <ListRow>
            <div>Learn How To Play Chord {chord}</div>{' '}
            <div>
              Easy
              <span className={styles.easy} />
            </div>{' '}
          </ListRow>
        </Card>
      </Layout>
    </>
  );
};

export default Learn;
