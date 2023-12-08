import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import React, { useEffect, useState } from 'react'
import { styles } from '../../styles/commonStyle';
import { headerStyles } from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdminMenu from '../drawer/Menu/AdminMenu';

const AdminHeader = (userEmail: {userEmail: any}) => {

    const navigation = useNavigation<any>()

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <SafeAreaView>
            <View style={[styles.horizontal_container, styles.item_space_between,
            styles.item_center,
            headerStyles.header_container]}>
                <View style={[styles.horizontal_container]}>
                    <Image style={[headerStyles.header_logo]} source={require('../../assets/Logo4.png')} />
                </View>
                <TouchableOpacity onPress={toggleModal}>
                    <View>
                        <Icon name='bars' size={24} />
                    </View>
                </TouchableOpacity>
            </View>
            <AdminMenu visible={modalVisible} onClose={toggleModal} userEmail={userEmail.userEmail} />
        </SafeAreaView>
    )
}

export default AdminHeader