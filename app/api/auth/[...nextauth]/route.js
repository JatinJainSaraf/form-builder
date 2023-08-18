import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { connectToDB } from '@utils/database';
import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from '@config';
import User from '@models/user';
import { ROLE } from '@constant/constant';
const handler = NextAuth({
	providers: [
		GoogleProvider({
			profile(profile) {
				return {
					...profile,
					id: profile.sub,
					role: profile.hd === 'codezeros.com' ? ROLE.ADMIN : ROLE.USER,
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
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Enter your email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				try{
					const user =await User.findOne({email: credentials.email});
					if (user) {
						const passwordMatch = await bcrypt.compare(credentials.password, user.password);
						if(!passwordMatch) throw new Error('Incorrect Password');
						return user;
					} else {
						return null;
					}
				} catch(error) {
					console.error('Error during authorization:', error);
					throw error;
				}
			}
		})
	],
	callbacks: {
		async session({ session }) {
			await connectToDB();
			const dbUser = await User.findOne({ email: session.user.email });
			session.user.role = dbUser.role;
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
							name: user.name,
							username: user.email,
							role: user.email.endsWith('@codezeros.com') ? ROLE.ADMIN : ROLE.USER,
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
