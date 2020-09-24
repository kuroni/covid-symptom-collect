import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';

export default class Logo extends Component {
    render() {
        return (
            <Image source={require('../assets/logo.png')} style={styles.image} />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        marginBottom: 12,
    },
});
