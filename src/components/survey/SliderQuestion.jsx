import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RadioButton, TouchableRipple, Text } from 'react-native-paper';
import color from 'color';

import Question from './Question';
import { actionCreators } from '../../helper/store';
import { theme } from '../../core/theme';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer
    };
}

class SliderQuestion extends Component {
    state = {
        data: []
    };

    constructor(props) {
        super(props);
        const { field, dispatch, min, max, minText, maxText } = this.props;
        for (let i = min; i <= max; i++) {
            let text = i;
            if (i == min) {
                text += '\n' + minText + '';
            } else if (i == max) {
                text += '\n' + maxText + '';
            }
            this.state.data.push(text);
        }
        dispatch(actionCreators.init({ [field]: 0 }));
    }

    onPressItem = (value) => {
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: value }));
    }

    renderRadiobutton = (item, id) => {
        const { answer } = this.props;
        const appear = (answer == id);
        return (
            <TouchableRipple
                onPress={() => this.onPressItem(id)}
                key={id}
                style={{ flex: 1 }}
            >
                <View style={styles.radioButton} pointerEvents="none">
                    <RadioButton
                        status={appear ? 'checked' : 'unchecked'}
                    />
                    <Text style={styles.labelStyle}>
                        {item}
                    </Text>
                </View>
            </TouchableRipple>
        );
    }

    render() {
        const { content } = this.props;
        const { data } = this.state;

        return (
            <View style={this.props.style}>
                <Question content={content} />
                <View style={styles.container}>
                    {data.map((item, id) => this.renderRadiobutton(item, id))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    labelStyle: {
        color: color(theme.colors.text).alpha(0.8).rgb().string(),
        fontSize: 12,
        textAlign: 'center',
        flexShrink: 1
    },
    container: {
        flexDirection: 'row'
    },
    radioButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16
    }
});

export default connect(mapState)(SliderQuestion);
