import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import {API_KEY} from './data'

const SearchSection = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(true)
  const { Keyword } = useParams()

  useEffect(() => {
    const fetchSearchResults = async () => {
      
      setLoading(true)
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
          return { ...item, categoryId: details ? details.snippet.categoryId : null }
        })

        setSearchResults(enrichedResults)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
      setLoading(false)
    }

    fetchSearchResults()
  }, [Keyword])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {searchResults.map((result) => (
        <Link key={result.id.videoId} to={`/video/${result.categoryId}/${result.id.videoId}`} className="flex mb-4 hover:bg-gray-100 p-2 rounded">
          <div className="w-64 h-36 relative flex-shrink-0">
            <img src={result.snippet.thumbnails.medium.url} alt={result.snippet.title} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold">{result.snippet.title}</h3>
            <p className="text-sm text-gray-500">
              {moment(result.snippet.publishedAt).fromNow()}
            </p>
            <p className="text-sm text-gray-500 mt-1">{result.snippet.channelTitle}</p>
            <p className="text-sm text-gray-700 mt-2">{result.snippet.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SearchSection