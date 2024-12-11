import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';

function Post({ VideoFrame, caption, className }) {
    return (
        <div className={`min-w-[275px] h-[250px] flex flex-col bg-white rounded-lg overflow-hidden ${className}`}>
            <div className="flex justify-between py-2 px-4">
                <div className="flex items-center gap-3">
                    <Link to='/profile' className="w-10 h-10 overflow-hidden rounded-full">
                        <img src={assets.val} alt="" />
                    </Link>
                    <div className="flex flex-col">
                        <p className='text-base text-slate-800'>ID/Name here</p>
                        <p className="text-sm text-slate-500">Gitega - 2 min ago</p>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{56} followers</p>
            </div>
            {caption &&
                <p className='text-[14px]'>{caption}</p>
            }
            <Link to='/post' className="overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src="https://www.ohchr.org/sites/default/files/styles/hero_image_2/public/Burundi-UNI180058.jpg?itok=8ez0BwIq"
                    alt=""
                />
            </Link>
            <iframe className="hidden w-full h-full object-cover" width="560" height="315" src={VideoFrame} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

    )
}

Post.propTypes = {
    VideoFrame: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Post