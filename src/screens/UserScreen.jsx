import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import Background from '../components/Background';
import Header from '../components/Header';
import User from '../components/User';

import storage from '../helper/storage';
import store, { actionCreators } from '../helper/store';
import { nextScreen } from '../helper/surveyFlow';
import { screenStyle } from '../core/theme';

class UserScreen extends Component {
    state = {
        users: null
    };

    findValidID = () => {
        for (let i = 1; i <= 6; i++) {
            let valid = true;
            for (const user of this.state.users) {
                if (user.id == i) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return i;
            }
        }
    }

    fetchFromStorage = () => {
        storage.getAllDataForKey('users')
            .then(users => {
                this.setState({ users: users });
            })
            .catch(err => {
                switch (err.name) {
                    case 'NotFoundError':
                        this.setState({ users: [] });
                }
            });
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.fetchFromStorage);
    }

    beginSurvey = (user) => {
        const { navigation, dispatch } = this.props;
        dispatch(actionCreators.clear());
        dispatch(actionCreators.init(user.answer));
        navigation.push('survey', { userid: user.id, screen: nextScreen(-1) });
    }

    renderChild = (idx) => {
        const { users } = this.state;
        const { navigation } = this.props;
        if (idx < users.length) {
            const { id } = users[idx];
            return (
                <User 
                    user={users[idx]}
                    onPress={() => this.beginSurvey(users[idx])}
                    onLongPress={() =>
                        navigation.navigate('profile', {
                            idx: id,
                            onGoBack: () => this.fetchFromStorage()
                        })}
                />
            );
        } else {
            return (
                <User
                    user={null}
                    onPress={() =>
                        navigation.navigate('profile', {
                            idx: -this.findValidID(),
                            onGoBack: () => this.fetchFromStorage()
                        })}
                />
            );
        }
    }

    render() {
        const { users, visible } = this.state;
        if (!users) {
            this.fetchFromStorage();
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
        }
        return (
            <Background>
                <Header style={screenStyle.header}>
                    Please select a family member
                </Header>
                <View style={styles.userRow}>
                    <View style={styles.userColumn}>
                        {this.renderChild(0)}
                    </View>
                    <View style={styles.userColumn}>
                        {this.renderChild(1)}
                    </View>
                </View>
                <View style={styles.userRow}>
                    <View style={styles.userColumn}>
                        {this.renderChild(2)}
                    </View>
                    <View style={styles.userColumn}>
                        {this.renderChild(3)}
                    </View>
                </View>
                <View style={styles.userRow}>
                    <View style={styles.userColumn}>
                        {this.renderChild(4)}
                    </View>
                    <View style={styles.userColumn}>
                        {this.renderChild(5)}
                    </View>
                </View>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    userRow: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        padding: 10
    },
    userColumn: {
        padding: 10,
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        backgroundColor: 'white',
        width: '90%',
        padding: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});

export default connect()(UserScreen);
