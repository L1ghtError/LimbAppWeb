import { useRef } from 'react';
import './oAuthButtonStyles.css';
import PropTypes from 'prop-types';
import { getBackendURL } from '../../../../../../scripts/api/networkCommunication';

function OAuthButton({ oAuthProviders }) {
  const oAuthWindowRef = useRef(undefined);

  const handleClick = () => {
    // Close the previous window if it's still open
    if (oAuthWindowRef.current && !oAuthWindowRef.current.closed) {
      oAuthWindowRef.current.close();
    }

    const baseUrl = getBackendURL();
    oAuthWindowRef.current = window.open(
      `${baseUrl}/${oAuthProviders.link}`,
      '_blank',
      'width=600,height=600,noopener'
    );
  };

  return (
    <button className="oAuthButton" onClick={handleClick}>
      <div className="oAuthButton__content">
        <img
          src={oAuthProviders.icon}
          draggable="false"
          className="oAuthButton__icon"
          alt={`${oAuthProviders.name} icon`}
        />
        <div className="oAuthButton__description">Login with {oAuthProviders.name}</div>
      </div>
    </button>
  );
}

OAuthButton.propTypes = {
  oAuthProviders: PropTypes.object.isRequired
};

export default OAuthButton;
