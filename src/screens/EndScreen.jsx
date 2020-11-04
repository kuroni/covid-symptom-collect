import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, DataTable } from 'react-native-paper';

import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { getSummary } from '../helper/misc';

export default class EndScreen extends Component {
    render() {
        const { navigation } = this.props;
        const summary = getSummary();
        return (
            <Background>
                <Logo />
                <Header>Thank you</Header>
                <View style={{ alignContent: 'center' }}>
                    <Text style={styles.outerText}>
                        We have received <Text style={styles.innerText}>
                            {summary.count}
                        </Text> reports so far, with <Text style={styles.innerText}>
                            {summary.cases}%
                        </Text> of reports from a patient with COVID-19.
                    </Text>
                </View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Symptoms</DataTable.Title>
                        <DataTable.Title numeric>Percentage</DataTable.Title>
                    </DataTable.Header>
                    {
                        summary.stats.map((value, idx) => (
                            <DataTable.Row key={idx}>
                                <DataTable.Cell>{value.name}</DataTable.Cell>
                                <DataTable.Cell numeric>{value.percent}%</DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }

                    {/* <DataTable.Pagination
                        page={1}
                        numberOfPages={3}
                        onPageChange={page => {
                            console.log(page);
                        }}
                        label="1-2 of 6"
                    /> */}
                </DataTable>
                <Button mode="outlined" onPress={() => navigation.navigate('User')}>
                    Continue survey
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('Home')}>
                    Go to Home
                </Button>
            </Background>
        );
    }
}


const styles = StyleSheet.create({
    outerText: {
        fontSize: 16,
        padding: 10
    },
    innerText: {
        fontWeight: 'bold'
    }
});

