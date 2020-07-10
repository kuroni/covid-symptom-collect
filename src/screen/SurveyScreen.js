import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Button } from 'react-native';

import MultipleChoice from '../views/survey/MultipleChoice';
import FreeInput from '../views/survey/FreeInput';
import store, { actionCreators } from '../helper/store';

class SurveyScreen extends Component {
    submit = () => {
        const { dispatch } = this.props;
        console.log(store.getState());
        dispatch(actionCreators.clear());
    }

    render() {
        return (
            <View style={styles.container}>
                <FreeInput content="What" placeholder="what" field="ok" regex=".+"/>
                <Button title="Submit" onPress={() => this.submit()} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});


export default connect()(SurveyScreen);
