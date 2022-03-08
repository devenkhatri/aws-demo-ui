import React, { useState } from 'react';
import PageLayout from "../components/page-layout";
import DataTree from "../components/data-tree";
import SearchPanel from '../components/search-panel';
import { Skeleton, Table, Space } from 'antd';

export default function Home() {
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
    <PageLayout className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
        <div className="md:flex grid items-start justify-between">
          <div className="md:h-screen shadow-lg relative md:w-80 w-screen">
            <div className="bg-white h-full dark:bg-gray-700">
              <DataTree />
            </div>
          </div>
          <div className="flex flex-col w-full md:space-y-4">
            <div className="px-4 md:px-6 md:py-4 py-2">
              <SearchPanel />
            </div>
            <div className="px-4 md:px-6">
              <h2>Result</h2>
              {/* <Skeleton active />   */}
              <Table
                columns={columns}
                // pagination={{ position: [this.state.top, this.state.bottom] }}
                dataSource={data}
              />
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
