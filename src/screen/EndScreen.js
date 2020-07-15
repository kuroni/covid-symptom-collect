import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class EndScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text> End Screen! </Text>
                <Button title="Go back to Home!" onPress={() => navigation.navigate('Home')} />
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
