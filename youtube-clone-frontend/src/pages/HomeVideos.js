import React, { useEffect, useState } from 'react';
import VideoTile from './VideoTile';
import { API_KEY } from './data';
import moment from 'moment'; 
import { Link } from 'react-router-dom';
import mb from '../assets/mb.jpg';
import { val_convert } from './data';
import 'moment-duration-format';

const HomeVideos = ({ Category }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChannelDetails = async (channelId) => {
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
    try {
      const response = await fetch(channelUrl);
      const data = await response.json();
      return data.items[0].snippet.thumbnails.default.url;
    } catch (error) {
      console.error('Error fetching channel details:', error);
      return null;
    }
  };

  const fetchdata = async () => {
    let videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`;
    if (Category) {
      videoList_url += `&videoCategoryId=${Category}`;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(videoList_url);
      const data = await response.json();
      
      if (data.items) {
        const videosWithChannelImages = await Promise.all(
          data.items.map(async (item) => {
            const channelImage = await fetchChannelDetails(item.snippet.channelId);
            return { ...item, channelImage };
          })
        );
        setData(videosWithChannelImages);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load videos. Please try again.');
      setData([]);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [Category]);

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

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button 
            onClick={fetchdata}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-8 text-center">
          <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-700 animate-bounce [animation-delay:.7s]"></div>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item, index) => {
            return (
              <Link key={item.id} to={`video/${item.snippet.categoryId}/${item.id}`}>
                <VideoTile
                  thumbnail={item.snippet.thumbnails.medium.url}
                  channelImg={item.channelImage || mb}
                  description={item.snippet.title}
                  channelName={item.snippet.channelTitle}
                  views={val_convert(item.statistics.viewCount)}
                  lastTime={moment(item.snippet.publishedAt).fromNow()}
                  videoLength={formatDuration(item.contentDetails.duration)}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomeVideos;