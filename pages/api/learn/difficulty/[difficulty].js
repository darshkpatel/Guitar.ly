import connectDb from '../../../../utils/dbHelper';
import Lesson from '../../../../models/Lesson';

export default async function handler(req, res) {
  const {
    query: { difficulty },
  } = req;

  await connectDb();

  try {
    const lesson = await Lesson.find({ difficulty });
    if (!lesson) res.status(404);
    res.status(200).json({ success: true, data: lesson });
  } catch (error) {
    res.status(400).json({ success: false });
  }
}
