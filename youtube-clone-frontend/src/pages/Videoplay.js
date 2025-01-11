import React, { useState, useEffect } from "react";
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import share from '../assets/share.png';
import save from '../assets/save.png';
import channelAvatar from '../assets/mb.jpg';
import userAvatar from '../assets/mb.jpg';
import { API_KEY } from './data';
import moment from 'moment'; 
import { val_convert } from './data';

const Videoplay = ({ videoId }) => {
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;
        const videoResponse = await fetch(videoUrl);
        const videoJson = await videoResponse.json();
        setVideoData(videoJson.items[0]);

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

  if (!videoData) return <div>Loading...</div>;
  const description = videoData.snippet.description;
  const sentences = description.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/);
  const firstTwoSentences = sentences.slice(0, 2).join(' ');

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <div className="aspect-w-16 aspect-h-9 mb-4">
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

      <h3 className="text-xl font-bold mb-2">{videoData.snippet.title}</h3>
      <div className="flex justify-between items-center mb-4">
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

      {/* Channel Subscribe Section */}
      <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
        <div className="flex items-center">
          <img src={channelAvatar} alt="Channel Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h4 className="font-bold">{videoData.snippet.channelTitle}</h4>
            <p className="text-sm text-gray-500">{val_convert(videoData.statistics.commentCount)} subscribers</p>
          </div>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Subscribe
        </button>
      </div>

      {/* Video Description */}
      <div className="mt-4 mb-6">
        <p className="text-sm text-gray-700">
          {firstTwoSentences}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h4 className="font-bold mb-4">{val_convert(videoData.statistics.commentCount)} Comments</h4>
        
        {/* Comment Input */}
        <div className="flex items-start mb-6">
          <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end mt-2">
              <button className="text-sm text-gray-500 mr-2">Cancel</button>
              <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded">Comment</button>
            </div>
          </div>
        </div>

        {/* Individual Comments */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex">
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User Avatar" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <p className="font-semibold">
                  {comment.snippet.topLevelComment.snippet.authorDisplayName} 
                  <span className="text-sm text-gray-500 font-normal ml-2">
                    {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}
                  </span>
                </p>
                <p className="text-sm mt-1">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
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