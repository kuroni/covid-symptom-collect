import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import EndScreen from '../screens/EndScreen';
import SurveyScreen from '../screens/SurveyScreen';
import UserScreen from '../screens/UserScreen';

const StackNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        User: UserScreen,
        Survey: SurveyScreen,
        End: EndScreen
    },
    {
        initialRouteName: 'Home',
    }
);

const HomeNavigator = createAppContainer(StackNavigator);

export default HomeNavigator;
