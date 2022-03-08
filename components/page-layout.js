import PageHeader from './page-header'
import PageFooter from './page-footer'
import useUser from "../lib/useUser";
import { Layout } from 'antd';
const { Content } = Layout;

const PageLayout = ({ children, title, brandname }) => {
    const { user } = useUser({
        redirectTo: "/login",
    });
    const defaultbrandname = process.env.NEXT_PUBLIC_BRANDNAME;
    const defaulttitle = process.env.NEXT_PUBLIC_SITETITLE;
    return (
        <div>
            <PageHeader title={title || defaulttitle} brandname={brandname || defaultbrandname} />
            <Content className="flex w-full flex-1 flex-col">
                {children}
            </Content>
            <PageFooter brandname={brandname || defaultbrandname} />
        </div>
    );
}

export default PageLayout;