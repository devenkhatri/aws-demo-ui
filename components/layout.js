import Header from './header'
import Footer from './footer'
import useUser from "../lib/useUser";

const Layout = ({ children, title, brandname }) => {
    const { user } = useUser({
        redirectTo: "/login",
    });
    const defaultbrandname = process.env.NEXT_PUBLIC_BRANDNAME;
    const defaulttitle = process.env.NEXT_PUBLIC_SITETITLE;
    return (
        <div>
            <Header title={title || defaulttitle} brandname={brandname || defaultbrandname} />
            <main className="flex w-full flex-1 flex-col">
                {children}
            </main>
            <Footer brandname={brandname || defaultbrandname} />
        </div>
    );
}

export default Layout;