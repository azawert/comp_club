import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../../../../pages/auth'
import { NavigateOptions, To } from 'react-router-dom'
import { ThunkExtraArgs } from '../../../../pages/auth/model/services/verification-by-phone'
import { IInitialAuthState } from '../../../../pages/auth/model/types/types'

export interface IStateSchema {
  auth: IInitialAuthState
}

export function createReduxToolkitStore(
  navigate?: (to: To, options?: NavigateOptions) => void
) {
  const extraArgument: ThunkExtraArgs = {
    navigate,
  }
  const store = configureStore({
    reducer: { auth: authReducer },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }),
  })
  return store
}

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<typeof createReduxToolkitStore>['dispatch']
