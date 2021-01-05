import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';

import MultipleChoice from '../components/survey/MultipleChoice';
import FreeInput from '../components/survey/FreeInput';

import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';

import storage from '../helper/storage'
import store, { actionCreators } from '../helper/store';

class ProfileScreen extends Component {
    state = {
        loaded: false
    };

    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        dispatch(actionCreators.clear());
        const { idx } = this.props.route.params;
        if (idx >= 0) {
            storage.load({
                key: 'users',
                id: idx
            }).then(user => {
                dispatch(actionCreators.init(user.answer));
                dispatch(actionCreators.init({ name: user.name }));
                this.setState({ loaded: true });
            });
        } else {
            this.state = { loaded: true };
        }
    }

    saveProfile = (idx) => {
        const { dispatch, navigation } = this.props;
        let userData = store.getState();
        dispatch(actionCreators.clear());
        const name = userData['name'];
        delete userData['name'];

        storage.save({
            key: 'users',
            id: idx,
            data: {
                id: idx,
                name: name,
                answer: userData
            }
        }).then(() => {
                this.props.route.params.onGoBack();
                navigation.goBack();
            }
        );
    }

    removeProfile = (idx) => {
        const { navigation } = this.props;
        storage.remove({ key: 'users', id: idx })
            .then(() => {
                this.props.route.params.onGoBack();
                navigation.goBack();
            }
        );
    }

    render() {
        const { idx } = this.props.route.params;
        if (!this.state.loaded) {
            return <Background />;
        } else {
            return (
                <Background>
                    <Header>
                        {idx < 0 ? "Create a new profile" : "Edit the current profile"}
                    </Header>
                    <Divider/>
                    <ScrollView style={styles.surveyView}>
                        <FreeInput
                            content="Your nickname"
                            field="name"
                            placeholder="Nick name"
                            style={styles.question}
                        />
                        <FreeInput
                            content="Your postal zip code"
                            field="zipCode"
                            placeholder="Zip code"
                            style={styles.question}
                        />
                        <MultipleChoice
                            content="Your age range"
                            field="age"
                            reset={true}
                            data={["0 - 5", "19 - 30", "30 - 65", ">65", "Prefer not to answer"]}
                        />
                        <MultipleChoice
                            content="Your biological sex"
                            field="sex"
                            reset={true}
                            data={["I don't want to report", "Male", "Female"]}
                        />
                    </ScrollView>
                    {idx >= 0 ? (
                        <View>
                            <Button mode="outlined" onPress={() => this.saveProfile(idx)}>
                                Save changes
                            </Button>
                            <Button mode="contained" onPress={() => this.removeProfile(idx)}>
                                Delete this profile
                            </Button>
                        </View>
                    ) :(
                        <Button mode="outlined" onPress={() => this.saveProfile(-idx)}>
                            Add this profile
                        </Button>
                    )}
                </Background>
            );
        }
    }
}

export default connect()(ProfileScreen);

const styles = StyleSheet.create({
    question: {
        padding: 20,
        flex: 1
    },
    surveyView: {
        alignContent: 'flex-start',
        width: '100%'
    }
});
