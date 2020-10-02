import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Slider, View, StyleSheet } from 'react-native';
import { Text, Caption } from 'react-native-paper';

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
    constructor(props) {
        super(props);
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: 1 }));
    }

    onSliderChange = (value) => {
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: value }));
    }

    render() {
        const { content, max, minText, maxText } = this.props;

        return (
            <View style={styles.container}>
                <Text>
                    {content}
                </Text>
                <View style={styles.sliderContainer}>
                    <Caption>
                        {minText}
                    </Caption>
                    <Slider
                        style={{width: '50%', height: 30}}
                        minimumValue={1}
                        maximumValue={max}
                        step={1}
                        onSlidingComplete={(value) => this.onSliderChange(value)}
                        minimumTrackTintColor={theme.colors.primary}
                        maximumTrackTintColor={theme.colors.primaryLight}
                    />
                    <Caption>
                        {maxText}
                    </Caption>
                </View>
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
    sliderContainer: {
        flex: 1,
        flexDirection: 'row'
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

export default connect(mapState)(SliderQuestion);
