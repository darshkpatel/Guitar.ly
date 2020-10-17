import { getSession } from 'next-auth/client';
import connectDb from '../../../utils/dbHelper';
import Profile from '../../../models/Profile';

export default async function handler(req, res) {
  const { method } = req;
  const session = await getSession({ req });
  if (session) {
    if (method === 'POST') {
      const { lesson, action } = JSON.parse(req.body);
      console.log(JSON.parse(req.body));
      if (!lesson || !action) res.send('404');
      await connectDb();
      const userProfile =
        action === 'Completed'
          ? await Profile.findOneAndUpdate(
              {
                userEmail: session.user.email,
              },
              { $addToSet: { completedLessons: lesson } },
              { new: true, upsert: false }
            )
          : await Profile.findOneAndUpdate(
              {
                userEmail: session.user.email,
              },
              { $pull: { completedLessons: lesson } },
              { new: true, upsert: false }
            );

      if (!userProfile) return res.send(404);
      console.log(userProfile);
      res.send(userProfile);
    } else {
      res.send(
        await Profile.findOne({
          userEmail: session.user.email,
        })
      );
    }
  } else {
    res.send(403);
  }

  return null;
}
