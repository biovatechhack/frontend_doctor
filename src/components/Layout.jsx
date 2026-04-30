import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Right Sidebar (RTL) */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Scrollable Document Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f0f4f9] p-6 text-gray-800 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
