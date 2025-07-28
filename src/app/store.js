import { configureStore } from '@reduxjs/toolkit';
import userDetail from '../features/userDetailSlice.jsx';

export const store = configureStore({
    reducer:{
        app : userDetail
    },
});