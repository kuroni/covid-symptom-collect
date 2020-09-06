import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Subheading, Button } from 'react-native-paper';

export default class LoginScreen extends Component {
    state = {
        email: "",
        password: ""
    }

    login = () => {
        const { email, password } = this.state;
        console.log(email + ' ' + password);
    }

    render() {
        const { email, password } = this.state;
    
        return (
            <View>
                <Subheading>
                    Email
                </Subheading>
                <TextInput value={email} placeholder='Your email' onChangeText={email => this.setState({ email })} />
                <Subheading>
                    Password
                </Subheading>
                <TextInput value={password} placeholder='Your password' onChangeText={password => this.setState({ password })} />
                <Button mode="contained" onPress={this.login}>
                    Login
                </Button>
            </View>
        );
    }
}
