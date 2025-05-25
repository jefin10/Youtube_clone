import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Sidebar from '../Navbar/Sidebar'
import SearchSection from './SearchSection'

const SearchPage = ({ isSidebarCollapsed, onToggleSidebar, isMobile }) => {
  const location = useLocation();
  const { Keyword } = useParams();
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
        <SearchSection Keyword={Keyword} isMobile={isMobile} />
      </div>
    </div>
  )
}

export default SearchPage