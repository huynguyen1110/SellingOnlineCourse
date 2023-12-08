import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderSecurity from '../components/header/HeaderSecurity';

const SecurityScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderSecurity />
            <ScrollView>
                <View style={stylecss.container}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 22 }}>Quyền riêng tư</Text>
                        <Icon name="angle-right" color="black" size={27} />
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 15 }} />
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 22 }}>Xóa tài khoản </Text>
                        <Icon name="angle-right" color="black" size={27} />
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 10 }} />
                </View>

            </ScrollView>
        </SafeAreaView>

    )
};
const stylecss = StyleSheet.create({
    container: {
        marginTop: 30,
        marginHorizontal: 25
    }
})

export default SecurityScreen