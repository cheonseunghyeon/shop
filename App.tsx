// import ShoppingApp from './components/ShoppingList';
import RootStack from './screen/RootStack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './slices';

// Date 객체 수정
const dateTransform = createTransform(
  // Date 객체를 문자열로 직렬화
  inboundState => {
    if (inboundState instanceof Date) {
      return inboundState.toISOString();
    }
    return inboundState;
  },
  //  Date 객체를 문자열로 역직렬화
  outboundState => {
    if (typeof outboundState === 'string') {
      return new Date(outboundState);
    }
    return outboundState;
  },
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [dateTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

const App: React.FC = () => (
  <NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  </NavigationContainer>
);

export default App;
