import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Modal } from 'react-native-paper';

import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

import User from '../components/User';
import storage from '../helper/storage';

export default class UserScreen extends Component {
    state = {
        newName: '',
        users: null,
        visible: false
    };

    fetchFromStorage = () => {
        storage.getAllDataForKey('users')
            .then(users => {
                this.setState({ users: users });
            })
            .catch(err => {
                switch (err.name) {
                    case 'NotFoundError':
                        this.setState({ users: {} });
                }
            });
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.fetchFromStorage);
    }

    addUser = () => {
        for (let i = 1; i <= 6; i++) {
            let valid = true;
            for (const user of this.state.users) {
                if (user.id == i) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                storage.save({
                    key: 'users',
                    id: i,
                    data: {
                        id: i,
                        name: this.state.newName
                    }
                }).then(() => {
                    this.setState({ newName: '', highlightedID: 0, dialogType: 0 });
                    this.fetchFromStorage();
                });
                this.setState({ visible: false });
                return;
            }
        }
    }

    removeUser = (idx) => {
        storage.remove({ key: 'users', id: idx })
            .then(() => {
                this.fetchFromStorage();
            });
    }

    switchToSurvey = (idx) => {
        this.props.navigation.navigate('Survey', { userid: idx });
        // const { users, highlightedID } = this.state;
        // if (highlightedID != 0) {
        //     for (const user of users) {
        //         if (user.id == highlightedID) {
        //             this.setState({ highlightedID: 0 });
        //             this.props.navigation.navigate('Survey', { userid: highlightedID });
        //             return;
        //         }
        //     }
        // }
    }

    renderChild = (idx) => {
        const { users } = this.state;
        if (idx < users.length) {
            const { id } = users[idx];
            return (
                <User user={users[idx]} onPress={() => this.switchToSurvey(id)} onLongPress={() => this.removeUser(id)}/>
            );
        } else {
            return (
                <User user={null} onPress={() => this.setState({ visible: true })}/>
            );
        }
    }

    render() {
        const { users, visible } = this.state;
        if (!users) {
            return (
                <Text>
                    Loading...
                </Text>
            );
        }
        return (
            <Background>
                {/* <View style={styles.userColumn}> */}
                    <View style={styles.userRow}>
                        {this.renderChild(0)}
                        {this.renderChild(1)}
                    </View>
                    <View style={styles.userRow}>
                        {this.renderChild(3)}
                        {this.renderChild(4)}
                    </View>
                    <View style={styles.userRow}>
                        {this.renderChild(5)}
                        {this.renderChild(6)}
                    </View>
                    <Modal visible={visible} onDismiss={() => this.setState({ visible: false })}>
                        <View style={styles.popup}>
                            <Text>Please input user's nickname</Text>
                            <TextInput
                                mode="flat"
                                // style={styles.input}
                                value={this.state.newName}
                                label="Name"
                                placeholder="User's nickname"
                                onChangeText={(text) => this.setState({ newName: text })}
                            />
                            <View style={styles.buttons}>
                                <Button mode="outlined" onPress={() => this.addUser()}>
                                    Add
                                </Button>
                                <Button mode="contained" onPress={() => this.setState({ visible: false })}>
                                    Cancel
                                </Button>
                            </View>
                        </View>
                    </Modal>
                {/* </View> */}
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'blue'
    },
    userColumn: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    userRow: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around'
    },
    userOn: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'skyblue'
    },
    userOff: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        padding: 15,
        height: 50
    },
    popup: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
});
