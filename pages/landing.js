import React, { useState } from 'react';
import Layout from "../components/layout";
import useUser from "../lib/useUser";
import DataTree from "../components/data-tree";
import DateRangePicker from '../components/date-range-picker';

export default function Landing() {
  const { user } = useUser({
    redirectTo: "/login",
  });

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-center py-2">      
      

      <main class="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">          
    <div class="md:flex grid items-start justify-between">
        <div class="md:h-screen shadow-lg relative md:w-80 w-screen">
            <div class="bg-white h-full dark:bg-gray-700">                
                <DataTree />          
            </div>
        </div>
        <div class="flex flex-col w-full md:space-y-4">
            <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
                <h2 class="text-md text-gray-400">
                    Search the data
                </h2>
                <DateRangePicker />
                
                
            </div>
        </div>
    </div>
</main>


    </Layout>
  );
}
