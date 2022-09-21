import React from 'react';
import Navigator from './src/navigators';
import Store from './src/Store';
import {Provider} from 'react-redux';

export default () => (
  <Provider store={Store}>
    <Navigator />;
  </Provider>
);
