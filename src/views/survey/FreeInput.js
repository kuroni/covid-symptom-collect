import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { actionCreators } from '../../helper/store.js';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer
    };
}

class FreeInput extends Component {
    constructor(props) {
        super(props);
        const { field, dispatch, regex } = this.props;
        dispatch(actionCreators.edit({ [field]: '' }));
        this.state = { regex: new RegExp(regex) };
    }

    onChangeText = (text) => {
        const { regex } = this.state;
        if (regex.test(text)) {
            const { field, dispatch } = this.props;
            dispatch(actionCreators.edit({ [field]: text }));
        }
    }

    render() {
        const { content, placeholder, answer } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {content}
                </Text>
                <TextInput
                    style={styles.input}
                    value={answer}
                    placeholder={placeholder}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'blue'
    },
    container: {
        flex: 1
    },
    input: {
        padding: 15,
        height: 50
    }
});

export default connect(mapState)(FreeInput);
