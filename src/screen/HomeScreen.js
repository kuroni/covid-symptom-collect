import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class HomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text> Home Screen! </Text>
                <Button title="Go to Users!" onPress={() => navigation.navigate('User')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
