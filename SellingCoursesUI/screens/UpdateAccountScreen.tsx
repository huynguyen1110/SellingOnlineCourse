import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { styles } from '../styles/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import HeaderUpdateAccount from '../components/header/HeaderUpdateAccount'
import { getUserByEmail, updateUserByEmail } from '../services/authentication/loginRegesterServices';
import { UserInfoInterface } from '../services/interfaces/commoninterfaces';
import { formatDatTime } from '../services/common';
import { validateEmail, validatePhoneNumber } from '../ultils/validate';

const UpdateAccountScreen = () => {

    const navigation = useNavigation<any>()

    const router = useRoute<any>()

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const userEmailAddress = router.params.userEmail

    const [userInfo, setUserInfo] = useState<UserInfoInterface>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        sdt: "",
        verify: false,
        idRole: 0,
        deleted: false,
        createAt: "",
        updateAt: "",
        yeuThich: false,
        gioiTInh: "",
        ngayThangNamSinh: ""
    })

    const [errors, setErrors] = useState({
        sdt: '',
        email: '',
    });

    const getUser = async () => {
        try {
            const response = await getUserByEmail(userEmailAddress)
            const { data } = response
            setUserInfo(data)
        } catch (err) {
            console.log(err)
        }
    }

    const updateUser = async () => {
        try {
            const response = await updateUserByEmail(userEmailAddress, userInfo)
            const { data } = response
            alert("Đã cập nhật thành công")
            navigation.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
    }, [userEmailAddress])


    const handleUpdateUserInfo = () => {
        const emailInputErr = validateEmail(userInfo.email);
        const phoneNumberErr = validatePhoneNumber(userInfo.sdt);
        setErrors({
            email: emailInputErr,
            sdt: phoneNumberErr
        })
    }

    useEffect(() => {
        if (errors.email !== '' || errors.sdt !== '') {
            alert(errors.email + "\n" + errors.sdt);
        } else {
            updateUser();
            getUser();
        }
    }, [errors])

    const showDatePicker = () => {
        setDatePickerVisibility(true)
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }

    const handleConfirm = (date: any) => {
        setUserInfo({
            ...userInfo,
            ngayThangNamSinh: date
        })
        hideDatePicker()
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderUpdateAccount />
            <ScrollView>
                <View style={stylist.contents}>

                    <Text style={{ fontSize: 18, opacity: 0.5, paddingBottom: 25 }}>THÔNG TIN CÁ NHÂN</Text>
                    <View style={stylist.inforaccount}>
                        <Icon name="user-circle" color="black" size={22} />
                        <Text style={stylist.text_input}>Họ    <Text style={{ color: 'red' }}>*</Text></Text>
                    </View>
                    <TextInput style={[styles.text_input]} value={userInfo.lastName} onChangeText={value => setUserInfo({
                        ...userInfo,
                        lastName: value
                    })} />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />

                    <View style={stylist.inforaccount}>
                        <Icon name="user-circle" color="black" size={22} />
                        <Text style={stylist.text_input}>Tên     <Text style={{ color: 'red' }}>*</Text></Text>
                    </View>
                    <TextInput style={[styles.text_input]} value={userInfo.firstName} onChangeText={value => setUserInfo({
                        ...userInfo,
                        firstName: value
                    })} />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />

                    <View style={stylist.inforaccount}>
                        <Icon name="envelope-o" color="black" size={20} />
                        <Text style={stylist.texttext}>Email</Text>
                        <Text style={{ color: 'red' }}>*</Text>
                    </View>
                    <TextInput style={[styles.text_input]} value={userInfo.email} onChangeText={value => setUserInfo({
                        ...userInfo,
                        email: value
                    })} />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />

                    <View style={stylist.inforaccount}>
                        <Icon name="phone" color="black" size={24} />
                        <Text style={stylist.texttext}>Số điện thoại</Text>
                        <Text style={{ color: 'red' }}>*</Text>
                    </View>
                    <TextInput style={[styles.text_input]} value={userInfo.sdt} onChangeText={value => setUserInfo({
                        ...userInfo,
                        sdt: value
                    })} />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />

                    <View style={stylist.inforaccount}>
                        <Icon name="birthday-cake" color="black" size={20} />
                        <Text style={stylist.texttext}>Ngày sinh</Text>
                    </View>
                    <Text style={[styles.text_input]} onPress={showDatePicker}>{formatDatTime(userInfo.ngayThangNamSinh)}</Text>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />

                    <View style={stylist.inforaccount}>
                        <Icon name="transgender" color="black" size={24} />
                        <Text style={stylist.texttext}>Giới tính</Text>
                    </View>
                    <TextInput style={[styles.text_input]} value={userInfo.gioiTInh} onChangeText={value => setUserInfo({
                        ...userInfo,
                        gioiTInh: value
                    })} />
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 8 }} />
                </View>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TouchableOpacity style={stylist.footer} onPress={handleUpdateUserInfo} >
                <Text style={stylist.footerText}>CẬP NHẬT TÀI KHOẢN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const stylist = StyleSheet.create({
    contents: {
        marginHorizontal: 30,
        marginVertical: 20,
    },
    inforaccount: {
        flexDirection: 'row',
    },
    texttext: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 15
    },
    footer: {
        backgroundColor: '#4287f5',
        alignItems: 'center',
        paddingVertical: 10,
    },
    footerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    text_input: {
        width: "80%",
        height: 30,
        padding: 8
    }
})

export default UpdateAccountScreen