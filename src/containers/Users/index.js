import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import LeaderBoard from '../../assets/JsonData/leaderboard.json';

const tableHead = ['Name', 'Rank', 'Number of bananas', 'isCurrentUser?'];
const widthArr = [200, 100, 200, 150];


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#0A77BC' },
    headerText: { fontWeight: '700', color: 'black', fontSize: 16, textAlign: 'center' },
    text: { textAlign: 'center', fontWeight: '300', color: 'black' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40 }
});

function Users({ route, navigation }) {
    const { currentUserId } = route.params;

    const [topTenUsers, setTopTenUsers] = useState([]);

    const [sortedLeaderBoard, setSortedLeaderBoard] = useState(null);

    const [topTenUsersObject, setTopTenUsersObject] = useState({});

    useEffect(() => {
        if (sortedLeaderBoard == null) {
            let sortedLeaderBoardEntries = Object.entries(LeaderBoard)
                .sort((userA, userB) => userB[1].bananas - userA[1].bananas)
                .map((user, index) => {
                    user[1].rank = index + 1;
                    return user;
                });

            let topTenUsersEntries = sortedLeaderBoardEntries.slice(0, 10);


            setTopTenUsersObject(Object.fromEntries(topTenUsersEntries));
            setSortedLeaderBoard(Object.fromEntries(sortedLeaderBoardEntries))
            setTopTenUsers(topTenUsersEntries.map(userEntries => userEntries[1]));
        }
    })

    const makeDataToShow = () => {
        if (sortedLeaderBoard !== null && topTenUsersObject[`${currentUserId}`] === undefined) {
            let dataToShow = topTenUsers;
            dataToShow.pop();
            dataToShow.push(sortedLeaderBoard[`${currentUserId}`]);
            return dataToShow;
        }

        return topTenUsers;
    }

    const filterDataToShow = (dataToShow) => {
        if (dataToShow.length == 0) return [];
        return dataToShow.map((userData) => [userData.name, userData.rank, userData.bananas, userData.uid === currentUserId ? 'yes' : 'no', userData.uid]);
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                        <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.headerText} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            {filterDataToShow(makeDataToShow()).map((user, index) => (
                                <Row
                                    data={user}
                                    key={index}
                                    widthArr={widthArr}
                                    style={styles.row}
                                    textStyle={[styles.text, user[3] === 'yes' && { color: 'red' }]}
                                />
                            ))}
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}


export default Users;