import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import { Divider, List } from 'react-native-paper';

import Background from '../components/Background';
import Logo from '../components/Logo';

import AuthContext from '../helper/context';

export default class SettingsScreen extends Component {
    clickOnLink = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            }
        });
    }

    render() {
        return (
            <AuthContext.Consumer>
                {({ policyChange }) => (
                    <Background>
                        <Logo />
                        <View style={{ width: '100%' }}>
                            <List.Section title="About us">

                            </List.Section>
                            <Divider />
                            <List.Item
                                title="Privacy policy"
                                left={props => <List.Icon {...props} icon="folder-key" />}
                                onPress={() => this.clickOnLink('https://www.cs.purdue.edu/ppsrc-project/covid-sympton/privacy_consent.pdf')}
                            />
                            <List.Item
                                title="Website version"
                                left={props => <List.Icon {...props} icon="earth" />}
                                onPress={() => this.clickOnLink('https://www.cs.purdue.edu/ppsrc-project/covid-sympton/survey.html')}
                            />
                        </View>
                    </Background>
                )}
            </AuthContext.Consumer>
        );
    }
}
