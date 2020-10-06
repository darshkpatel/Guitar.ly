import { useSession, getSession, signin } from 'next-auth/client';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import CardTitle from '../../components/CardTitle';
import connectDb from '../../utils/dbHelper';
import Profile from '../../models/Profile';

// Fetching for PoC of fetching Data from API
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Learn = ({ profile }) => {
  const [session, loading] = useSession();
  // Redirect to login page if not logged in
  if (!session && !loading) signin(null, { callbackUrl: '/learn' });

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/learn/${id}`, fetcher);
  let lesson;
  if (data && !error) {
    lesson = data.data;
  }

  return (
    <>
      <Layout>
        <Card>
          <CardTitle>Lesson Details</CardTitle>

          <span>
            {profile && profile.completedLessons.includes(lesson?._id)
              ? 'Completed'
              : 'Incomplete'}
            {!profile && 'Error Fetching User'}
          </span>
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
