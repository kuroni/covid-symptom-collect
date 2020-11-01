import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import store from './src/helper/store';
import storage from './src/helper/storage';
import RegisterScreen from './src/screens/AuthScreen';
import HomeNavigator from './src/navigation/HomeNavigator';
import AuthContext from './src/helper/context';
import { theme } from './src/core/theme';

export default class App extends Component {
    state = {
        isLoading: true,
        user: null
    };

    userChange = (newUser) => {
        console.log(newUser);
        storage.save({ key: 'user', data: newUser });
        this.setState({ user: newUser });
    }

    componentDidMount() {
        storage.load({ key: 'user' })
            .then(user => {
                console.log('done');
                this.setState({ user, isLoading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { isLoading, user } = this.state;
        if (isLoading) {
            return <View/>;
        }
        return (
            <AuthContext.Provider value={{ user: user, userChange: (newUser) => this.userChange(newUser) }}>
                <StoreProvider store={store}>
                    <PaperProvider theme={theme}>
                        {user ? <HomeNavigator /> : <RegisterScreen />}
                    </PaperProvider>
                </StoreProvider>
            </AuthContext.Provider>
        );
    }
}
