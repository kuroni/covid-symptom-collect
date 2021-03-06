import React, { Component } from 'react';
import { Divider } from 'react-native-paper';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';

import { screenStyle } from '../core/theme';

export default class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <Background>
                <Logo />
                <Header style={screenStyle.header}>
                    Welcome back!
                </Header>
                <Button mode="contained" onPress={() => navigation.navigate('user')}>
                    Start Survey
                </Button>
            </Background>
        );
    }
}
