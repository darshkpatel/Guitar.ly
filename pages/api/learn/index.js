import connectDb from '../../../utils/dbHelper';
import Lesson from '../../../models/Lesson';

export default async function handler(req, res) {
  await connectDb();
  try {
    const lessons = await Lesson.find({});
    res.status(200).json({ success: true, data: lessons });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
