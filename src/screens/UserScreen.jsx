import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import Background from '../components/Background';
import Header from '../components/Header';

import User from '../components/User';
import storage from '../helper/storage';

export default class UserScreen extends Component {
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

    renderChild = (idx) => {
        const { users } = this.state;
        const { navigation } = this.props;
        if (idx < users.length) {
            const { id } = users[idx];
            return (
                <User 
                    user={users[idx]}
                    onPress={() => navigation.push('survey', { userid: idx, screen: 0 })}
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
                <Text>
                    Loading...
                </Text>
            );
        }
        return (
            <Background>
                <Header>
                    Please select a family member
                </Header>
                <Divider/>
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
