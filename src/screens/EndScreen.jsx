import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { getSummary } from '../helper/misc';

export default class EndScreen extends Component {
    render() {
        const { navigation } = this.props;
        const summary = getSummary();
        return (
            <Background>
                <Logo />
                <Header>Thank you</Header>
                <Divider/>
                <Button mode="outlined" onPress={() => navigation.navigate('user')}>
                    Continue survey
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('home')}>
                    Go to Home
                </Button>
                {/* <Button mode="contained" onPress={() => navigation.navigate('result')}>
                    Show data summary
                </Button> */}
            </Background>
        );
    }
}


const styles = StyleSheet.create({
    outerText: {
        fontSize: 16,
        padding: 10
    },
    innerText: {
        fontWeight: 'bold'
    }
});

