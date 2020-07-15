import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screen/HomeScreen';
import EndScreen from '../screen/EndScreen';
import UserScreen from '../screen/UserScreen';

const StackNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        User: UserScreen,
        End: EndScreen
    },
    {
        initialRouteName: 'Home',
    }
);

export default StackNavigator;
