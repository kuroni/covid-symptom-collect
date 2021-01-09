import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import MultipleChoice from '../components/survey/MultipleChoice';
import FreeInput from '../components/survey/FreeInput';
import SliderQuestion from '../components/survey/SliderQuestion';

import store, { actionCreators } from '../helper/store';
import storage from '../helper/storage';
import { database } from '../helper/firebaseWrapper';
import { nextScreen, privatizeResult, screenState } from '../helper/surveyFlow';
import { screenStyle } from '../core/theme';

import Button from '../components/Button';
import Background from '../components/Background';
import Header from '../components/Header';
import DateChoice from '../components/survey/DateChoice';
import Dropdown from '../components/survey/Dropdown';

function mapState(state, ownProps) {
    return {
        ...ownProps,
        state: state
    };
}

class SurveyScreen extends Component {
    state = {
        last: false,
        loaded: false,
        state: 0
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            this.fetchFromStorage();
        }
    }

    submit = () => {
        const { dispatch, navigation } = this.props;
        const { userid } = this.props.route.params;
        database.collection("userData").add(privatizeResult());
        dispatch(actionCreators.clear());
        navigation.goBack();
        navigation.navigate('end');
    }

    fetchFromStorage = () => {
        const { screen } = this.props.route.params;
        storage.load({
            key: 'questionScreens'
        }).then(ret => {
            const questionScreen = ret[screen];
            this.setState({
                ...questionScreen,
                state: screenState(screen, questionScreen.questions.length),
                last: (nextScreen(screen) == ret.length),
                loaded: true
            });
        }).catch(err => {
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
                                expires: 1000 * 3600 * 24
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
        if (((this.state.state >> idx) & 1) == 0) {
            return <View />;
        }
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
                const { minText, maxText, min, max } = child;
                return (
                    <SliderQuestion
                        content={content}
                        field={field}
                        minText={minText}
                        maxText={maxText}
                        min={min}
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
            case 'dropdown': {
                const { data, placeholder } = child;
                return (
                    <Dropdown
                        content={content}
                        field={field}
                        data={data}
                        key={idx}
                        style={styles.question}
                        placeholder={placeholder}
                    />
                );
            }
        }
    }

    finishButton = () => {
        const { navigation } = this.props;
        const { userid, screen } = this.props.route.params;
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
                    onPress={() => navigation.push('survey', { userid: userid, screen: nextScreen(screen) })}
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
                    <Header style={screenStyle.header}>
                        {this.state.header}
                    </Header>
                    <Divider/>
                    <ScrollView style={screenStyle.content}>
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


export default connect(mapState)(SurveyScreen);
