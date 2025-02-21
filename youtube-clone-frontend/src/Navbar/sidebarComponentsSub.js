import React from 'react'
import {  useNavigate } from 'react-router-dom'

const SidebarComponentsSub = ({icon, label,id}) => {
  const navigate=useNavigate();

  return (
    <div className="flex items-center px-4 py-2 rounded-lg" onClick={() => {
      navigate(`/channel/${id}`)
    }}>
      <img src={icon} alt={label} className="rounded-full h-9 w-9" />
      <span>{label}</span>
    </div>
  )
}

export default SidebarComponentsSub
