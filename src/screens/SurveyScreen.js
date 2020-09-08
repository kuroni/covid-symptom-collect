import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import MultipleChoice from '../components/survey/MultipleChoice';
import FreeInput from '../components/survey/FreeInput';
import store, { actionCreators } from '../helper/store';
import storage from '../helper/storage';
import { database } from '../helper/firebaseWrapper';

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
                data: ret
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

    renderChild = (child, idx) => {
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
                        key={idx}
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
                        key={idx}
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
            <View style={styles.container}>
                <ScrollView>
                    {this.state.questions.map((child, idx) => this.renderChild(child, idx))}
                </ScrollView>
                <Button mode='contained' onPress={() => this.submit()}>
                    Submit
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    }
});


export default connect()(SurveyScreen);
