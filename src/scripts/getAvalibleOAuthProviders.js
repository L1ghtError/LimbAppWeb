import googleIcon from '../assets/icons/Google__G__logo.svg';

const avalibleProviders = [{ name: 'Google', link: 'api', icon: googleIcon }];

export const getAvalibleOAuthProviders = () => {
  return avalibleProviders;
};
