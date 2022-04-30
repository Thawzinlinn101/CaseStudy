import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

function Home({ navigation }) {
    const [inputName, setInputName] = useState(null);

    const _onChangeUserName = (text) => {
        setInputName(text);
    }

    const clearUserName = () => {
        setInputName(null);
    }

    const onSubmit = () => {
        navigation.navigate('Users', { userName: inputName })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
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
                        label="User Name"
                        right={<TextInput.Icon name="close" color={'#d8d8d8'} onPress={clearUserName} />}
                        value={inputName}
                        onChangeText={(text) => _onChangeUserName(text)}
                        outlineColor='black'
                        maxLength={20}
                        activeOutlineColor='#0A77BC'
                    />
                </View>
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