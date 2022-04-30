import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import LeaderBoard from '../../assets/JsonData/leaderboard.json';

const tableHead = ['Name', 'Rank', 'Number of bananas', 'isCurrentUser?'];
const widthArr = [200, 100, 150, 100];
const tableData = [
    ['1', '2', '3', '4'],
    ['21', '22', '23', '24'],
    ['31', '32', '33', '34'],
];

function xxx() {

    return sorted;
}

function Users({ route, navigation }) {
    const { userName } = route.params;

    let usersData = Object.entries(LeaderBoard).map(([id, value]) => ({
        id, ...value, rank: value['1'],
    })).sort((a, b) => b.bananas - a.bananas);

    let userIndex = usersData.findIndex(data => data.name == userName);

    let topTenUsers = usersData.slice(0, 10);
    if (userIndex > 9) {
        topTenUsers.pop();
        topTenUsers.push(usersData[userIndex])
    }

    topTenUsers = topTenUsers.map((data) =>
        [data.name, data.rank, data.bananas, userName === data.name ? 'yes' : 'no']
    )

    console.warn("test ----", topTenUsers[4] === 'yes');

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Rows
                                data={topTenUsers}
                                widthArr={widthArr}
                                // style={[styles.row, topTenUsers[4] === 'yes' && { backgroundColor: 'red' }]}
                                style={styles.row}
                                textStyle={styles.text}
                            />
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#0A77BC', fontWeight: '900', color: 'black' },
    text: { textAlign: 'center', fontWeight: '300', color: 'black' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40 }
});

export default Users;