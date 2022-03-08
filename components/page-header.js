import React, { useState } from "react";
import Head from 'next/head'
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import { useRouter } from 'next/router';
import LinkButton from './link-button';

const PageHeader = ({ title, brandname }) => {
    const { user, mutateUser } = useUser()
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const Logo = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-primary-500 rounded-full" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
    );

    const NavLinks = () => {
        return (
            <>
                {!user?.isLoggedIn &&
                    <li>
                        <LinkButton href="/login">
                            Login
                        </LinkButton>
                    </li>
                }

                {user?.isLoggedIn === true &&
                    <>
                        <li><div className='flex'><b>User: </b><div className="mr-5 ml-2 hover:text-gray-900">{user?.login}</div></div></li>
                        <li><a href="/opensearch">OpenSearch</a></li>
                        <li><LinkButton
                            href="/api/logout"
                            onClick={async (e) => {
                                e.preventDefault()
                                mutateUser(
                                    await fetchJson('/api/logout', { method: 'POST' }),
                                    false
                                )
                                router.push('/login')
                            }}
                        >
                            Signout
                        </LinkButton>
                        </li>
                    </>
                }
            </>
        );
    }
    return (
        <header className="text-gray-600 body-font border-b">
            <Head>
                <title>{title}</title>
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any"></link>
            </Head>

            <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-8">
                <div className="relative flex items-center justify-between">
                    <a
                        href="/"
                        aria-label={brandname}
                        title={brandname}
                        className="inline-flex items-center"
                    >
                        <Logo />
                        <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            {brandname}
                        </span>
                    </a>
                    <ul className="flex items-center hidden space-x-8 lg:flex">
                        <NavLinks />
                    </ul>
                    <div className="lg:hidden">
                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-0 left-0 w-full z-50">
                                <div className="p-5 bg-white border rounded shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <a
                                                href="/"
                                                aria-label="Company"
                                                title="Company"
                                                className="inline-flex items-center"
                                            >
                                                <Logo />
                                                <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                                    {brandname}
                                                </span>
                                            </a>
                                        </div>
                                        <div>
                                            <button
                                                aria-label="Close Menu"
                                                title="Close Menu"
                                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className="space-y-4">
                                            <NavLinks />
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PageHeader;