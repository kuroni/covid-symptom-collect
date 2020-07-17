import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screen/HomeScreen';
import EndScreen from '../screen/EndScreen';
import SurveyScreen from '../screen/SurveyScreen';
import UserScreen from '../screen/UserScreen';

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

const RootNavigator = createAppContainer(StackNavigator);

export default RootNavigator;
