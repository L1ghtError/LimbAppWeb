import googleIcon from '../assets/icons/Google__G__logo.svg';
import endPoints from './api/endPoints';
const avalibleProviders = [
  { name: 'Google', link: endPoints('googleOAuth').url, icon: googleIcon }
];

export const getAvalibleOAuthProviders = () => {
  return avalibleProviders;
};
