import './oauthGoogleStyles.css';
import { useEffect } from 'react';
import AuthService from '../../../scripts/api/auth';
import { getGoogleOAuthProvider } from '../../../scripts/getAvalibleOAuthProviders';
function OauthGoogle() {
  const provider = getGoogleOAuthProvider();

  useEffect(() => {
    const channel = new BroadcastChannel(provider.link);

    AuthService.authGoogleCallback(window.location.search)
      .then(function () {
        channel.postMessage(provider.closeWindowsSuccess);
        channel.close();
        //  window.close();
      })
      .catch(function (error) {
        if (error.response) {
          channel.postMessage(provider.closeWindowsErr);
          console.log('er');
          channel.close();
          //  window.close();
        }
      });
  }, [provider]);

  return (
    <div className="oauth__description">{`Please wait until ${provider.name} authentication is complete.`}</div>
  );
}

export default OauthGoogle;
