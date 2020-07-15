import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/helper/store';
import RootNavigator from './src/navigation/RootNavigator';

export default () => {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    );
}
