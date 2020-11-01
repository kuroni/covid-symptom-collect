import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';
import color from 'color';

import Question from './Question';
import { theme } from '../../core/theme';
import { actionCreators } from '../../helper/store';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer
    };
}

class MultipleChoice extends Component {
    constructor(props) {
        super(props);
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: 0 }));
    }

    onPressItem = (id) => {
        let { answer } = this.props;
        const { reset, dispatch, field } = this.props;
        if (reset) {
            answer = id;
        } else {
            answer ^= (1 << id);
        }
        dispatch(actionCreators.edit({ [field]: answer }));
    }

    renderCheckbox = (item, id) => {
        const { answer } = this.props;
        const appear = (answer >> id & 1) == 1;
        return (
            <View key={id}>
                <Checkbox.Item
                    status={appear ? 'checked' : 'unchecked'}
                    onPress={() => this.onPressItem(id)}
                    label={item}
                    labelStyle={styles.labelStyle}
                />
            </View>
        );
    }

    renderRadiobutton = (item, id) => {
        const { answer } = this.props;
        const appear = (answer == id);
        return (
            <View key={id}>
                <RadioButton.Item
                    status={appear ? 'checked' : 'unchecked'}
                    onPress={() => this.onPressItem(id)}
                    label={item}
                    labelStyle={styles.labelStyle}
                />
            </View>
        );
    }

    render() {
        const { content, data, reset } = this.props;

        return (
            <View style={this.props.style}>
                <Question content={content}/>
                {data.map((item, id) => (reset ? this.renderRadiobutton : this.renderCheckbox)(item, id))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        color: color(theme.colors.text).alpha(0.8).rgb().string(),
        fontSize: 14
    }
});

export default connect(mapState)(MultipleChoice);
