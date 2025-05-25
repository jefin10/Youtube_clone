import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { API_KEY } from './data'

const SearchSection = ({ isMobile }) => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { Keyword } = useParams()

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!Keyword) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${Keyword}&type=video&key=${API_KEY}`
        )
        const data = await response.json()
        
        const videoIds = data.items.map(item => item.id.videoId).join(',')

        const videoDetailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
        )
        const videoDetailsData = await videoDetailsResponse.json()

        const enrichedResults = data.items.map(item => {
          const details = videoDetailsData.items.find(detail => detail.id === item.id.videoId)
          return { 
            ...item, 
            categoryId: details ? details.snippet.categoryId : null,
            duration: details ? details.contentDetails.duration : null
          }
        })

        setSearchResults(enrichedResults)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setError('Failed to load search results. Please try again.')
      }
      setLoading(false)
    }

    fetchSearchResults()
  }, [Keyword])

  const formatDuration = (duration) => {
    const dur = moment.duration(duration);
    const hours = dur.hours();
    const minutes = dur.minutes();
    const seconds = dur.seconds();

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-8 text-center">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-6xl mx-auto ${isMobile ? 'px-2 py-4' : 'px-4 py-8'}`}>
      <h2 className={`font-bold mb-4 ${isMobile ? 'text-lg mb-3' : 'text-xl mb-6'}`}>
        Search results for "{Keyword}"
      </h2>
      {searchResults.map((result) => (
        <Link 
          key={result.id.videoId} 
          to={`/video/${result.categoryId}/${result.id.videoId}`} 
          className={`flex p-2 mb-4 rounded hover:bg-gray-100 ${isMobile ? 'flex-col' : 'flex-row'}`}
        >
          <div className={`relative flex-shrink-0 ${isMobile ? 'w-full h-48 mb-3' : 'w-64 h-36'}`}>
            <img 
              src={result.snippet.thumbnails.medium.url} 
              alt={result.snippet.title} 
              className="object-cover w-full h-full rounded-lg" 
            />
            {result.duration && (
              <p className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                {formatDuration(result.duration)}
              </p>
            )}
          </div>
          <div className={`flex-grow ${isMobile ? '' : 'ml-4'}`}>
            <h3 className={`font-semibold ${isMobile ? 'text-base mb-2' : 'text-lg'}`}>
              {result.snippet.title}
            </h3>
            <p className="text-sm text-gray-500">
              {moment(result.snippet.publishedAt).fromNow()}
            </p>
            <p className="mt-1 text-sm text-gray-500">{result.snippet.channelTitle}</p>
            <p className={`text-sm text-gray-700 ${isMobile ? 'mt-1 line-clamp-2' : 'mt-2'}`}>
              {result.snippet.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchSection