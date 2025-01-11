import React, { useState   } from 'react'
import logo from '../assets/yt_logo.png'
import menu_icon from '../assets/menu.png'
import video_icon from '../assets/upload.png'
import notification from '../assets/notification.png'
import account from '../assets/account.png'
import search from '../assets/search.png'
import mic from '../assets/microphone.png'
import { Link , useNavigate } from 'react-router-dom'
const Navbar = ({onToggleSidebar,ionToggleSidebar}) => {
  const handleMenuClick = () => {
    onToggleSidebar();
    ionToggleSidebar();
  };
  const[Keyword, setKeyword]=useState("")
  
  const navigate = useNavigate();

  const handleSearchClick = () => {
    let input = document.getElementById("lol")
    let inputValue = input.value
    setKeyword(inputValue)
    
    navigate(`/search/${inputValue}`)
  }
  return (
    <div className="flex h-14 w-full items-center justify-between bg-white px-4 fixed top-0 z-50">
      <div className='flex items-center'>
      <img src={menu_icon} alt="Menu" className="h-8 w-8 mr-6 cursor-pointer" onClick={handleMenuClick} />
        <Link to='/'><img src={logo} alt="YouTube Logo" className="h-8" /></Link>
        
      </div>

      <div className='flex items-center justify-center flex-grow max-w-2xl'>
        <div className='flex w-full'>
          <input id='lol' type='text' placeholder='Search' className='w-full px-4 py-2 border border-gray-300 rounded-l-full text-base focus:outline-none focus:border-blue-500' />
            <button className='flex items-center justify-center w-16 h-12 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200'>
            <img src={search} alt="Search" className="h-5 w-5" onClick={handleSearchClick}/>
          </button>
        </div>
        <button className='ml-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
          <img src={mic} alt="Voice Search" className="h-5 w-5" />
        </button>
      </div>
    
      <div className='flex items-center space-x-4'>
        <img src={video_icon} alt="Upload" className="h-6 w-6 cursor-pointer" />
        <img src={notification} alt="Notifications" className="h-6 w-6 cursor-pointer" />
        <img src={account} alt="Account" className="h-8 w-8 rounded-full cursor-pointer" />
      </div>
      
    </div>
  )
}

export default Navbar