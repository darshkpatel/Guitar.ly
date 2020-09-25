import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Profile from '../../../models/Profile';
import connectDb from '../../../utils/dbHelper';

const options = {
  site: process.env.VERCEL_URL || 'https://guitarly.vercel.app',
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  events: {
    createUser: async (message) => {
      await connectDb();

      // Create user profile entry when a user is created
      console.log('Creating Profile for', message.email);
      await Profile.create(
        {
          userEmail: message.email,
          completedLessons: [],
          completedPractices: [],
        },
        (err, data) => {
          if (err) throw err;
          console.log('Created Profile', data);
        }
      );
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
