export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    FOLLOW: (id) => `/users/${id}/follow`,
    UNFOLLOW: (id) => `/users/${id}/unfollow`,
  },
  POSTS: {
    BASE: '/posts',
    BY_ID: (id) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id) => `/posts/${id}`,
    DELETE: (id) => `/posts/${id}`,
    LIKE: (id) => `/posts/${id}/like`,
    COMMENT: (id) => `/posts/${id}/comments`,
  },
  COMMUNITIES: {
    BASE: '/communities',
    BY_ID: (id) => `/communities/${id}`,
    JOIN: (id) => `/communities/${id}/join`,
    LEAVE: (id) => `/communities/${id}/leave`,
  },
}

export const STORAGE_KEYS = {
  AUTH: 'auth-storage',
  THEME: 'theme-preference',
  LANGUAGE: 'language-preference',
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  COMMUNITY: '/community',
  POST_DETAIL: (id) => `/posts/${id}`,
}

export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
}

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
}
