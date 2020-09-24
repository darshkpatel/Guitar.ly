import mongoose from 'mongoose'
const ProfileSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    completedLessons: {
        type: Array
    },
    completedPractices: {
        type: Array
    }
})


export default mongoose.models('Profile', ProfileSchema)