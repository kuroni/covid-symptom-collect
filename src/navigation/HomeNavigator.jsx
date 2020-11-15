import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/HomeScreen';
import EndScreen from '../screens/EndScreen';
import SurveyScreen from '../screens/SurveyScreen';
import UserScreen from '../screens/UserScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
function HomeTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Our data" component={ResultScreen} />
        </Tab.Navigator>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

const Stack = createStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator
            headerMode="none"
            initialRouteName="home"
        >
            <Stack.Screen name="home" component={HomeTabNavigator} />
            <Stack.Screen name="user" component={UserScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="survey" component={SurveyScreen} />
            <Stack.Screen name="end" component={EndScreen} />
            <Stack.Screen name="result" component={ResultScreen} />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <StackNavigator />
        </NavigationContainer>
    );
}
