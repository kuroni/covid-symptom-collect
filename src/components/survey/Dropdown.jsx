import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Menu, TouchableRipple, TextInput as Input } from 'react-native-paper';

import Question from './Question';
import TextInput from '../TextInput';
import { actionCreators } from '../../helper/store';

function mapState(state, ownProps) {
    const { field } = ownProps;
    const answer = state[field];
    return {
        answer: answer
    };
}

class Dropdown extends Component {
    state = {
        visible: false
    };

    constructor(props) {
        super(props);
        const { field, dispatch } = this.props;
        dispatch(actionCreators.edit({ [field]: 0 }));
    }

    render() {
        const { content, data, label } = this.props;
        const { visible, answer } = this.state;

        return (
            <View style={this.props.style}>
                <Question content={content}/>
                <Menu
                    visible={visible}
                    onDismiss={() => this.setState({ visible: false })}
                    anchor={
                        <TouchableRipple onPress={() => this.setState({ visible: true })}>
                            <View pointerEvents={"none"}>
                                <TextInput
                                    value={data[answer]}
                                    label={label}
                                    pointerEvents={"none"}
                                    right={<Input.Icon name={'menu-down'} />}
                                />
                            </View>
                        </TouchableRipple>
                    }
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {data.map((item, index) => (
                            <Menu.Item
                                key={index}
                                onPress={() => this.setState({ answer: index, visible: false })}
                                title={item}
                            />
                        ))}
                    </ScrollView>
                </Menu>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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

export default connect(mapState)(Dropdown);
