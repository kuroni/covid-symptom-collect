import React, { Component, Children } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button } from 'react-native';

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
        const children = JSON.parse('[{"type":"freeInput","content":"Firstquestion?","field":"firstQuestion","placeholder":"Sampleplaceholder","regex":".*"},{"type":"multipleChoice","content":"Secondquestion?","field":"secondQuestion","reset":false,"data":[{"id":0,"text":"View"},{"id":1,"text":"Text"},{"id":2,"text":"Image"},{"id":3,"text":"ScrollView"},{"id":4,"text":"ListView"}]}]');
        return (
            <ScrollView style={styles.container}>
                {children.map((child) => {
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
                })}
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
