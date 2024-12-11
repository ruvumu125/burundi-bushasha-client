import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {useLocation} from "react-router-dom";
import {useAuth} from "../../components/auth/AuthContext.jsx";

function Home() {
  const [isVisible, setIsVisible] = useState(true);

  const { message, clearMessage } = useAuth();

  // Handle screen width change to hide or show Sidebar
  useEffect(() => {


    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <Navbar />

      <div className="w-full flex gap-4 bg-slate-100">

        {isVisible && <Sidebar />}
        <div className="max-w-[1400px] m-auto flex flex-col lg:pr-3 pr-0">
          <div className="w-full h-60 bg-white lg:mt-4 mt-0 mb-4 lg:rounded-lg rounded-none overflow-hidden">
            <img
              className='w-full h-full object-cover'
              src="https://lutheranworld.org/sites/default/files/2024-02/burundi-communities-group.jpg"
              alt="Community Group"
            />
          </div>
          <div className="w-full min-h-screen grid xl:grid-cols-4 lg:grid-cols-3 md:px-0 px-3 pb-10 md:grid-cols-2 grid-cols-1 gap-4">
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            /><Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
            />
            <Post
              VideoFrame={'https://www.youtube.com/embed/vuIPxcTU2CE?si=kALpmj_iNEGxSW4g'}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
