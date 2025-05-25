import React, { useState } from 'react'
import logo from '../assets/yt_logo.png'
import menu_icon from '../assets/menu.png'
import video_icon from '../assets/upload.png'
import notification from '../assets/notification.png'
import account from '../assets/account.png'
import search from '../assets/search.png'
import mic from '../assets/microphone.png'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ onToggleSidebar, isMobile }) => {
  const [keyword, setKeyword] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const navigate = useNavigate();

  const handleMenuClick = () => {
    onToggleSidebar();
  };

  const handleSearchClick = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
      setShowSearch(false);
    }
  }

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  }

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  }

  if (isMobile && showSearch) {
    return (
      <div className="fixed top-0 z-50 flex items-center w-full px-4 bg-white h-14">
        <button onClick={toggleSearch} className="mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className='flex flex-grow'>
          <input 
            type='text' 
            placeholder='Search' 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='w-full px-4 py-2 text-base border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500' 
            onKeyDown={handleEnterPress}
            autoFocus
          />
          <button 
            onClick={handleSearchClick}
            className='flex items-center justify-center w-16 h-12 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200'
          >
            <img src={search} alt="Search" className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-0 z-50 flex items-center justify-between w-full px-4 bg-white h-14">
      <div className='flex items-center'>
        <img src={menu_icon} alt="Menu" className="w-8 h-8 mr-4 cursor-pointer md:mr-6" onClick={handleMenuClick} />
        <Link to='/'><img src={logo} alt="YouTube Logo" className="h-6 md:h-8" /></Link>
      </div>

      {!isMobile ? (
        <div className='flex items-center justify-center flex-grow max-w-2xl'>
          <div className='flex w-full'>
            <input 
              type='text' 
              placeholder='Search' 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className='w-full px-4 py-2 text-base border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500' 
              onKeyDown={handleEnterPress}
            />
            <button 
              onClick={handleSearchClick}
              className='flex items-center justify-center w-16 h-12 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200'
            >
              <img src={search} alt="Search" className="w-5 h-5" />
            </button>
          </div>
          <button className='p-2 ml-4 bg-gray-100 rounded-full hover:bg-gray-200'>
            <img src={mic} alt="Voice Search" className="w-5 h-5" />
          </button>
        </div>
      ) : null}
    
      <div className='flex items-center space-x-2 md:space-x-4'>
        {isMobile && (
          <button onClick={toggleSearch}>
            <img src={search} alt="Search" className="w-6 h-6 cursor-pointer" />
          </button>
        )}
        <img src={video_icon} alt="Upload" className="w-5 h-5 cursor-pointer md:w-6 md:h-6" />
        <img src={notification} alt="Notifications" className="w-5 h-5 cursor-pointer md:w-6 md:h-6" />
        <img src={account} alt="Account" className="w-7 h-7 rounded-full cursor-pointer md:w-8 md:h-8" />
      </div>
    </div>
  )
}

export default Navbar