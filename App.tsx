import React from 'react';
import {Provider} from 'react-redux';
import rootReducer from './slices';
import {createStore} from 'redux';
import ShoppingApp from './components/ShoppingList';
const store = createStore(rootReducer);

const App: React.FC = () => (
  <Provider store={store}>
    <ShoppingApp />
  </Provider>
);

export default App;
