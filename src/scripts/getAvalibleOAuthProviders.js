import googleIcon from '../assets/icons/Google__G__logo.svg';
import endPoints from './api/endPoints';
const avalibleProviders = [
  {
    name: 'Google',
    icon: googleIcon,
    link: endPoints('googleOAuth').url,
    closeWindowsSuccess: 'closeOauthWindow',
    closeWindowsErr: 'closeOauthWindowErr'
  }
];

export const getAvalibleOAuthProviders = () => {
  return avalibleProviders;
};

export const getGoogleOAuthProvider = () => {
  return avalibleProviders[0];
};
