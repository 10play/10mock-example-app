import React from 'react';
import {PublicRoutes} from './routes';
import {Provider} from 'react-native-paper';
import {StyleProvider} from './contexts';

const App = () => {
  return (
    <Provider>
      <StyleProvider>
        <PublicRoutes />
      </StyleProvider>
    </Provider>
  );
};

export default App;
