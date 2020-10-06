import { useSession, getSession, signin } from 'next-auth/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../../components/Layout';
import Card from '../../../components/Card';
import CardTitle from '../../../components/CardTitle';
import ListRow from '../../../components/ListRow';
import styles from '../../../components/styles/card.module.css';
import connectDb from '../../../utils/dbHelper';
import Profile from '../../../models/Profile';

const titleStyle = {
  fontSize: '26px',
  fontWeight: 400,
  margin: 10,
};

// Fetching for PoC of fetching Data from API
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const practice = ({ profile }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/practice' });

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return styles.easy;
      case 'Medium':
        return styles.medium;
      case 'Hard':
        return styles.hard;
      default:
        return styles.dot;
    }
  };

  const router = useRouter();
  const { difficulty } = router.query;

  const { data, error } = useSWR(
    `/api/practice/difficulty/${difficulty}`,
    fetcher
  );
  let lessons;
  if (data && !error) {
    lessons = data.data;
  }
  return (
    <>
      <Layout>
        <Card>
          <a href="/practice" className={styles.normalLink}>
            <CardTitle>Choose Practice Exercise</CardTitle>
          </a>
          <ListRow>
            <div style={titleStyle}>
              <span>Title</span>
            </div>
            <div style={titleStyle}>
              <span>Practice Difficulty</span>
            </div>
            <div style={titleStyle}>
              <span>Status</span>
            </div>
          </ListRow>
          {!data && !error && <h2>Fetching...</h2>}
          {error && <h1>Error Fetching...</h1>}
          {!error &&
            data &&
            lessons.map((lesson) => (
              <ListRow key={lesson._id}>
                <div>
                  <a
                    href={`/practice/${lesson._id}`}
                    className={styles.normalLink}
                  >
                    <span>{lesson.title}</span>
                  </a>
                </div>
                <div>
                  <span>{lesson.difficulty}</span>
                  <div>
                    <span className={getDifficultyStyle(lesson.difficulty)} />
                  </div>
                </div>
                <div>
                  <span>
                    {profile && profile.completedLessons.includes(lesson._id)
                      ? 'Completed'
                      : 'Incomplete'}
                    {!profile && 'Error Fetching User'}
                  </span>
                </div>
              </ListRow>
            ))}
        </Card>
      </Layout>
    </>
  );
};

export default practice;

export async function getServerSideProps(context) {
  // For Partial SSR
  await connectDb();

  const session = await getSession(context);
  const profile = await Profile.findOne({
    userEmail: session?.user.email,
  }).lean();

  if (profile) profile._id = profile?._id.toString();
  return { props: { profile } };
}
