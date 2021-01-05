import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import HomeScreen from '../screens/HomeScreen';
import EndScreen from '../screens/EndScreen';
import SurveyScreen from '../screens/SurveyScreen';
import UserScreen from '../screens/UserScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreeen';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

const Tab = createBottomTabNavigator();
function HomeTabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen 
                name="data"
                component={ResultScreen}
                options={{
                    tabBarLabel: 'Our data',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="database" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen 
                name="settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({color, size}) => (
                        <Icon name="settings" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

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
