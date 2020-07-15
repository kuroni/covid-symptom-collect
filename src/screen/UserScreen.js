import React, { Component } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

import database from '../helper/database.js';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class UserScreen extends Component {
    state = {
        highlightedID: 0,
        users: null
    };

    componentDidMount() {
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

    renderChild = (user) => {
        const { name, id } = user;
        const { highlightedID } = this.state;
        console.log(id + ' ' + highlightedID);
        return (
            <TouchableHighlight
                style={id == highlightedID ? styles.userOn : styles.userOff}
                onPress={() => this.setState({ highlightedID: (highlightedID == id ? 0 : id) })}
            >
                <Text>
                    {name}
                </Text>
            </TouchableHighlight>
        );
    }

    render() {
        const { users } = this.state;
        const { navigation } = this.props;
        if (!this.state.users) {
            return (
                <Text>
                    Loading...
                </Text>
            );
        }
        return (
            <View>
                {users.map(user => this.renderChild(user))}
                <Button 
                    title="Go to Survey!"
                    onPress={() => navigation.navigate('Survey', {userid: this.state.highlightedID})}
                />
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
    }
});
