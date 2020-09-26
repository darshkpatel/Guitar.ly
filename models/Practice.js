import mongoose from 'mongoose';

const PracticeSchema = new mongoose.Schema({
  title: { type: String, required: true },

  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },

  data: { type: Object },
});

export default mongoose.models.Practice ||
  mongoose.model('Practice', PracticeSchema);
