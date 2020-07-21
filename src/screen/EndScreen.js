import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class EndScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text> End Screen! </Text>
                <View style={styles.buttons}>
                    <Button title="Continue survey" onPress={() => navigation.navigate('User')} />
                    <Button title="Go back to Home" onPress={() => navigation.navigate('Home')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
