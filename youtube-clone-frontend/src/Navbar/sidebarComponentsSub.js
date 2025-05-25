import React from 'react'
import { Link } from 'react-router-dom'

const SidebarComponentsSub = ({icon, label, id, isCollapsed}) => {
  return (
    <Link to={`/channel/${id}`}>
      <div className={`flex items-center py-2 cursor-pointer hover:bg-gray-100 ${
        isCollapsed ? 'justify-center px-0' : 'px-4'
      }`}>
        <img src={icon} alt={label || ""} className='w-6 h-6 rounded-full' />
        {!isCollapsed && label && (
          <span className='ml-5 text-sm font-medium'>{label}</span>
        )}
      </div>
    </Link>
  )
}

export default SidebarComponentsSub
