import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { createReduxToolkitStore } from '../config/store'
import { useNavigate } from 'react-router-dom'

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const store = createReduxToolkitStore(navigate)

  return <Provider store={store}>{children}</Provider>
}
