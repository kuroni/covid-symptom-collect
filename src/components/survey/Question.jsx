import React, { Component } from 'react';
import { Text } from 'react-native-paper';

export default class Question extends Component {
    render() {
        return (
            <Text style={{ fontSize: 18, color: '#161616', padding: 10 }}>
                {this.props.content}
            </Text>
        );
    }
}
