import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { NavigateOptions, To } from 'react-router-dom';
import { IInitialAuthState, authReducer } from '../../../../features/authentication';
import { ThunkExtraArgs } from '../../../../features/authentication/model/services/verification-by-phone';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from 'redux-persist';
import { PERSIST_CONFIG } from './reduxPersistConfig';

export interface IStateSchema {
  auth: IInitialAuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(PERSIST_CONFIG, rootReducer);

export function createReduxToolkitStore(
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const extraArgument: ThunkExtraArgs = {
    navigate,
  };
  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  return store;
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxToolkitStore>['dispatch'];
