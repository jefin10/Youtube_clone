import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Navbar from './Navbar/Navbar';
import SearchPage from './pages/SearchPage';
import Channel from './pages/channel';
import ChannelPage from './pages/ChannelPage';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onToggleSidebar={toggleSidebar} isMobile={isMobile} />
        <div className="flex-grow pt-14">
          <Routes>
            <Route path='/' element={<Home isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} isMobile={isMobile} />} />
            <Route path='/video/:CategoryID/:VideoID' element={<Video isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} isMobile={isMobile} />} />
            <Route path='/search/:Keyword' element={<SearchPage isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} isMobile={isMobile} />} />
            <Route path='/channel/:channelId' element={<ChannelPage isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} isMobile={isMobile} />} />
            <Route path='/channel/:channelId/video/:CategoryID/:VideoID' element={<Video isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} isMobile={isMobile} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;