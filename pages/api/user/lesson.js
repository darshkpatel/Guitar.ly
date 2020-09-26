import { getSession } from 'next-auth/client';
import connectDb from '../../../utils/dbHelper';
import Profile from '../../../models/Profile';

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (session) {
    if (method === 'POST') {
      const { lesson } = req.body;
      if (!lesson) res.send(400);
      await connectDb();

      const userProfile = await Profile.findOneAndUpdate(
        {
          userEmail: session.user.email,
        },
        { $addToSet: { completedLessons: lesson } },
        { new: true, upsert: false }
      );

      if (!userProfile) return res.send(404);
      res.send(userProfile);
    } else {
      res.send(405);
    }
  } else {
    res.send(403);
  }

  return null;
}
