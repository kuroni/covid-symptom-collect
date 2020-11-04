import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

import MultipleChoice from '../components/survey/MultipleChoice';
import FreeInput from '../components/survey/FreeInput';
import SliderQuestion from '../components/survey/SliderQuestion';

import store, { actionCreators } from '../helper/store';
import storage from '../helper/storage';
import { database } from '../helper/firebaseWrapper';

import Button from '../components/Button';
import Background from '../components/Background';
import Header from '../components/Header';
import DateChoice from '../components/survey/DateChoice';

class SurveyScreen extends Component {
    state = {
        last: false,
        loaded: false
    }

    submit = () => {
        const { dispatch, navigation } = this.props;
        const { userid } = navigation.state.params;
        database.collection("userData").add(store.getState());
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

    fetchFromStorage = () => {
        const { screen } = this.props.navigation.state.params;
        storage.load({
            key: 'questionScreens'
        })
        .then(ret =>
            this.setState({ ...ret[screen], last: (screen == ret.length - 1), loaded: true })
        )
        .catch(err => {
            switch (err.name) {
                case 'ExpiredError':
                case 'NotFoundError':
                    database.collection('questionScreens').orderBy("screen", "asc").get()
                        .then(snapshot => {
                            let array = [];
                            snapshot.forEach(doc => array.push(doc.data()));
                            storage.save({
                                key: 'questionScreens',
                                data: array,
                                expires: 1000
                            }).then(() => this.fetchFromStorage());
                        });
                    return;
                default:
                    console.error(err);
                    throw 'oh no';
            }
        })
    }

    componentDidMount() {
        this.fetchFromStorage();
    }

    renderChild = (child, idx) => {
        const { type, field, content } = child;
        switch (type) {
            case 'freeInput': {
                const { placeholder, regex } = child;
                return (
                    <FreeInput
                        content={content}
                        field={field}
                        placeholder={placeholder}
                        regex={regex}
                        key={idx}
                        style={styles.question}
                    />
                );
            }
            case 'multipleChoice': {
                const { data, reset } = child;
                return (
                    <MultipleChoice
                        content={content}
                        field={field}
                        data={data}
                        reset={reset}
                        key={idx}
                        style={styles.question}
                    />
                );
            }
            case 'slider': {
                const { minText, maxText, max } = child;
                return (
                    <SliderQuestion
                        content={content}
                        field={field}
                        minText={minText}
                        maxText={maxText}
                        max={max}
                        key={idx}
                        style={styles.question}
                    />
                );
            }
            case 'dateChoice': {
                return (
                    <DateChoice
                        content={content}
                        field={field}
                        key={idx}
                        style={styles.question}
                    />
                )
            }
            // default:
            //     return (
            //         <Text>
            //             {JSON.stringify(child)}
            //         </Text>
            //     );
        }
    }

    finishButton = () => {
        const { navigation } = this.props;
        const { userid, screen } = navigation.state.params;
        if (this.state.last) {
            return (
                <Button mode='contained' onPress={() => this.submit()}>
                    Submit
                </Button>
            );
        } else {
            return (
                <Button
                    mode='contained'
                    onPress={() => navigation.push('Survey', { userid: userid, screen: screen + 1 })}
                >
                    Next Questions
                </Button>
            );
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <Background>
                    <Header style={{ padding: 20 }}>
                        {this.state.header}
                    </Header>
                    <Divider/>
                    <ScrollView style={{ alignContent: 'flex-start', width: '100%' }}>
                        {this.state.questions.map((child, idx) => this.renderChild(child, idx))}
                    </ScrollView>
                    {this.finishButton()}
                </Background>
            );
        } else {
            return (
                <Background/>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    question: {
        padding: 20,
        flex: 1
    }
});


export default connect()(SurveyScreen);
