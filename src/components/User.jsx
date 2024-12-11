import PropTypes from 'prop-types';
import { assets } from '../assets/assets';

function User({ userName, userFollowers }) {
    return (
        <div className="flex gap-2">
            <div className="w-full flex items-center gap-2 rounded-md p-2 hover:bg-slate-100 cursor-default">
                <img className='h-10 w-10 overflow-hidden object-cover rounded-full' src={assets.val} alt="User avatar" />
                <div>
                    <p className='text-slate-700 text-md'>{userName}</p>
                    <small className='block text-slate-500 -translate-y-0.5'>{userFollowers}M followers</small>
                </div>
            </div>
        </div>
    );
}

// Defining PropTypes for type-checking
User.propTypes = {
    userImg: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    userFollowers: PropTypes.number.isRequired
};

// Defining default props
User.defaultProps = {
    // userImg: {assets.val},
    userName: "Admin Ad",
    userFollowers: 51
};

export default User;
