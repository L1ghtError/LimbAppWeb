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
  }
};

export default (page) => {
  return endPoints[page];
};
