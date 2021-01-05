import React, { Component } from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';

export default class Background extends Component {
    render() {
        const { children } = this.props;
        return (
            <ImageBackground
                source={require('../assets/background_dot.png')}
                resizeMode="repeat"
                style={styles.background}
            >
                <KeyboardAvoidingView style={styles.container}>
                    {children}
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
