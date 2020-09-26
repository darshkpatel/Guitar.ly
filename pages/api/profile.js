import connectDb from '../../utils/dbHelper';
import Profile from '../../models/Profile';

export default async function handler(req, res) {
  const { method } = req;

  await connectDb();

  if (method === 'POST') {
    const { email } = req.body;
    if (!email) res.send(400);

    const userProfile = await Profile.findOne({ userEmail: email });

    if (!userProfile) return res.send(404);
    res.send(userProfile);
  } else {
    res.send(405);
  }
  return null;
}
