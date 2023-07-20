"use client";
import Link from "next/link";
import {signIn, signOut, useSession } from "next-auth/react"

const Nav = () => {
    const { data: session, status } = useSession() 
 
 
    return (
        <>
            <nav className='flex-between w-full mb-16 pt-3'>
                <Link href='/' className='flex gap-2 text-decoration-none flex-center'>
                    <p className='logo_text'>Form Builder</p>
                </Link>
                <div className='sm:flex hidden'>
                    {status === 'authenticated' ?
                        session.user.name === "Admin" ? (
                            <div className='flex gap-3 md:gap-5'>
                                <Link href='/dashboard' className='black_btn text-decoration-none'>
                                    Dashboard
                                </Link>
                                <Link href='/form-builder' className='black_btn text-decoration-none'>
                                    Form Builder
                                </Link>

                                <button className=" black_btn " onClick={signOut}>Sign Out</button>
                            </div>
                        ) : (
                            <div className='flex gap-3 md:gap-5'>
                                <Link href='/dashboard' className='black_btn text-decoration-none'>
                                    Dashboard
                                </Link>
                                <Link href='/fill-form' className='black_btn text-decoration-none'>
                                    Fill Form
                                </Link>

                                <button className=" black_btn " onClick={signOut}>Sign Out</button>
                            </div>
                        ) : (
                            <>
                                {status !== 'authenticated' &&
                                    <button className='black_btn text-decoration-none' onClick={signIn}>
                                        SignIn
                                    </button>
                                }
                            </>
                        )
                    }
                </div>
            </nav>
        </>
    )
};

export default Nav;