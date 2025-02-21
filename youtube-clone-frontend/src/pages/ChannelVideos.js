import React, { useEffect, useState } from "react";
import VideoTile from "./VideoTile";
import { API_KEY } from "./data";
import moment from "moment";
import { Link } from "react-router-dom";
import mb from "../assets/mb.jpg";
import { val_convert } from "./data";
import "moment-duration-format";

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const [channelImage, setChannelImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Channel Thumbnail
  const fetchChannelDetails = async () => {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelImage(data.items[0].snippet.thumbnails.default.url);
      }
    } catch (error) {
      console.error("Error fetching channel details:", error);
      setChannelImage(mb); // Fallback image
    }
  };

  // Fetch Videos from Channel
  const fetchVideos = async () => {
    setIsLoading(true);

    try {
      // Step 1: Get the Uploads Playlist ID
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelUrl);
      const channelData = await channelResponse.json();
      const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

      // Step 2: Get Videos from the Playlist
      const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`;
      const playlistResponse = await fetch(playlistUrl);
      const playlistData = await playlistResponse.json();
      const videoIds = playlistData.items.map((item) => item.contentDetails.videoId).join(",");

      // Step 3: Get Video Details (Statistics & Duration)
      const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`;
      const videosResponse = await fetch(videosUrl);
      const videosData = await videosResponse.json();

      // Step 4: Process Data
      const videoList = videosData.items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        channelTitle: video.snippet.channelTitle,
        views: val_convert(video.statistics.viewCount),
        publishedAt: moment(video.snippet.publishedAt).fromNow(),
        duration: formatDuration(video.contentDetails.duration),
      }));

      // Step 5: Sort by Popularity (Views) and Update State
      const sortedVideos = videoList.sort((a, b) => b.views - a.views);
      setVideos(sortedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    }

    setIsLoading(false);
  };

  // Format Duration
  const formatDuration = (duration) => {
    const dur = moment.duration(duration);
    const hours = dur.hours();
    const minutes = dur.minutes();
    const seconds = dur.seconds();

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    fetchChannelDetails();
    fetchVideos();
  }, [channelId]); // Runs when channelId changes

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video, index) => (
            <Link key={video.id} to={`video/1/${video.id}`}>
              <VideoTile
                thumbnail={video.thumbnail}
                channelImg={channelImage || mb}
                description={video.title}
                channelName={video.channelTitle}
                views={video.views}
                lastTime={video.publishedAt}
                videoLength={video.duration}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ChannelVideos;
