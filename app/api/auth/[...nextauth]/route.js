import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        console.log({credentials})
        await connectToDB()
        const user = await User.findOne({ email: credentials.username, password: credentials.password });
  
        if (user) {
          return {email: user.email, name: user.role}
        } else {
          return null
  
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }