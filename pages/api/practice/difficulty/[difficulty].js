import connectDb from '../../../../utils/dbHelper';
import Practice from '../../../../models/Practice';

export default async function handler(req, res) {
  const {
    query: { difficulty },
  } = req;

  await connectDb();

  try {
    const practice = await Practice.find({ difficulty });
    if (!practice) res.status(404);
    res.status(200).json({ success: true, data: practice });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
