import React, {useState} from 'react'
import Videoplay from './Videoplay'
import VideoFeed from './VideoFeed'
import Sidebar from '../Navbar/Sidebar'
import { useParams } from 'react-router-dom'


const Video = ({ iisSidebarCollapsed, ionToggleSidebar }) => {
  const [Category, setCategory] = useState(0);
  const { CategoryID, VideoID } = useParams();
  

  return (
    <div className="flex flex-col lg:flex-row max-w mx-auto gap-6">
      {!iisSidebarCollapsed && <Sidebar isCollapsed={iisSidebarCollapsed} Category={Category} setCategory={setCategory} />}
      
      <div className="lg:w-2/3">
        <Videoplay videoId={VideoID}/>
      </div>
      <div className="lg:w-1/3">
        <VideoFeed currentVideoId={VideoID} category={CategoryID}/>
      </div>
    </div>
  )
}

export default Video