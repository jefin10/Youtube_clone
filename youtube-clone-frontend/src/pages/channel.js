import React from 'react'
import Sidebar from '../Navbar/Sidebar'
import Chacon from './chacon'

const Channel = () => {
  return (
    <div className="flex w-full">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex-grow">
        <Chacon/>
      </div>
    </div>
  )
}

export default Channel
