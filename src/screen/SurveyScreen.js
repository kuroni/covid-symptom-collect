import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button } from 'react-native';

import MultipleChoice from '../views/survey/MultipleChoice';
import FreeInput from '../views/survey/FreeInput';
import store, { actionCreators } from '../helper/store';
import database from '../helper/database';

class SurveyScreen extends Component {
    submit = () => {
        const { dispatch, navigation } = this.props;
        console.log(store.getState());
        dispatch(actionCreators.clear());
        navigation.goBack();
        navigation.navigate('End');
    }

    renderChild = child => {
        const { type, field, content } = child;
        switch (type) {
            case 'freeInput':
                const { placeholder, regex } = child;
                return (
                    <FreeInput
                        content={content}
                        field={field}
                        placeholder={placeholder}
                        regex={regex}
                    />
                );
            case 'multipleChoice':
                const { data, reset } = child;
                return (
                    <MultipleChoice
                        content={content}
                        field={field}
                        data={data}
                        reset={reset}
                    />
                );
            default:
                return (
                    <Text>
                        {JSON.stringify(child)}
                    </Text>
                );
        }
    }

    render() {
        database.remove({ key: 'user', id: 1001 });
        const children = JSON.parse('[{"type": "freeInput","content": "First question?","field": "firstQuestion","placeholder": "Sample place holder","regex": ".*"},{"type": "multipleChoice","content": "Second question?","field": "secondQuestion","reset": false,"data": ["Cough","Sneeze","Fever","Fatigue","Loss of taste"]}]');
        return (
            <ScrollView style={styles.container}>
                {children.map(child => this.renderChild(child))}
                <Button title="Submit" onPress={() => this.submit()} />
            </ScrollView>
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
