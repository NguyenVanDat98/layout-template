import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import rootSaga from './saga'
const persistConfig = {
  key: 'root',
  storage,
}
 
// const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    // auth: persistedReducer,
  },
  middleware(get){
    return get({
      thunk:false,
      serializableCheck:false
    }).concat(sagaMiddleware)
  }
})
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)
export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch