import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Caption, Avatar } from 'react-native-paper';

export default class User extends Component {
    render() {
        const { user, onPress, onLongPress } = this.props;
        if (user === null) {
            return (
                <TouchableRipple onPress={onPress} style={styles.userContainer}>
                    <View style={styles.userView}>
                        <Avatar.Icon size={64} icon="account-plus" />
                        <Caption style={styles.captionStyle}>
                            Add Member
                        </Caption>
                    </View>
                </TouchableRipple>
            );
        } else {
            return (
                <TouchableRipple onPress={onPress} onLongPress={onLongPress} style={styles.userContainer}>
                    <View style={styles.userView}>
                        <Avatar.Icon size={64} icon="account" />
                        <Caption style={styles.captionStyle}>
                            {user.name}
                        </Caption>
                    </View>
                </TouchableRipple>
            );
        }
    }
}

const styles = StyleSheet.create({
    userContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    userView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 20
    },
    captionStyle: {
        fontSize: 15,
        padding: 20,
        color: '#000'
    }
});
