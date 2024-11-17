import React, { useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Check if the route matches `/dashboard/Meeting`
  const isSidebarHidden = location.pathname === '/dashboard/Meeting';

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {!isSidebarHidden && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        {/* Content Area */}
        <div
          className={`relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ${
            isSidebarHidden ? 'w-full' : ''
          }`}
        >
          {/* Header */}
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar} // Pass the toggleSidebar function to Header
          />

          {/* Main Content */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
