import PropTypes from 'prop-types';

const Button = ({ children, onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`${className} text-white w-fit md:min-w-32 h-10 flex items-center justify-center px-4 rounded-full`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default Button;
