import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { API_KEY, val_convert } from './data';

const VideoFeed = ({ currentVideoId , category}) => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

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

  const fetchRecommendedVideos = async () => {
    let videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&videoCategoryId=${category}&regionCode=US&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_url);
      const data = await response.json();
      if (data.items) {
        const filteredVideos = data.items.filter(item => item.id !== currentVideoId);
        const videosWithChannelImages = await Promise.all(
          filteredVideos.map(async (item) => {
            const channelImage = await fetchChannelDetails(item.snippet.channelId);
            return { ...item, channelImage };
          })
        );
        setRecommendedVideos(videosWithChannelImages);
      } else {
        setRecommendedVideos([]);
      }
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
      setRecommendedVideos([]);
    }
  };

  useEffect(() => {
    fetchRecommendedVideos();
  }, [currentVideoId]);

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

  return (
    <div className="w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">Recommended videos</h2>
      {recommendedVideos.map((video) => (
        <Link key={video.id} to={`/video/${video.snippet.categoryId}/${video.id}`}>
          <div className="flex mb-4 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
            <div className="flex-shrink-0 w-40 h-24 mr-4 relative">
              <img src={video.snippet.thumbnails.medium.url} alt="Video thumbnail" className="w-full h-full object-cover rounded-lg" />
              <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                {formatDuration(video.contentDetails.duration)}
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="text-sm font-semibold line-clamp-2">{video.snippet.title}</h3>
              <div>
                <p className="text-xs text-gray-500">{video.snippet.channelTitle}</p>
                <p className="text-xs text-gray-500">
                  {val_convert(video.statistics.viewCount)} views • {moment(video.snippet.publishedAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoFeed;