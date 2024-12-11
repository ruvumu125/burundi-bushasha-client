import { useState, useEffect } from 'react';
import Post from '../../components/Post';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

function PostComp() {
  const [isVisible, setIsVisible] = useState(true);

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
        <div className="max-w-[1400px] m-auto flex flex-col pt-3 md:pr-3 pr-0">
          <div className="w-full flex gap-4">
            <div className='w-full px-3 lg:px-0 pb-10'>
                <Post
                  className='sm:min-h-[515px] min-h-0'
                  VideoFrame={'https://www.youtube.com/embed/DlMAIYd7-J4?si=TUVdilP_SuEDiHEA'}
                />
                <h2 className='text-3xl font-semibold my-6 text-slate-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque expedita iste quod!</h2>
                <p className='text-sm text-slate-600 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, nesciunt velit, voluptates exercitationem possimus ducimus, rem iste consequatur at et aliquam itaque! Sapiente ea odit inventore omnis incidunt architecto cupiditate eum sit amet, praesentium, quo totam natus pariatur nobis perspiciatis quos nam reprehenderit, eos fugit ex consectetur atque a quia! Eaque culpa consequuntur accusamus nulla, cum alias est nemo eveniet esse, perspiciatis explicabo nisi perferendis magnam veniam iure fugit earum architecto saepe ipsa maiores quidem. Omnis quae dicta praesentium dolorem ab. Esse tenetur quae minima repudiandae eaque velit eligendi numquam iure officia, nulla obcaecati et? Repellendus maiores praesentium et quis qui, commodi sed, iure quaerat placeat possimus eum fuga voluptates maxime quo minus nobis dolores amet ab reprehenderit. Quam recusandae incidunt deserunt neque ducimus aspernatur atque, modi sint magnam quo amet doloremque nisi accusantium commodi sit tempora expedita dignissimos ad iure ex nesciunt optio est? Officiis vitae doloremque nemo ipsum quod blanditiis, vel possimus eius beatae doloribus ab excepturi dicta deleniti quibusdam consequatur neque, ullam delectus velit molestiae. Harum, ea? Impedit libero, saepe perferendis assumenda corporis, necessitatibus, quidem reiciendis laboriosam consequatur provident quisquam explicabo voluptatum. Esse mollitia, ab ex magnam modi voluptate consequuntur in facilis nobis dolores blanditiis reiciendis, dolore deleniti adipisci id ducimus vitae officiis eius commodi! Unde velit nemo totam, beatae ab libero odio nesciunt reprehenderit quasi sit laudantium deserunt quibusdam cum amet placeat quae aperiam exercitationem natus omnis maxime ducimus, eum dicta tempore porro. Rem repellendus ratione ducimus nam culpa, voluptatum itaque minus enim earum? Ut, sit!</p>
            </div>
            <div className="hidden md:w-[375px] w-full min-h-screen lg:flex flex-col gap-4">
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
      </div>
    </>
  );
}

export default PostComp;
