import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

import Background from '../components/Background';
import Logo from '../components/Logo';

import AuthContext from '../helper/context';

export default class SettingsScreen extends Component {
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
                                title="Log out"
                                left={props => <List.Icon {...props} icon="logout" />}
                                onPress={() => policyChange(false)}
                            />
                        </View>
                    </Background>
                )}
            </AuthContext.Consumer>
        );
    }
}
