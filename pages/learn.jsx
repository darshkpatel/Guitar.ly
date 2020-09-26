import { useSession, signin } from 'next-auth/client';
import Layout from '../components/Layout';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ListRow from '../components/ListRow';
import styles from '../components/styles/card.module.css';
import connectDb from '../utils/dbHelper';
import Lesson from '../models/Lesson';

const titleStyle = {
  fontSize: '26px',
  fontWeight: 400,
  margin: 10,
};

const Learn = ({ lessons }) => {
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
  return (
    <>
      <Layout>
        <Card>
          <CardTitle>Choose Your Lesson</CardTitle>
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
          {lessons.map((lesson) => (
            <ListRow key={lesson._id}>
              <div>
                <span>{lesson.title}</span>
              </div>
              <div>
                <span>{lesson.difficulty}</span>
                <div>
                  <span className={getDifficultyStyle(lesson.difficulty)} />
                </div>
              </div>
              <div>
                <span>Incomplete</span>
              </div>
            </ListRow>
          ))}
        </Card>
      </Layout>
    </>
  );
};

export default Learn;

export async function getServerSideProps() {
  // Fetch data server side for SSR
  await connectDb();
  const lessons = (await Lesson.find({})).map((document) => {
    const lesson = document.toObject();
    lesson._id = document._id.toString();
    return lesson;
  });
  return { props: { lessons } };
}
