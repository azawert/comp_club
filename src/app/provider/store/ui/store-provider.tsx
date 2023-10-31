import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../config/store'

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
)
