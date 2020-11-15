import React, { Component } from 'react';
import { Divider } from 'react-native-paper';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';

import AuthContext from '../helper/context';

export default class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <AuthContext.Consumer>
                {({ userChange }) => (
                    <Background>
                        <Logo />
                        <Header>Home Screen!</Header>
                        <Divider/>
                        <Button mode="outlined" onPress={() => navigation.navigate('user')}>
                            Go to Users!
                        </Button>
                        <Button mode="contained" onPress={() => userChange(null)}>
                            Logout
                        </Button>
                    </Background>
                )}
            </AuthContext.Consumer>
        );
    }
}
