import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';

import MultipleChoice from '../components/survey/MultipleChoice';
import FreeInput from '../components/survey/FreeInput';
import Dropdown from '../components/survey/Dropdown';

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
            return (
                <Background>
                    <AnimatedLoader
                    overlayColor="rgba(0,0,0,0)"
                        visible={true}
                        source={require("../assets/loading.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    />
                </Background>
            );
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
                        <Dropdown
                            content="Your age range"
                            field="age"
                            data={["0 - 5",
                                    "6 - 10",
                                    "11 - 15",
                                    "16 - 20",
                                    "21 - 25",
                                    "26 - 30",
                                    "31 - 35",
                                    "36 - 40",
                                    "41 - 45",
                                    "46 - 50",
                                    "51 - 55",
                                    "56 - 60",
                                    "61 - 65",
                                    "66 - 70",
                                    "71 - 75",
                                    "> 75",
                                    "Prefer not to answer"]}
                            style={styles.question}
                            placeholder="Age"
                        />
                        <MultipleChoice
                            content="Your biological sex"
                            field="sex"
                            reset={true}
                            data={["I don't want to report", "Male", "Female"]}
                            style={styles.question}
                        />
                    </ScrollView>
                    {idx >= 0 ? (
                        <View style={{ width: '100%' }}>
                            <Button mode="outlined" onPress={() => this.saveProfile(idx)}>
                                Save changes
                            </Button>
                            <Button mode="contained" style={{ backgroundColor: 'red' }} onPress={() => this.removeProfile(idx)}>
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
    },
    lottie: {
        width: 300,
        height: 300
    }
});
