'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { usePathname } from 'next/navigation';

const Nav = () => {
	const {  status } = useSession();
	const pathname = usePathname();

	const isAuthenticated = status === 'authenticated';

	const navLinks = [
		{ href: '/dashboard', text: 'Dashboard' },
	];

	const renderLinks = () => {
		return (
			<>
				{navLinks.map((link) => (
					<Link href={link.href} key={link.href} className={`black_btn text-decoration-none ${pathname === link.href ? 'btn border-black' : ''}`}>
						{link.text}
					</Link>
				))}
				<button className="black_btn" onClick={signOut}>
					Sign Out
				</button>
			</>
		);
	};

	return (
		<nav className='flex-between w-full mb-16 pt-3'>
			<Link href='/' className='flex gap-2 text-decoration-none flex-center'>
				<p className='logo_text'>Form Builder</p>
			</Link>
			<div className='sm:flex'>
				{isAuthenticated ? (
					<div className='flex gap-3 md:gap-5'>{renderLinks()}</div>
				) : (
					<button className='black_btn text-decoration-none' onClick={signIn}>
						SignIn
					</button>
				)}
			</div>
		</nav>
	);
};

export default Nav;
