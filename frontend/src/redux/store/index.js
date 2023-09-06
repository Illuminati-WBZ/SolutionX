import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../reducers/AuthReducer'

export const store = configureStore({
    reducer:{
        auth:authSlice
    },devTools:true
})