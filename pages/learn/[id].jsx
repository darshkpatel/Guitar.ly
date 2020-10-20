import React, { useState, useEffect } from 'react';
import { useSession, getSession, signin } from 'next-auth/client';
import { useSelector } from 'react-redux';
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
  const note = useSelector((state) => state.note);

  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });
  const [profileData, setProfile] = useState(profile);

  const handleStatus = (status) =>
    fetch('/api/user/lesson', {
      method: 'POST',
      body: JSON.stringify({
        lesson: lesson?._id,
        action: status,
      }),
    }).then(async (res) => {
      const resp = await res.json();
      setProfile(resp);
    });

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
                  {profileData &&
                  profileData.completedLessons.includes(lesson?._id)
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
            <ListRow>
              <div>
                <span>Tutorial: </span>
              </div>
              <div>
                <a href={lesson?.data}>Youtube</a>
              </div>
            </ListRow>

            <span style={{ textAlign: 'center', fontSize: '1.5em' }}>
              {note === lesson?.note + lesson?.octave
                ? 'You Got it!'
                : 'Try Harder'}
            </span>
            {/* Error Messages */}
            <span>{!profileData && 'Error Fetching User'}</span>
            <span>{!lesson && 'Error Fetching Lesson Info'}</span>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '4%',
                justifyContent: 'space-between',
              }}
            >
              <button
                className={ButtonStyles.buttonAction}
                type="button"
                onClick={() => {
                  handleStatus('Completed');
                }}
              >
                Mark as Completed
              </button>
              <button
                className={ButtonStyles.buttonAction}
                type="button"
                style={{ backgroundColor: '#E94A47' }}
                onClick={() => {
                  handleStatus('Incomplete');
                }}
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
