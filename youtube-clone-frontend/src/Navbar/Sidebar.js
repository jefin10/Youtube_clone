import React from 'react';
import home from '../assets/home.png';
import game_icon from '../assets/game_icon.png';
import automobiles from '../assets/automobiles.png';
import sports from '../assets/sports.png';
import entertainment from '../assets/entertainment.png';
import tech from '../assets/tech.png';
import music from '../assets/music.png';
import blogs from '../assets/blogs.png';
import SidebarComponents from './SidebarComponents';
import pew from '../assets/pew.jpg'
import aw from '../assets/aw.jpg'
import dp from '../assets/dp.jpg'
import mb from '../assets/mb.jpg'
import SidebarComponentsSub from './sidebarComponentsSub';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({isCollapsed, Category, setCategory, isMobile}) => {
  const navigate=useNavigate();
  
  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
    navigate('/', { state: { category: categoryId } });
  };

  // On mobile, show overlay when sidebar is expanded
  const sidebarClasses = isMobile 
    ? `fixed top-14 left-0 z-40 bg-white transition-transform duration-300 border-r h-full ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0 w-64'
      }`
    : `bg-white py-4 transition-all duration-300 overflow-hidden flex-shrink-0 border-r ${
        isCollapsed ? 'w-16 h-full' : 'w-64 h-screen'
      }`;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 top-14"
          onClick={() => setCategory(prev => prev)} // Close sidebar on overlay click
        />
      )}
      
      <div className={sidebarClasses}>
        <div className="py-4">
          {!isCollapsed ? (
            <div className="flex flex-col">
              <div className="flex flex-col mb-4 space-y-1">
                <SidebarComponents icon={home} label="Home" isActive={Category === 0} onClick={() => handleCategoryClick(0)}/>
                <SidebarComponents icon={game_icon} label="Gaming" onClick={() => handleCategoryClick(20)} isActive={Category === 20} />
                <SidebarComponents icon={automobiles} label="Automobiles" onClick={() => handleCategoryClick(2)} isActive={Category === 2} />
                <SidebarComponents icon={sports} label="Sports" onClick={() => handleCategoryClick(17)} isActive={Category === 17} />
                <SidebarComponents icon={entertainment} label="Entertainment" onClick={() => handleCategoryClick(24)} isActive={Category === 24} />
                <SidebarComponents icon={tech} label="Technology" onClick={() => handleCategoryClick(28)} isActive={Category === 28} />
                <SidebarComponents icon={music} label="Music" onClick={() => handleCategoryClick(10)} isActive={Category === 10} />
                <SidebarComponents icon={blogs} label="Blogs" onClick={() => handleCategoryClick(22)} isActive={Category === 22} />
                <hr className='my-2'/>
              </div>
              <div className="mt-4 subscriber-list">
                <span className='block px-4 mb-2 text-sm font-semibold text-gray-600'>Subscriptions</span>
                <SidebarComponentsSub icon={pew} label="Pewdiepie" id='UC-lHJZR3Gqxm24_Vd_AJ5Yw'/>
                <SidebarComponentsSub icon={aw} label="Alan Walker" id='UCJrOtniJ0-NWz37R30urifQ'/>
                <SidebarComponentsSub icon={dp} label="Dude Perfect" id='UCRijo3ddMTht_IHyNSNXpNQ'/>
                <SidebarComponentsSub icon={mb} label="MrBeast" id='UCX6OQ3DkcsbYNE6H8uQQuVA'/>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col mb-4 space-y-1">
                <SidebarComponents icon={home} label="" isCollapsed={true} onClick={() => handleCategoryClick(0)} isActive={Category === 0} />
                <SidebarComponents icon={game_icon} label="" isCollapsed={true} onClick={() => handleCategoryClick(20)} isActive={Category === 20} />
                <SidebarComponents icon={automobiles} label="" isCollapsed={true} onClick={() => handleCategoryClick(2)} isActive={Category === 2} />
                <SidebarComponents icon={sports} label="" isCollapsed={true} onClick={() => handleCategoryClick(17)} isActive={Category === 17} />
                <SidebarComponents icon={entertainment} label="" isCollapsed={true} onClick={() => handleCategoryClick(24)} isActive={Category === 24} />
                <SidebarComponents icon={tech} label="" isCollapsed={true} onClick={() => handleCategoryClick(28)} isActive={Category === 28} />
                <SidebarComponents icon={music} label="" isCollapsed={true} onClick={() => handleCategoryClick(10)} isActive={Category === 10} />
                <SidebarComponents icon={blogs} label="" isCollapsed={true} onClick={() => handleCategoryClick(22)} isActive={Category === 22} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;