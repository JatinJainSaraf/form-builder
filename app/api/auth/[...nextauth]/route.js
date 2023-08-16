import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from '@config';
import User from '@models/user';
import bcrypt from 'bcrypt';
const handler = NextAuth({
	providers: [
		GoogleProvider({
			profile(profile) {
				return {
					...profile,
					id: profile.sub,
					role: profile.hd === 'codezeros.com' ? 'Admin' : 'User',
				};
			},
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			console.log('🚀 ~ file: route.js:30 ~ session ~ session:', session);
			await connectToDB();
			const dbUser = await User.findOne({ email: session.user.email });
			session.user = dbUser;
			return session;
		},
		async signIn({ user, account, profile }) {
			try {
				await connectToDB();
				if (account.provider === 'google' && profile.email_verified === true) {
					const dbUser = await User.findOne({ email: user.email });
					if (dbUser) {
						return true;
					} else {
						const newUser = {
							email: user.email,
							username: user.email,
							role: user.email.endsWith('@codezeros.com') ? 'Admin' : 'User',
							password: await bcrypt.hash(user.email, 10),
						};
						await User.create(newUser);
						return true;
					}
				} else {
					return false;
				}
			} catch (e) {
				console.error(e);
				throw new Error(e.message);
			}
		},
	},
});

export { handler as GET, handler as POST };
