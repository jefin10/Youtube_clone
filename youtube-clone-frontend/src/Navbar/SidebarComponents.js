import React from 'react';

const SidebarComponents = ({ icon, label, isActive, onClick, isCollapsed }) => {
  return (
    <div
      className={`flex items-center py-2 cursor-pointer ${
        isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
      } ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
      onClick={onClick}
    >
      <img src={icon} alt={label || ''} className="w-6 h-6" />
      {!isCollapsed && label && (
        <span className="ml-5 text-sm font-medium">{label}</span>
      )}
    </div>
  );
};

export default SidebarComponents;