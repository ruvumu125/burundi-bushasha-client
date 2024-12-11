import PropTypes from 'prop-types';

const Search = ({children}) => {
  return (
    <div className="fixed top-16 left-0 w-full bg-white drop-shadow-sm py-4 px-3 z-50">
        {children}
    </div>
  )
}

Search.propTypes = {
    children: PropTypes.node.isRequired
};

export default Search