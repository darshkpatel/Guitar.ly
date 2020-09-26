import connectDb from '../../../utils/dbHelper';
import Practice from '../../../models/Practice';

export default async function handler(req, res) {
  await connectDb();
  try {
    const practices = await Practice.find({});
    res.status(200).json({ success: true, data: practices });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
