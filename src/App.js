import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home';
import Player from './components/Player';

function App() {
  return (
    <Provider store={store}>
      <Home />
      <Player />
    </Provider>
  );
}

export default App;
