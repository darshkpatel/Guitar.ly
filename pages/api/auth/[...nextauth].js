import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.VERCEL_URL,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  pages: {},

}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
