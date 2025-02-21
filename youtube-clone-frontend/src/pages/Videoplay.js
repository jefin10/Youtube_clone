import React, { useState, useEffect } from "react";
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import userAvatar from '../assets/mb.jpg';
import { API_KEY } from './data';
import moment from 'moment'; 
import { val_convert } from './data';
import { useNavigate } from "react-router-dom";

const Videoplay = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
        const videoResponse = await fetch(videoUrl);
        const videoJson = await videoResponse.json();
        setVideoData(videoJson.items[0]);

        const channelId = videoJson.items[0].snippet.channelId;
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
        const channelResponse = await fetch(channelUrl);
        const channelJson = await channelResponse.json();
        setChannelData({
          channelId:videoJson.items[0].snippet.channelId,
          thumbnailUrl: channelJson.items[0].snippet.thumbnails.default.url,
          subscriberCount: channelJson.items[0].statistics.subscriberCount
        });

        const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
        const commentsResponse = await fetch(commentsUrl);
        const commentsJson = await commentsResponse.json();
        setComments(commentsJson.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVideoData();
  }, [videoId]);
  const navigate = useNavigate()
  if (!videoData || !channelData) return <div>Loading...</div>;
  const description = videoData.snippet.description;
  const sentences = description.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
  const firstTwoSentences = sentences.slice(0, 2).join(' ');
  const handleChannelClick=() =>{
    navigate(`/channel/${channelData.channelId}`)
  }
  return (
    <div className="max-w-4xl px-4 mx-auto mt-8">
      <div className="mb-4 aspect-w-16 aspect-h-9">
        <iframe 
          className="w-full" 
          style={{ height: '37vw' }} 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>

      <h3 className="mb-2 text-xl font-bold">{videoData.snippet.title}</h3>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {val_convert(videoData.statistics.viewCount)} views • {moment(videoData.snippet.publishedAt).fromNow()}
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-sm">
            <img src={like} alt="Like" className="w-5 h-5" />
            <span>{val_convert(videoData.statistics.likeCount)}</span>
          </button>
          <button className="flex items-center space-x-1 text-sm">
            <img src={share} alt="Share" className="w-5 h-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-1 text-sm">
            <img src={save} alt="Save" className="w-5 h-5" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
        <div className="flex items-center" onClick={handleChannelClick}>
          <img src={channelData.thumbnailUrl} alt="Channel Avatar" className="w-10 h-10 mr-3 rounded-full" />
          <div>
            <h4 className="font-bold">{videoData.snippet.channelTitle}</h4>
            <p className="text-sm text-gray-500">{val_convert(channelData.subscriberCount)} subscribers</p>
          </div>
        </div>
        <button className="px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700">
          Subscribe
        </button>
      </div>

      <div className="mt-4 mb-6">
        <p className="text-sm text-gray-700">
          {firstTwoSentences}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="mb-4 font-bold">{val_convert(videoData.statistics.commentCount)} Comments</h4>
        
        <div className="flex items-start mb-6">
          <img src={userAvatar} alt="User Avatar" className="w-8 h-8 mr-3 rounded-full" />
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end mt-2">
              <button className="mr-2 text-sm text-gray-500">Cancel</button>
              <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded">Comment</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex">
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Avatar" className="w-8 h-8 mr-3 rounded-full" />
              <div>
                <p className="font-semibold">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName} 
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                  </span>
                </p>
                <p className="mt-1 text-sm">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="flex items-center mt-2 space-x-3 text-sm text-gray-500">
                  <button className="flex items-center">
                    <img src={like} alt="Like" className="w-4 h-4 mr-1" /> 
                    {val_convert(comment.snippet.topLevelComment.snippet.likeCount)}
                  </button>
                  <button className="flex items-center">
                    <img src={dislike} alt="Dislike" className="w-4 h-4 mr-1" />
                  </button>
                  <button>Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Videoplay;