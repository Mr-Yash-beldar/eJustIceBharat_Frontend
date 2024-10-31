import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

interface DefaultLayoutProps {
  children: ReactNode;
  isAdvocate?: boolean; // Prop to determine if this is an advocate layout
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  isAdvocate = false,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* Page Wrapper */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isAdvocate={isAdvocate}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Content Area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* Header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
