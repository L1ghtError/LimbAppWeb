import './controlButtonStyles.css';
import PropTypes from 'prop-types';
// TODO: make it regular <button></button>
// TODO: extent porps, to simulate <a></a> behavior
function ControlButton({ btnIcon, btnDesc, onClick = () => {} }) {
  return (
    <div className="controlButton" onClick={onClick}>
      <img draggable="false" src={btnIcon} className="btnIcon"></img>
      <div className="btnDesc">{btnDesc}</div>
    </div>
  );
}

ControlButton.propTypes = {
  btnIcon: PropTypes.string.isRequired,
  btnDesc: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default ControlButton;
