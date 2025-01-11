import React from 'react'

const VideoTile = ({ thumbnail, channelImg, description, channelName, views, lastTime, videoLength }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-max">
  <div className="relative">
    <img src={thumbnail} alt={`${channelName} video thumbnail`} className="w-full h-48 object-cover" />
    
    <p className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">{videoLength}</p>
  </div>
  <div className="p-3">
    <div className="flex items-start space-x-3">
      <img src={channelImg} alt={`${channelName} channel avatar`} className="w-9 h-9 rounded-full" />
      <div className="flex-1">
        <p className="font-semibold text-sm line-clamp-2 mb-1">{description}</p>
        <p className="text-gray-600 text-xs">{channelName}</p>
        <p className="text-gray-600 text-xs">{views} views • {lastTime}</p>
      </div>
    </div>
  </div>
</div>
  )
}

export default VideoTile