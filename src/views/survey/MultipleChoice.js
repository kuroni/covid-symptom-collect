import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableNativeFeedback, FlatList, StyleSheet, View, Text } from 'react-native';

import { actionCreators } from '../../helper/store.js';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer
    }
}

class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: 0 }));
    }

    onPressItem = ({ id }) => {
        let { answer } = this.state;
        const { reset } = this.props;
        if (reset) {
            answer &= (1 << id)
        }
        answer ^= (1 << id);
        dispatch(actionCreators.edit({ [field]: answer }));
    }

    renderItem = ({ item }) => {
        const { id } = item;
        const appear = (this.state.answer >> id & 1) == 1;

        return (
            <TouchableNativeFeedback
                style={appear ? styles.rowOn : styles.rowOff}
                onPress={() => this.onPressItem(item)}
            >
                <Text>
                    title={item.text}
                </Text>
            </TouchableNativeFeedback>
        );
    }

    render() {
        const { content, data } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {content}
                </Text>
                <FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={({ id }) => id}
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
    rowOn: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue'
    },
    rowOff: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'white'
    }
});

export default connect(mapState)(MultipleChoice);
