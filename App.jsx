import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import store from './src/helper/store';
import storage from './src/helper/storage';
import ConsentScreen from './src/screens/ConsentScreen';
import HomeNavigator from './src/navigation/HomeNavigator';
import AuthContext from './src/helper/context';
import { theme } from './src/core/theme';

export default class App extends Component {
    state = {
        isLoading: true,
        policy: null
    };

    policyChange = (newPolicy) => {
        storage.save({
            key: 'policy',
            data: newPolicy,
            expires: null
        });
        this.setState({ policy: newPolicy });
    }

    componentDidMount() {
        storage.load({ key: 'policy' })
            .then(policy => {
                this.setState({ policy, isLoading: false });
            })
            .catch(err => {
                switch (err.name) {
                    case 'ExpiredError':
                    case 'NotFoundError':
                        this.setState({ isLoading: false });
                        return;
                    default:
                        console.error(err);
                }
            });
    }

    render() {
        const { isLoading, policy } = this.state;
        if (isLoading) {
            return <View/>;
        }
        return (
            <AuthContext.Provider value={{ policy: policy, policyChange: (newPolicy) => this.policyChange(newPolicy) }}>
                <StoreProvider store={store}>
                    <PaperProvider theme={theme}>
                        {policy ? <HomeNavigator /> : <ConsentScreen />}
                    </PaperProvider>
                </StoreProvider>
            </AuthContext.Provider>
        );
    }
}
