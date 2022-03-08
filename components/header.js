import Head from 'next/head'
import useUser from '../lib/useUser';
import fetchJson from '../lib/fetchJson';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

const Header = ({ title, brandname }) => {
    const { user, mutateUser } = useUser()
    const router = useRouter()
    return (
        <header className="text-gray-600 body-font border-b">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-primary-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">{brandname}</span>
                </a>
                <nav className="md:ml-auto grid md:flex flex-wrap items-center text-base justify-center">
                            
                        </nav>
                {!user?.isLoggedIn &&
                    <a className="inline-flex items-center bg-primary-500 border-0 py-2 px-3 focus:outline-none hover:bg-primary-700 text-primary-100 hover:text-white rounded text-base mt-4 md:mt-0"
                        href="/login"
                    >
                        Login
                    </a>
                }
                {user?.isLoggedIn === true &&
                    <>      
                        {/* <a className="mr-5 hover:text-gray-900 text-primary-500" href="landing">Dashboard</a>                   */}
                        <b>User: </b><div className="mr-5 ml-2 hover:text-gray-900">{user?.login}</div>
                        <a className="inline-flex items-center bg-primary-500 border-0 py-2 px-3 focus:outline-none hover:bg-primary-700 text-primary-100 hover:text-white rounded text-base mt-4 md:mt-0"
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
                        </a>
                    </>
                }
            </div>
        </header>
    );
}

export default Header;