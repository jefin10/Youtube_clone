import React, { useState } from 'react'
import Videoplay from './Videoplay'
import VideoFeed from './VideoFeed'
import Sidebar from '../Navbar/Sidebar'
import { useParams } from 'react-router-dom'

const Video = ({ isSidebarCollapsed, onToggleSidebar, isMobile }) => {
  const [Category, setCategory] = useState(0);
  const { CategoryID, VideoID } = useParams();

  const getLayoutClasses = () => {
    if (isMobile) {
      return 'flex flex-col p-2';
    }
    return `flex flex-col lg:flex-row max-w mx-auto gap-6 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} p-4`;
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
      
      <div className={getLayoutClasses()}>
        <div className={isMobile ? "w-full" : "lg:w-2/3"}>
          <Videoplay videoId={VideoID} isMobile={isMobile} />
        </div>
        <div className={isMobile ? "w-full mt-4" : "lg:w-1/3"}>
          <VideoFeed currentVideoId={VideoID} category={CategoryID} isMobile={isMobile} />
        </div>
      </div>
    </div>
  )
}

export default Video