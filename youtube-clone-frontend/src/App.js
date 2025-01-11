import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Video from './pages/Video';
import Navbar from './Navbar/Navbar';
import SearchPage from './pages/SearchPage';
import Channel from './pages/channel';


function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  }
  const [iisSidebarCollapsed, isetIsSidebarCollapsed] = useState(true);

  const itoggleSidebar = () => {
    isetIsSidebarCollapsed(!iisSidebarCollapsed);
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar onToggleSidebar={toggleSidebar} ionToggleSidebar={itoggleSidebar} />
        <div className="flex-grow pt-16">
          <Routes>
            <Route path='/' element={<Home isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
            <Route path='/video/:CategoryID/:VideoID' element={<Video iisSidebarCollapsed={iisSidebarCollapsed} ionToggleSidebar={itoggleSidebar} />} />
            <Route path='/search/:Keyword' element={<SearchPage isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
            <Route path='/channel/12' element={<Channel isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={toggleSidebar} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
