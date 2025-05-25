import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Navbar/Sidebar';
import HomeVideos from './HomeVideos';

const Home = ({ isSidebarCollapsed, onToggleSidebar, isMobile }) => {
  const location = useLocation();
  const [Category, setCategory] = useState(location.state?.category || 0);

  useEffect(() => {
    if (location.state?.category !== undefined) {
      setCategory(location.state.category);
    }
  }, [location.state?.category]);

  const getMainContentClasses = () => {
    if (isMobile) {
      return 'flex-grow p-2 md:p-4';
    }
    return `flex-grow p-4 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`;
  };

  return (
    <div className="flex">
      {!isMobile && (
        <div className={`fixed top-14 left-0 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
          <Sidebar isCollapsed={isSidebarCollapsed} Category={Category} setCategory={setCategory} isMobile={isMobile} />
        </div>
      )}
      
      {isMobile && (
        <Sidebar isCollapsed={isSidebarCollapsed} Category={Category} setCategory={setCategory} isMobile={isMobile} />
      )}
      
      <div className={getMainContentClasses()}>
        <HomeVideos Category={Category} />
      </div>
    </div>
  );
};

export default Home;