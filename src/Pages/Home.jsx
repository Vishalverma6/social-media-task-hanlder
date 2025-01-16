import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-900 min-h-screen flex gap-5 flex-col items-center justify-center p-6 text-center">
      {/* Main Heading */}
     <div>
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Simplify Your Social Media Management
        </h1>
        <p className="text-richblack-300 text-lg md:text-xl max-w-3xl mb-10">
            Manage all your social media accounts from a single dashboard. Schedule, analyze, and grow with ease.
        </p>
     </div>

      {/* Section 1 */}
      <div className="bg-blue-700 p-6 rounded-lg shadow-md w-full max-w-4xl mb-8">
        <h2 className="text-white text-3xl font-semibold mb-2">
          One Place for All Your Social Media Needs
        </h2>
        <p className="text-richblack-200 text-base md:text-lg">
          Schedule posts, track analytics, and grow your audience—all in one place!
        </p>
      </div>

      {/* Section 2 */}
      <div>
         <Link to="/sendData">
            <button className='bg-yellow-100 text-2xl pt-1 px-[7px] rounded-md '>
                Explore Now !
            </button>
         </Link>
      </div>
      
       {/* section 3  */}
      <div className="bg-blue-600 p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-white text-3xl font-semibold mb-2">
          Be Everywhere, Effortlessly
        </h2>
        <p className="text-gray-200 text-base md:text-lg">
          Let your content shine across all platforms while we handle the rest.
        </p>
      </div>

     
      
    </div>
  );
};

export default Home;
