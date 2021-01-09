import React, { Component } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Text, Checkbox } from 'react-native-paper';
import color from 'color';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';

import AuthContext from '../helper/context';
import { theme } from '../core/theme';

export default class ConsentScreen extends Component {
    state = {
        confirmed: false
    }

    clickOnLink = (link) => {
        Linking.canOpenURL(link).then(supported => {
            if (supported) {
                Linking.openURL(link);
            }
        });
    }

    render() {
        const { confirmed } = this.state;
        const docLink = 'https://www.cs.purdue.edu/ppsrc-project/covid-sympton/privacy_consent.pdf';
        return (
            <AuthContext.Consumer>
                {({ policyChange }) => (
                    <Background>
                        <Logo />
                        <Header>Privacy Policy</Header>
                        <View style={{ alignContent: 'center', padding: 10 }}>
                            <Text style={styles.outerText}>
                                Please confirm that you have read privacy policy at this <Text
                                    style={styles.linkText}
                                    onPress={() => this.clickOnLink(docLink)}
                                >
                                    link
                                </Text> before proceeding.
                            </Text>
                        </View>
                        <Checkbox.Item
                            status={confirmed ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ confirmed: !confirmed })}
                            label='I confirm the above'
                            labelStyle={styles.labelStyle}
                        />
                        <Button
                            mode="contained"
                            onPress={() => policyChange(true)}
                            disabled={!confirmed}
                        >
                            Continue
                        </Button>
                    </Background>
                )}
            </AuthContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    outerText: {
        fontSize: 16,
    },
    linkText: {
        fontSize: 16,
        color: 'dodgerblue'
    },
    labelStyle: {
        color: color(theme.colors.text).alpha(0.8).rgb().string(),
        fontSize: 14
    }
});
