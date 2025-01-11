import React from 'react';

const SidebarComponents = ({ icon, label, onClick, isActive }) => {
  return (
    <div 
      className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
        isActive ? 'bg-gray-200 font-bold' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="h-9 w-9 mr-3" />
      {label && <span>{label}</span>}
      
    </div>
  );
};

export default SidebarComponents;