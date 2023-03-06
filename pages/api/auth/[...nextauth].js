import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDatabase, findOneValue } from '../../../helpers/db-util';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDatabase();

        const user = await findOneValue(client, 'users', { email: credentials?.email })

        if (!user) {
          await client.close()
          throw new Error('No user found!')
        }

        const isValid = await verifyPassword(credentials?.password, user.password)

        if (!isValid) {
          await client.close()
          throw new Error('Could not log you in!')
        }

        await client.close();
        return { email: user.email }
      }
    })
  ],
  pages: {
    signIn: '/auth/session',
    signOut: '/auth',
    error: '/auth/error',
  },
  database: process.env.DATABASE_URL
})
