import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Default: localStorage
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import userReducer from "./userSlice.js";
import messageReducer from "./messageSlice.js";

// Redux Persist configuration
const persistConfig = {
  key: 'root', // Key for storage
  storage,
};

const rootReducer = combineReducers({
   user:userReducer,
   message:messageReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REHYDRATE, PERSIST],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
