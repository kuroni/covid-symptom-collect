import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, Button } from 'react-native';

import MultipleChoice from '../views/survey/MultipleChoice';
import FreeInput from '../views/survey/FreeInput';
import store, { actionCreators } from '../helper/store';
import storage from '../helper/storage';
import database from '../helper/database';

class SurveyScreen extends Component {
    state = {
        questions: []
    }

    submit = () => {
        const { dispatch, navigation } = this.props;
        const { userid } = navigation.state.params;
        database.collection("users").add(store.getState());
        dispatch(actionCreators.clear());
        navigation.goBack();
        navigation.navigate('End');
        storage.load({ key: 'users', id: userid })
            .then(ret => storage.save({
                key: 'users',
                id: userid,
                data: {
                    ...ret,
                    data: new Date()
                }
            }));
    }

    componentDidMount() {
        const doc = database.doc('config/questions');
        doc.get().then(snapshot => {
            this.setState({ questions: snapshot.data().questions });
        });
        doc.onSnapshot(snapshot => {
            this.setState({ questions: snapshot.data().questions });
        });

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
        return (
            <ScrollView style={styles.container}>
                {this.state.questions.map(child => this.renderChild(child))}
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
