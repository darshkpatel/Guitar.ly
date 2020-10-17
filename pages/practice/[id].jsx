import React, { useState } from 'react';
import { useSession, getSession, signin } from 'next-auth/client';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import connectDb from '../../utils/dbHelper';
import Profile from '../../models/Profile';
import Practice from '../../models/Practice';
import ListRow from '../../components/ListRow';
import NoteGauge from '../../components/NoteGauge';
import ButtonStyles from '../../components/styles/buttons.module.css';

const Learn = ({ profile, practice }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });
  const [profileData, setProfile] = useState(profile);
  const handleStatus = (status) =>
    fetch('/api/user/practice', {
      method: 'POST',
      body: JSON.stringify({
        practice: practice?._id,
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
            <CardTitle>Practice Details</CardTitle>
            <ListRow>
              <div>
                <span>Title: </span>
              </div>
              <div>
                <span>{practice?.title}</span>
              </div>
            </ListRow>
            <ListRow>
              <div>
                <span>Practice Status: </span>
              </div>
              <div>
                <span>
                  {' '}
                  {profileData &&
                  profileData.completedLessons.includes(practice?._id)
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
                <span>{practice?.difficulty}</span>
              </div>
            </ListRow>

            {/* Error Messages */}
            <span>{!profileData && 'Error Fetching User'}</span>
            <span>{!practice && 'Error Fetching practice Info'}</span>

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

  const practice = await Practice.findById(id).lean();

  if (profile) profile._id = profile?._id.toString();
  if (practice) {
    practice._id = practice?._id.toString();
    practice.data = JSON.stringify(practice.data);
  }
  return { props: { profile, practice } };
}
