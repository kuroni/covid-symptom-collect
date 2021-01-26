import React, { Component } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import color from 'color';

import HomeScreen from '../screens/HomeScreen';
import EndScreen from '../screens/EndScreen';
import SurveyScreen from '../screens/SurveyScreen';
import UserScreen from '../screens/UserScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreeen';

import { theme } from '../core/theme';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white'
    },
};

const Tab = createMaterialBottomTabNavigator();

function HomeTabNavigator() {
    return (
        <Tab.Navigator
            barStyle={{
                backgroundColor: color(theme.colors.primary).lighten(0.2).rgb().string()
            }}
        >
            <Tab.Screen
                name="home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={24} />
                    )
                }}
            />
            {/* <Tab.Screen
                name="data"
                component={ResultScreen}
                options={{
                    tabBarLabel: 'Our data',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="database" color={color} size={24} />
                    )
                }}
            /> */}
            <Tab.Screen
                name="settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'About us',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="information" color={color} size={24} />
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
            initialRouteName="home"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: color(theme.colors.primary).lighten(0.2).rgb().string(),
                },
                headerTitle: ""
            }}
        >
            <Stack.Screen name="home" component={HomeTabNavigator} />
            <Stack.Screen name="user" component={UserScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="survey" component={SurveyScreen} />
            <Stack.Screen name="end" component={EndScreen} />
            {/* <Stack.Screen name="result" component={ResultScreen} /> */}
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
