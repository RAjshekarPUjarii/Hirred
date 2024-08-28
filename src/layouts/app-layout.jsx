import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-700 mt-10">
        Made With ❤️ by Rajshekar Pujari
      </div>
    </div>
  );
};

export default AppLayout;
