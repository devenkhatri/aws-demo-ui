import React, { useState } from 'react';
import PageLayout from "../components/page-layout";
import DataTree from "../components/data-tree";
import SearchPanel from '../components/search-panel';
import { Skeleton } from 'antd';

export default function Home() {
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
              <Skeleton active />        
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
