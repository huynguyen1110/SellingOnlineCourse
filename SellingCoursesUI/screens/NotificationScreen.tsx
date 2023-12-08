import { View,
        SafeAreaView } from 'react-native';
import { styles } from '../styles/commonStyle';
import HeaderScreen from '../components/header/HeaderComponent';
import React from 'react'

const NotificationScreen = () => {
    return (
        <SafeAreaView style={[styles.container]}>
            <HeaderScreen />
        </SafeAreaView>
    )
}

export default NotificationScreen