import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

export default class User extends Component {
    render() {
        const { user, onPress, onLongPress } = this.props;
        if (user === null) {
            return (
                <TouchableRipple onPress={onPress} style={styles.userContainer}>
                    <Text>
                        Add User
                    </Text>
                </TouchableRipple>
            );
        } else {
            return (
                <TouchableRipple onPress={onPress} onLongPress={onLongPress} style={styles.userContainer}>
                    <Text>
                        {user.name}
                    </Text>
                </TouchableRipple>
            );
        }
    }
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
