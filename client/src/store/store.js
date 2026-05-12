import { configureStore } from '@reduxjs/toolkit';
import authReducer     from './authSlice';
import leadsReducer    from './leadsSlice';
import projectsReducer from './projectsSlice';
import offersReducer   from './offersSlice';

export const store = configureStore({
  reducer: {
    auth:     authReducer,
    leads:    leadsReducer,
    projects: projectsReducer,
    offers:   offersReducer,
  },
});
