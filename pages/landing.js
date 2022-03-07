import React from "react";
import Layout from "../components/layout";
import useUser from "../lib/useUser";

export default function Landing() {
  const { user } = useUser({
    redirectTo: "/login",
  });
  return (
    <Layout className="flex min-h-screen flex-col items-center justify-center py-2">      
      <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold py-12">
          Welcome to Landing Page of the Demo!
        </h1>        
      </div>
    </Layout>
  );
}
