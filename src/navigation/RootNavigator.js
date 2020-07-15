import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import StackNavigator from './StackNavigator';
import SurveyScreen from '../screen/SurveyScreen';

const AuthNavigator = createSwitchNavigator(
    {
        HomeStack: StackNavigator,
        Survey: SurveyScreen
    },
    {
        initialRouteName: 'HomeStack',
    }
);

const RootNavigator = createAppContainer(AuthNavigator);

export default RootNavigator;
