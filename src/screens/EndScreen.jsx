import React, { Component } from 'react';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';

export default class EndScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <Background>
                <Logo />
                <Header>Thank you</Header>

                <Button mode="outlined" onPress={() => navigation.navigate('User')}>
                    Continue survey
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('Home')}>
                    Go to Home
                </Button>
            </Background>
        );
    }
}
