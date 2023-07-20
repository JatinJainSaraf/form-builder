"use client";
import Link from "next/link";
import { useState, useEffect } from 'react';

const Nav = () => {
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        const userDetailsString = sessionStorage.getItem('userDetails');
        const parsedUserDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
        setUserDetails(parsedUserDetails);
    }, []);
    const signOut = () => {
        sessionStorage.clear()
        window.location.href = "/"
    }
    return (
        <>
            <nav className='flex-between w-full mb-16 pt-3'>
                <Link href='/' className='flex gap-2 text-decoration-none flex-center'>
                    <p className='logo_text'>Form Builder</p>
                </Link>
                <div className='sm:flex hidden'>
                    {userDetails ?
                        userDetails.role === "Admin" ? (
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
                                {!userDetails &&
                                    <Link href='/signin' className='black_btn text-decoration-none'>
                                        SignIn
                                    </Link>
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