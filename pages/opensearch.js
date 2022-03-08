import React from 'react';
import DataTree from "../components/data-tree";
import SearchPanel from '../components/search-panel';
import SearchUI from '../components/search-ui';
import PageLayout from "../components/page-layout";
import { Table, Space } from 'antd';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function OpenSearch() {

  return (
    <PageLayout>
      <Layout>
        <Sider width={200} breakpoint="lg">
          <DataTree />
        </Sider>
        <Layout>
          <Content className='h-screen'>
            <SearchUI />
          </Content>
        </Layout>
      </Layout>
    </PageLayout>
  );
}
