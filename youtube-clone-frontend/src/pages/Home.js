import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Navbar/Sidebar';
import HomeVideos from './HomeVideos';

const Home = ({ isSidebarCollapsed, onToggleSidebar }) => {
  const location = useLocation();
  const [Category, setCategory] = useState(location.state?.category || 0);

  useEffect(() => {
    if (location.state?.category !== undefined) {
      setCategory(location.state.category);
    }
  }, [location.state?.category]);

  return (
    <div className="flex">
      <div className={`fixed top-15 left-0 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} Category={Category} setCategory={setCategory} />
      </div>
      <div className={`flex-grow p-4 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <HomeVideos Category={Category} />
      </div>
    </div>
  );
};

export default Home;