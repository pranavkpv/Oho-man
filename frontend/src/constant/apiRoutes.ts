export const API_ENDPOINTS = {
  AUTH: {
    SERVICES: '/auth/services',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
  },
  USER:{
    BASE: '/user',
    BOOKING:'/user/book',
    SWITCH:'/user/switch'
  },
  PROVIDER:{
    JOB:'/provider/job'
  }
} as const;