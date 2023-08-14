import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@utils/database';
import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from '@config';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {label: 'Email', type: 'text', placeholder: 'Enter Username'},
				password: {label: 'Password', type: 'password'}
			}
		}),
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
		})
	],
	callbacks: {
		async signIn(user, account, profile) {
			console.log('------------------------');
			console.log(profile);
			await connectToDB();
			// const user = await User.findOne({ email: credentials.email, password: credentials.password });
			// if (user) {
			// 	return {
			// 		email: user.email,
			// 		name: user.name,
			// 		role: user.role,
			// 		image: credentials.picture,
			// 		avatar: credentials.name.split('')[0].charAt(0),
			// 	};
			// } else {
			// 	const user = {
			// 		email: credentials.email,
			// 		username: credentials.username,
			// 		role: credentials.role,
			// 		password: credentials.password,
			// 	};
			// 	await User.save(user);
			// 	return {
			// 		...user,
			// 		image: credentials.picture,
			// 		avatar: credentials.name.split('')[0].charAt(0),
			// 	};
			// }
		}

	}
});

export { handler as GET, handler as POST };