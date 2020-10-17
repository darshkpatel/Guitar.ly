import { useSession, getSession, signin } from 'next-auth/client';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import connectDb from '../../utils/dbHelper';
import Profile from '../../models/Profile';
import Lesson from '../../models/Lesson';
import ListRow from '../../components/ListRow';
import NoteGauge from '../../components/NoteGauge';
import ButtonStyles from '../../components/styles/buttons.module.css';

const Learn = ({ profile, lesson }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });
  return (
    <>
      <Layout>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Card
            cardStyle={{
              width: '40%',
              marginLeft: '10%',
              marginRight: '10%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardTitle>Lesson Details</CardTitle>
            <ListRow>
              <div>
                <span>Lesson Status: </span>
              </div>
              <div>
                <span>
                  {' '}
                  {profile && profile.completedLessons.includes(lesson?._id)
                    ? 'Completed'
                    : 'Incomplete'}
                </span>
              </div>
            </ListRow>
            <ListRow>
              <div>
                <span>Difficulty: </span>
              </div>
              <div>
                <span>{lesson?.difficulty}</span>
              </div>
            </ListRow>
            <ListRow>
              <div>
                <span>Note: </span>
              </div>
              <div>
                <span>{lesson?.note + lesson?.octave}</span>
              </div>
            </ListRow>

            {/* Error Messages */}
            <span>{!profile && 'Error Fetching User'}</span>
            <span>{!lesson && 'Error Fetching Lesson Info'}</span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '4%',
                justifyContent: 'space-between',
              }}
            >
              <button className={ButtonStyles.buttonAction} type="button">
                Mark as Completed
              </button>
              <button
                className={ButtonStyles.buttonAction}
                type="button"
                style={{ backgroundColor: '#E94A47' }}
              >
                Mark as Incomplete
              </button>
            </div>
          </Card>
          <div>
            <NoteGauge />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Learn;

export async function getServerSideProps(context) {
  // For Partial SSR
  await connectDb();
  const { id } = context.params;
  const session = await getSession(context);
  const profile = await Profile.findOne({
    userEmail: session?.user.email,
  }).lean();

  const lesson = await Lesson.findById(id).lean();

  if (profile) profile._id = profile?._id.toString();
  if (lesson) lesson._id = lesson?._id.toString();
  return { props: { profile, lesson } };
}
