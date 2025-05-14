import { configureStore } from '@reduxjs/toolkit'
import roleReducer from './features/role/roleSlice'
import { roleApi } from '../services/role'
// ...

export const store = configureStore({
  reducer: {
    role: roleReducer,
    [roleApi.reducerPath]: roleApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(roleApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch