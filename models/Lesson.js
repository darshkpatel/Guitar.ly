import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },

  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },

  tutorial: { type: String },

  note: {
    type: String,
    enum: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'A♯',
      'B♯',
      'C♯',
      'D♯',
      'E♯',
      'F♯',
      'G♯',
    ],
  },

  octave: { type: Number, min: 1, max: 4 },

  data: { type: Object },
});

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);
