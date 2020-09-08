import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

export default class User extends Component {
    render() {
        const { user, onPress, onLongPress } = this.props;
        if (user === null) {
            return (
                <TouchableRipple onPress={onPress}>
                    <Text>
                        Add User
                    </Text>
                </TouchableRipple>
            );
        } else {
            return (
                <TouchableRipple onPress={onPress} onLongPress={onLongPress}>
                    <Text>
                        {user.name}
                    </Text>
                </TouchableRipple>
            );
        }
    }
}
