import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import database from '../helper/database.js';

export default class UserScreen extends Component {
    state = {
        highlightedID: 0,
        dialogType: 0,
        newName: '',
        users: null
    };

    fetchFromDatabase = () => {
        database.getAllDataForKey('user')
            .then(users => {
                this.setState({ users: users });
            })
            .catch(err => {
                switch (err.name) {
                    case 'NotFoundError':
                        this.setState({ users: {} });
                        break;
                    default:
                        console.log('database error: ' + err.name);
                }
            });
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', this.fetchFromDatabase);
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
        for (const i = 1; i <= 6; i++) {
            let valid = true;
            for (const user in this.state.users) {
                if (user.id == i) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                database.save({
                    key: 'user',
                    id: i,
                    data: {
                        id: i,
                        name: this.state.newName,
                        data: '2020/07/15'
                    }
                }).then(() => {
                    this.setState({ newName: '', highlightedID: 0, dialogType: 0 });
                    this.fetchFromDatabase();
                });
                return;
            }
        }
    }

    removeUser = () => {
        database.remove({ key: 'user', id: this.state.highlightedID })
            .then(() => {
                this.setState({ dialogType: 0, highlightedID: 0 });
                this.fetchFromDatabase();
            });
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
            <View>
                {users.map(user => this.renderChild(user))}
                <Modal isVisible={dialogType == 1}>
                    <View style={{ flex: 1 }}>
                        <Text>Please input user's nickname</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.newName}
                            placeholder="User's nickname"
                            onChangeText={(text) => this.setState({ newName: text })}
                        />
                        <Button title="Add" onPress={this.addUser} />
                    </View>
                </Modal>
                <Modal isVisible={dialogType == 2 && highlightedID != 0}>
                    <View style={{ flex: 1 }}>
                        <Text>Please confirm removal</Text>
                        <Button title="Remove" onPress={this.removeUser} />
                    </View>
                </Modal>
                <View style={styles.buttons}>
                    <Button
                        title="Go to Survey!"
                        onPress={() => {
                            this.setState({ highlightedID: 0 });
                            this.props.navigation.navigate('Survey', { userid: highlightedID });
                        }}
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
        flex: 1
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
        flexDirection: 'row'
    },
    input: {
        padding: 15,
        height: 50
    }
});
