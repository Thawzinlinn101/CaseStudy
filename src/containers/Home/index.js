import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import LeaderBoard from '../../assets/JsonData/leaderboard.json';

function Home({ navigation }) {
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userExisted, setUserExisted] = useState(true);

    const _onChangeUserId = (inputUserId) => {
        setCurrentUserId(inputUserId);
    }

    const clearUserId = () => {
        setUserExisted(true);
        setCurrentUserId(null);
    }

    const isUserExistById = (userId) => {
        return userId !== null && LeaderBoard[`${userId}`] !== undefined;
    }

    const onSubmit = () => {
        if (isUserExistById(currentUserId)) {
            setUserExisted(true);
            navigation.navigate('Users', { currentUserId });
        } else {
            setUserExisted(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 40 }}>
                    <Image
                        source={require('../../assets/Images/logo.jpeg')}
                        style={{ width: 130, height: 130, borderRadius: 10 }}
                        resizeMode='stretch'
                    />
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <TextInput
                        mode="outlined"
                        keyboardType='default'
                        label="User ID"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearUserId} />}
                        value={currentUserId}
                        onChangeText={(inputUserId) => _onChangeUserId(inputUserId)}
                        outlineColor='black'
                        activeOutlineColor='#0A77BC'
                    />
                </View>
                {!userExisted &&
                    <Text style={{ color: 'red', fontSize: 14, fontWeight: '500', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
                        Current user id does not exist! Please specify an existing user id!</Text>}
            </View>
            <View>
                <TouchableOpacity onPress={onSubmit}
                    style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: "#0A77BC",
                        borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, backgroundColor: "#0A77BC"
                    }}
                >
                    <Text style={{ fontSize: 18, color: "white" }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 20 }} />
        </View>
    );
}

export default Home;