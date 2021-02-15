import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

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

class DateChoice extends Component {
    state = {
        visible: false
    };

    constructor(props) {
        super(props);
        const { field, dispatch } = this.props;
        dispatch(actionCreators.init({ [field]: new Date() }));
    }

    onChangeDate = (date) => {
        this.setState({ visible: false });
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: date }));
    }

    render() {
        const { content, answer } = this.props;
        const { visible } = this.state;

        if (answer === undefined) {
            this.onChangeDate(new Date());
            return <View />;
        }

        return (
            <View style={this.props.style}>
                <Question content={content} />
                <TouchableRipple onPress={() => this.setState({ visible: true })}>
                    <View pointerEvents="none">
                        <TextInput
                            value={answer.toLocaleDateString()}
                        />
                    </View>
                </TouchableRipple>
                {visible && (
                    <DateTimePicker
                        value={answer}
                        maximumDate={new Date()}
                        onChange={(event, date) => this.onChangeDate(date)}
                    />
                )
                }
            </View>
        );
    }
}

export default connect(mapState)(DateChoice);
