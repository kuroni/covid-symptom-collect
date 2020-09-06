import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Subheading, Text, Button } from 'react-native-paper';

import { auth } from '../helper/firebaseWrapper';
import AuthContext from '../helper/context';

export default class RegisterScreen extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    }

    registerUser = (userChange) => {
        const { email, password } = this.state;
        auth.createUserWithEmailAndPassword(email, password)
            .then(user => userChange(user))
            .catch(err => {
                console.log(err);
                this.setState({ error: String(err) });
            });
    }

    loginUser = (userChange) => {
        const { email, password } = this.state;
        auth.signInWithEmailAndPassword(email, password)
            .then(user => userChange(user))
            .catch(err => {
                console.log(err);
                this.setState({ error: String(err) });
            });
    }

    render() {
        const { email, password, error } = this.state;
    
        return (
            <AuthContext.Consumer>
                {({ userChange }) => (
                    <View>
                        <Subheading>
                            Email
                        </Subheading>
                        <TextInput value={email} placeholder='Your email' onChangeText={email => this.setState({ email })} />
                        <Subheading>
                            Password
                        </Subheading>
                        <TextInput value={password} placeholder='Your password' onChangeText={password => this.setState({ password })} />
                        <Text style={{ color: 'red' }}>
                            {error}
                        </Text>
                        <Button mode="contained" onPress={() => this.loginUser(userChange)}>
                            Login
                        </Button>
                        <Button mode="outlined" onPress={() => this.registerUser(userChange)}>
                            Register
                        </Button>
                    </View>
                )}
            </AuthContext.Consumer>
        );
    }
}
