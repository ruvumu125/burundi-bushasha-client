import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
// import Slider from '../../components/Slider';
import Post from '../../components/Post';
import { assets } from '../../assets/assets';
// import Sidebar from '../../components/Sidebar';

function Profile() {
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const iconRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <>
      <Navbar ref={iconRef} onClick={toggleSidebar} />
      <div className="max-w-[1200px] m-auto px-4s">
        <div className="relative w-full lg:h-80 h-52 bg-donkey-brown-100 overflow-hidden rounded-none lg:rounded-b-3xl">
          <small className="absolute w-[115px] right-4 top-4 flex gap-2 justify-center items-center cursor-pointer text-white bg-gray-900 bg-opacity-30 p-2 rounded-full">
            <i className="fi fi-rr-pencil translate-y-0.5"></i>
            Edit cover
          </small>
          <img className='w-full h-full object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8F-9zYH8WnIp746qZrmB2UclOwI2Ays9yWg&s' alt="" />
        </div>

        <div className="relative w-full h-[150px] grid grid-cols-1 place-items-center">

          <div className="relative lg:absolute lg:left-14 lg:w-40 lg:h-40 w-32 h-32 -translate-y-1/2  border-4 lg:border-8 border-white bg-white rounded-full overflow-hidden">
            <img className='w-full h-full object-cover' src={assets.val} alt="" />
          </div>

          {/* Online status */}
          <div className="absolute lg:left-14 lg:w-40 lg:h-40 w-32 h-32 -translate-y-1/2">
            <div className="w-6 h-6 absolute bottom-3 right-4 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="w-full flex flex-col lg:flex-row lg:justify-between items-center lg:pl-[275px] lg:translate-y-0 -translate-y-1/2 gap-4 px-4 ">

            <div className="flex flex-col items-center lg:items-start gap-2">
              <h1 className='lg:text-4xl text-2xl flex gap-2 items-center font-bold text-gray-700'>
                ID/Username
                <i className="fi fi-rr-check-circle text-primary-accent text-xl translate-y-1"></i>
              </h1>
              <p className='text-gray-500'>32K Followers · Junior Member</p>
              <p className='hidden text-gray-500'>2 Posts · Gishora, Gitega</p>
            </div>

            <div className=" ">
              <small className="w-[115px] right-4 top-4 flex gap-2 justify-center items-center cursor-pointer text-white bg-donkey-brown-500 p-2 rounded-full">
                <i className="fi fi-rr-user-pen translate-y-0.5"></i>
                Edit Profile
              </small>
            </div>

          </div>

        </div>

        <div className="flex flex-col-reverse lg:mt-0 mt-20 gap-4 md:flex-row lg:px-0 px-4">


          {!sidebar &&
            <div className="w-full grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pb-10">

              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />
              <Post />

            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Profile