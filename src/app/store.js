import { configureStore } from '@reduxjs/toolkit'
import { api } from '../features/api'

export default configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(api.middleware)
    },

})


