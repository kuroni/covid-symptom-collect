import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './src/helper/store';
import HomeScreen from './src/screen/HomeScreen';
import SurveyScreen from './src/screen/SurveyScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Survey" component={SurveyScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
