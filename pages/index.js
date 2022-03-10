import React from 'react';
import SearchResult from "../components/search-result";
import SearchPanel from '../components/search-panel';
import PageLayout from "../components/page-layout";
import { Layout, Menu } from 'antd';

const { Content } = Layout;

import {useGlobalState} from '../components/global-state'

export default function Home() {
  
  return (
    <PageLayout>
      <Layout>
        {/* <Sider width={200} breakpoint="lg">
          <DataTree />
        </Sider> */}
        <Layout>
          <Content >
            <div className="px-4 md:px-6 md:py-4 py-2">
              <SearchPanel />
            </div>
            <div className="px-4 md:px-6">
              <SearchResult />
            </div>
          </Content>
        </Layout>
      </Layout>
    </PageLayout>
  );
}
