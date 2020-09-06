import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';

import AuthContext from '../helper/context';

export default class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <AuthContext.Consumer>
                {({ userChange }) => (
                    <View style={styles.container}>
                        <Title>
                            Home Screen!
                        </Title>
                        <View>
                            <Button mode="contained" onPress={() => navigation.navigate('User')}>
                                Go to Users!
                            </Button>
                            <Button mode="contained" color="red" onPress={() => userChange(null)}>
                                Logout
                            </Button>
                        </View>
                    </View>
                )}
            </AuthContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
});
