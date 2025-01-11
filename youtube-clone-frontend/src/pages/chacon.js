import React from 'react';
import entertainment from '../assets/thumbnail3.png';
const Chacon = () => {
  return (
    <div className="container mx-auto p-4">
      
      <div className={`bg- bg-cover bg-center h-64 w-full mb-8`} ><img className='w-full h-12' src={entertainment}/></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
        <img
          src=""
          alt="Channel avatar"
          className="rounded-full w-24 h-24 mb-4 md:mb-0 md:mr-6"
        />
        <div>
          <h2 className="text-2xl font-bold">Netflix India</h2>
          <p className="text-gray-400">
            @netflixIndia • 13.8M Subscribers • 4.8k videos
          </p>
          <div className="flex space-x-4 mt-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
              Subscribe
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center">
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chacon;
