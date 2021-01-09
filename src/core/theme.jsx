
import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = DefaultTheme;

export const screenStyle = StyleSheet.create({
    header: {
        padding: 20
    },
    content: {
        alignContent: 'flex-start',
        width: '100%'
    }
})
