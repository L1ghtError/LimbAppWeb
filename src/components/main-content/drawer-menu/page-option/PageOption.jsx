import './pageOptionStyles.css';
import PropTypes from 'prop-types';
function PageOption({ placeholder }) {
  return (
    <button className="navOption">
      <text className="navPlaceholder">{placeholder}</text>
    </button>
  );
}

PageOption.propTypes = {
  placeholder: PropTypes.string.isRequired
};
export default PageOption;
