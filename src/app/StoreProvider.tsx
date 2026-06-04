'use client';

import { Provider } from 'react-redux';
import { AppStore, makeStore } from '../lib/store';
import Html from './Html';
import { useRef } from 'react';

function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const storeRef = useRef<AppStore>(undefined);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  };

  return (
    <Provider store={storeRef.current}>
      <Html>
        {children}
      </Html>
    </Provider>
  );

}

export default StoreProvider;
