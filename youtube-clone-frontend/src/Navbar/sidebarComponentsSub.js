import React from 'react'

const SidebarComponentsSub = ({icon, label}) => {
  return (
    <div className="flex items-center px-4 py-2 rounded-lg">
      <img src={icon} alt={label} className="h-9 w-9 rounded-full" />
      <span>{label}</span>
    </div>
  )
}

export default SidebarComponentsSub
