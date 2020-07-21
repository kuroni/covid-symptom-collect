import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import storage from '../helper/storage';
import { getFullDate } from '../helper/misc';

export default class UserScreen extends Component {
    state = {
        highlightedID: 0,
        dialogType: 0,
        newName: '',
        users: null
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

    renderChild = (user) => {
        const { name, id } = user;
        const { highlightedID } = this.state;
        return (
            <TouchableOpacity
                style={id == highlightedID ? styles.userOn : styles.userOff}
                onPress={() => this.setState({ highlightedID: (highlightedID == id ? 0 : id) })}
            >
                <Text>
                    {name}
                </Text>
            </TouchableOpacity>
        );
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
                        name: this.state.newName,
                        date: new Date('1970-01-01')
                    }
                }).then(() => {
                    this.setState({ newName: '', highlightedID: 0, dialogType: 0 });
                    this.fetchFromStorage();
                });
                return;
            }
        }
    }

    removeUser = () => {
        storage.remove({ key: 'users', id: this.state.highlightedID })
            .then(() => {
                this.setState({ dialogType: 0, highlightedID: 0 });
                this.fetchFromStorage();
            });
    }

    switchToSurvey = () => {
        const { users, highlightedID } = this.state;
        if (highlightedID != 0) {
            for (const user of users) {
                if (user.id == highlightedID) {
                    if (getFullDate(new Date(user.date)) !== getFullDate(new Date())) {
                        this.setState({ highlightedID: 0 });
                        this.props.navigation.navigate('Survey', { userid: highlightedID });
                    }
                    return;
                }
            }
        }
    }

    render() {
        const { users, highlightedID, dialogType } = this.state;
        if (!users) {
            return (
                <Text>
                    Loading...
                </Text>
            );
        }
        return (
            <View style={styles.container}>
                {users.map(user => this.renderChild(user))}
                <Modal
                    isVisible={dialogType == 1 && users.length < 6}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                >
                    <View style={styles.popup}>
                        <Text>Please input user's nickname</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.newName}
                            placeholder="User's nickname"
                            onChangeText={(text) => this.setState({ newName: text })}
                        />
                        <View style={styles.button}>
                            <Button title="Add" onPress={this.addUser} />
                            <Button title="Cancel" onPress={() => this.setState({ dialogType: 0 })} />
                        </View>
                    </View>
                </Modal>
                <Modal
                    isVisible={dialogType == 2 && highlightedID != 0}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                >
                    <View style={styles.popup}>
                        <Text>Please confirm removal</Text>
                        <View style={styles.button}>
                            <Button title="Remove" style={styles.button} onPress={this.removeUser} />
                            <Button title="Cancel" style={styles.button} onPress={() => this.setState({ dialogType: 0 })} />
                        </View>
                    </View>
                </Modal>
                <View style={styles.buttons}>
                    <Button
                        title="Go to Survey!"
                        onPress={this.switchToSurvey}
                    />
                    <Button
                        title="Add user"
                        onPress={() => this.setState({ dialogType: 1 })}
                    />
                    <Button
                        title="Remove user"
                        onPress={() => this.setState({ dialogType: 2 })}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        color: 'blue'
    },
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
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
        justifyContent: 'space-around'
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
