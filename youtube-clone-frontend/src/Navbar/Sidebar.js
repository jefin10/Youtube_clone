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
const Sidebar = ({isCollapsed, Category, setCategory}) => {
  const navigate=useNavigate();
  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId);
    navigate('/', { state: { category: categoryId } });
  };

  console.log("Current Category:", Category);
  return (
    <div className={`bg-white py-4 transition-all duration-300 hide-scrollbar overflow-y-auto flex-shrink-0 border-r ${isCollapsed ? 'w-16 h-full' : 'w-64 h-screen'}`}>
      {!isCollapsed ? (
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1 mb-4">
            <SidebarComponents icon={home} label="Home"  isActive={Category === 0} onClick={() => handleCategoryClick(0)}/>
            <SidebarComponents icon={game_icon} label="Gaming" onClick={() => handleCategoryClick(20)} isActive={Category === 20} />
            <SidebarComponents icon={automobiles} label="Automobiles" onClick={() => handleCategoryClick(2)} isActive={Category === 2} />
            <SidebarComponents icon={sports} label="Sports" onClick={() => handleCategoryClick(17)} isActive={Category === 17} />
            <SidebarComponents icon={entertainment} label="Entertainment" onClick={() => handleCategoryClick(24)} isActive={Category === 24} />
            <SidebarComponents icon={tech} label="Technology" onClick={() => handleCategoryClick(28)} isActive={Category === 28} />
            <SidebarComponents icon={music} label="Music" onClick={() => handleCategoryClick(10)} isActive={Category === 10} />
            <SidebarComponents icon={blogs} label="Blogs" onClick={() => handleCategoryClick(22)} isActive={Category === 22} />
            <hr className='my-2'/>
          </div>
          <div className="subscriber-list mt-4" >
            <span className='font-semibold text-sm text-gray-600 px-4 mb-2 block'>Subscriptions</span>
            <SidebarComponentsSub icon={pew} label="Pewdiepie"/>
            <SidebarComponentsSub icon={aw} label="Alan Walker"/>
            <SidebarComponentsSub icon={dp} label="Dude Perfect"/>
            <SidebarComponentsSub icon={mb} label="MrBeast"/>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1 mb-4">
            <SidebarComponents icon={home} label="" onClick={() => setCategory(0)} isActive={Category === 0} />
            <SidebarComponents icon={game_icon} label="" onClick={() => setCategory(20)} isActive={Category === 20} />
            <SidebarComponents icon={automobiles} label="" onClick={() => setCategory(2)} isActive={Category === 2} />
            <SidebarComponents icon={sports} label="" onClick={() => setCategory(17)} isActive={Category === 17} />
            <SidebarComponents icon={entertainment} label="" onClick={() => setCategory(24)} isActive={Category === 24} />
            <SidebarComponents icon={tech} label="" onClick={() => setCategory(28)} isActive={Category === 28} />
            <SidebarComponents icon={music} label="" onClick={() => setCategory(10)} isActive={Category === 10} />
            <SidebarComponents icon={blogs} label="" onClick={() => setCategory(22)} isActive={Category === 22} />
            <hr className='my-2'/>
          </div>
        </div>
      )}
    </div>
  );
};
//nnote
export default Sidebar;