import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

import Question from './Question';
import { actionCreators } from '../../helper/store';
import TextInput from '../TextInput';

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
        dispatch(actionCreators.init({ [field]: '' }));
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
            <View style={this.props.style}>
                <Question content={content}/>
                <TextInput
                    value={answer}
                    placeholder={placeholder}
                    onChangeText={this.onChangeText}
                />
            </View>
        );
    }
}

FreeInput.defaultProps = {
    regex: '.*'
};

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'blue'
    },
    container: {
        flex: 1
    }
});

export default connect(mapState)(FreeInput);
