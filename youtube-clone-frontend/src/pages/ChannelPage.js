import React, { useState } from 'react'
import ChannelContents from './ChannelContents.js'
import Sidebar from '../Navbar/Sidebar'
import { useLocation } from 'react-router-dom'

const ChannelPage = ({ isSidebarCollapsed, onToggleSidebar, isMobile }) => {
  const location = useLocation();
  const [Category, setCategory] = useState(location.state?.category || 0);

  const getMainContentClasses = () => {
    if (isMobile) {
      return 'flex-grow p-2 md:p-4';
    }
    return `flex-grow ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} p-4`;
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
        <ChannelContents isMobile={isMobile} />
      </div>
    </div>
  )
}

export default ChannelPage