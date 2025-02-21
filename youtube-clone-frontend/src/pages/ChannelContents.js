import React, { useState,useEffect } from 'react';
import entertainment from '../assets/thumbnail3.png';
import ChannelVideos from './ChannelVideos';
import { useParams } from 'react-router-dom';
import { API_KEY } from "./data";
import mb from "../assets/mb.jpg";
import { val_convert } from "./data";

const ChannelContents = () => {
  const { channelId } = useParams();
  const [channelImage, setChannelImage] = useState(null);
  const [channelData, setChannelData] = useState({
    title: "Loading...",
    customUrl: "",
    thumbnailUrl: null,
    bannerUrl: null,
    subscriberCount: "0",
    videoCount: "0",
    description: "",
    isLoading: true
  });
  const fetchChannelDetails = async () => {
    const detailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`;
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const channelInfo = data.items[0];
      
      setChannelData({
        title: channelInfo.snippet.title,
        customUrl: channelInfo.snippet.customUrl || channelInfo.snippet.title.replace(/\s+/g, ''),
        thumbnailUrl: channelInfo.snippet.thumbnails.high.url || mb,
        bannerUrl: channelInfo.brandingSettings.image?.bannerExternalUrl || null,
        subscriberCount: val_convert(channelInfo.statistics.subscriberCount),
        videoCount: parseInt(channelInfo.statistics.videoCount).toLocaleString(),
        description: channelInfo.snippet.description,
        isLoading: false
      });
    }
    };
    useEffect(() => {
        fetchChannelDetails();
      }, [channelId]);
  return (
    <div className="container p-4 mx-auto">
      
      {channelData.bannerUrl && (
  <div className="w-full mb-8 bg-center bg-cover h-72">
    <img className="w-full h-full" src={channelData.bannerUrl} />
  </div>
)}

    
    <div className="flex flex-col items-start mb-8 md:flex-row md:items-center">
      <img
        src={channelData.thumbnailUrl}
        alt="Channel avatar"
        className="w-24 h-24 mb-4 rounded-full md:mb-0 md:mr-6"
      />
      <div>
        <h2 className="text-2xl font-bold">{channelData.title}</h2>
        <p className="text-gray-400">
          {channelData.customUrl} • {channelData.subscriberCount} Subscribers • {channelData.videoCount} videos
        </p>
        <div className="flex mt-4 space-x-4">
          <button className="px-4 py-2 font-semibold text-white bg-red-600 rounded-full">
            Subscribe
          </button>
          
        </div>
      </div>
    </div>
    <div>
      <div>Videos</div>
      <ChannelVideos channelId={channelId}/>
    </div>
  </div>
  );
};

export default ChannelContents;
