import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Profile from '../../../models/Profile'
import connectDb from '../../../utils/dbHelper'

const options = {
  site: process.env.VERCEL_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  events:{
    createUser: async (message) => { 
      await connectDb()

      // Create user profile entry when a user is created
      console.log('Creating Profile for', message.email)
      await Profile.create({userEmail: message.email, completedLessons: [], completedPractices: []})
      
    }
  }

}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
