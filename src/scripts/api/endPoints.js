const endPoints = {
  reset: {},
  registration: {
    url: 'api/auth/registration'
  },
  login: {
    url: 'api/auth/login'
  },
  logout: {
    url: 'api/auth/logout'
  },
  refresh: {
    url: 'api/auth/refresh'
  },

  basics: {
    url: 'api/user/basics'
  },
  googleOAuth: {
    url: 'api/oauth/google'
  },
  googleOAuthCb: {
    url: 'api/oauth/google/callback'
  },
  uploadUserImage: {
    url: 'api/user/upload/image'
  },
  downloadUserImage: {
    url: 'api/user/download/image'
  },
  enhanceUserImage: {
    url: 'api/user/enhance/image'
  }
};

export default (page) => {
  return endPoints[page];
};
