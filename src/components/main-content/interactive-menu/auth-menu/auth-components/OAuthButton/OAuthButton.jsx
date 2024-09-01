import { useRef, useEffect } from 'react';
import './oAuthButtonStyles.css';
import PropTypes from 'prop-types';
import { getBackendURL } from '../../../../../../scripts/api/networkCommunication';

function OAuthButton({ oAuthProviders }) {
  const oAuthWindowRef = useRef(undefined);

  useEffect(() => {
    const channel = new BroadcastChannel(oAuthProviders.link);

    channel.onmessage = (event) => {
      if (event.data === oAuthProviders.closeWindowsSuccess) {
        oAuthWindowRef.current.close();
        window.location.reload();
      } else if (event.data === oAuthProviders.closeWindowsErr) {
        console.log('Err', event.data);
      }
    };

    return () => {
      channel.close();
    };
  }, [oAuthProviders]);

  const handleClick = () => {
    // Close the previous window if it's still open
    if (oAuthWindowRef.current && !oAuthWindowRef.current.closed) {
      oAuthWindowRef.current.close();
    }
    const baseUrl = getBackendURL();

    oAuthWindowRef.current = window.open(
      `${baseUrl}/${oAuthProviders.link}`,
      '_blank',
      'width=600,height=600'
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
