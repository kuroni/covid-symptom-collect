import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import Question from './Question';
import { theme } from '../../core/theme';
import { actionCreators } from '../../helper/store';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer,
    };
}

class Dropdown extends Component {
    constructor(props) {
        super(props);
        const { field, dispatch, data } = this.props;
        this.state = {
            data: data.map((val, ind) => ({ label: val, value: ind })),
            visible: false
        };
        dispatch(actionCreators.init({ [field]: 0 }));
    }

    selectItem = (answer) => {
        const { dispatch, field } = this.props;
        dispatch(actionCreators.edit({ [field]: answer }));
    }

    render() {
        const { content, answer, placeholder } = this.props;
        const { data, visible } = this.state;

        return (
            <View style={this.props.style}>
                <Question content={content} />
                <DropDown
                    label={placeholder}
                    mode='outlined'
                    value={answer}
                    setValue={(value) => this.selectItem(value)}
                    list={data}
                    visible={visible}
                    showDropDown={() => this.setState({ visible: true })}
                    onDismiss={() => this.setState({ visible: false })}
                    inputProps={{
                        right: <TextInput.Icon name={'menu-down'} />,
                    }}
                />
            </View>
        );
    }
}


export default connect(mapState)(Dropdown);
