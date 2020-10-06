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

const Learn = ({ profile }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });

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
    `/api/learn/difficulty/${difficulty}`,
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
          <a href="/learn" className={styles.normalLink}>
            <CardTitle>Choose Your Lesson</CardTitle>
          </a>
          <ListRow>
            <div style={titleStyle}>
              <span>Title</span>
            </div>
            <div style={titleStyle}>
              <span>Lesson Difficulty</span>
            </div>
            <div style={titleStyle}>
              <span>Status</span>
            </div>
          </ListRow>
          {!data && !error && <h2>Fetching Lessons</h2>}
          {error && <h1>Error Fetching Lessons</h1>}
          {!error &&
            data &&
            lessons.map((lesson) => (
              <ListRow key={lesson._id}>
                <div>
                  <a
                    href={`/learn/${lesson._id}`}
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

export default Learn;

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
