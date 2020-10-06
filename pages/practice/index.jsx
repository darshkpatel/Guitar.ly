import { useSession, getSession, signin } from 'next-auth/client';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import ListRow from '../../components/ListRow';
import styles from '../../components/styles/card.module.css';
import connectDb from '../../utils/dbHelper';
import PracticeModel from '../../models/Practice';
import Profile from '../../models/Profile';

const titleStyle = {
  fontSize: '26px',
  fontWeight: 400,
  margin: 10,
};
const Practice = ({ practices, profile }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/Practice' });

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
  return (
    <>
      <Layout>
        <Card>
          <CardTitle>Choose Practice Exercise</CardTitle>
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
          {practices.map((practice) => (
            <ListRow key={practice._id}>
              <div>
                <a
                  href={`/practice/${practice._id}`}
                  className={styles.normalLink}
                >
                  <span>{practice.title}</span>
                </a>
              </div>
              <div>
                <a
                  href={`/practice/difficulty/${practice.difficulty}`}
                  className={styles.normalLink}
                >
                  <span>{practice.difficulty}</span>
                </a>
                <div>
                  <a
                    href={`/practice/difficulty/${practice.difficulty}`}
                    className={styles.normalLink}
                  >
                    <span className={getDifficultyStyle(practice.difficulty)} />
                  </a>
                </div>
              </div>
              <div>
                <span>
                  {profile && profile.completedPractices.includes(practice._id)
                    ? 'Completed'
                    : 'Incomplete'}
                  {!profile && 'Error Fetching Data'}
                </span>
              </div>
            </ListRow>
          ))}
        </Card>
      </Layout>
    </>
  );
};

export default Practice;

export async function getServerSideProps(context) {
  // Fetch data server side for SSR
  await connectDb();
  const practices = (await PracticeModel.find({})).map((document) => {
    const practice = document.toObject();
    practice._id = document._id.toString();
    return practice;
  });
  const session = await getSession(context);

  const profile = await Profile.findOne({
    userEmail: session?.user.email,
  }).lean();
  if (profile) profile._id = profile?._id.toString();
  return { props: { practices, profile } };
}
