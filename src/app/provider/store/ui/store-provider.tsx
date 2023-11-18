import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { createReduxToolkitStore } from '../config/store';
import { useNavigate } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const store = createReduxToolkitStore(navigate);

  // eslint-disable-next-line prefer-const
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
