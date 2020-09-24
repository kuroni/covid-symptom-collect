import React, { Component } from 'react';
import { Text } from 'react-native-paper';

import Background from '../components/Background';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';

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
                    <Background>
                        <Logo/>

                        <Header>
                            Welcome back
                        </Header>

                        <TextInput
                            value={email}
                            label="Email"
                            onChangeText={email => this.setState({ email })}
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                        <TextInput
                            value={password}
                            label='Password'
                            onChangeText={password => this.setState({ password })} 
                            returnKeyType="done"
                            secureTextEntry
                        />

                        <Text style={{ color: 'red' }}>
                            {error}
                        </Text>

                        <Button mode="contained" onPress={() => this.loginUser(userChange)}>
                            Login
                        </Button>
                        <Button mode="outlined" onPress={() => this.registerUser(userChange)}>
                            Register
                        </Button>
                    </Background>
                )}
            </AuthContext.Consumer>
        );
    }
}
