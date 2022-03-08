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
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.length - b.address.length,
      responsive: ['md'],
    },
    {
      title: 'Download',
      key: 'download',
      render: (text, record) => (
        <Space size="middle">
          <a>Download - {record.name}</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

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
