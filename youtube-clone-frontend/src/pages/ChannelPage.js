import React, { useState } from 'react'
import ChannelContents from './ChannelContents.js'
import Sidebar from '../Navbar/Sidebar'
import { useLocation } from 'react-router-dom'

const ChannelPage = () => {
  let isSidebarCollapsed = false;
  const location = useLocation();
    const [Category, setCategory] = useState(location.state?.category || 0);
  return (
    <div className="flex w-full">
      <Sidebar className="flex-shrink-0 w-64" isCollapsed={isSidebarCollapsed} Category={Category} setCategory={setCategory} />
      <div className="flex-grow">
        <ChannelContents/>
      </div>
    </div>
  )
}
export default ChannelPage