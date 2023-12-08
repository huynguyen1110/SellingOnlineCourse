
import { getKhoaHocYeuThich } from '../services/course_services/courseServices';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native"
import { formatMoney, getUserEmailFromToken, getUserTypeFromToken } from '../services/common';
import { styles } from '../styles/commonStyle';
import Footer from '../components/footer/Footer';
import HeaderAccount from '../components/header/HeaderAccount';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { getAccessToken, getUserByEmail, setAccessToken } from '../services/authentication/loginRegesterServices';
import { UserInfoInterface } from '../services/interfaces/commoninterfaces';
import { ADMIN_ROLE } from '../ultils/userTypes';

const AccountScreen = () => {

    const navigation = useNavigation<any>()

    const [isSupportModalVisible, setSupportModalVisible] = useState(false)

    const [userEmail, setUserEmail] = useState<string>("")

    const [userType, setUserType] = useState()

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

    const showSupportModal = () => {
        setSupportModalVisible(true);
    };

    const hideSupportModal = () => {
        setSupportModalVisible(false);
    };

    const handleLogout = () => {
        setAccessToken(""),
            navigation.navigate("LoginScreen")
    }

    const getUserEmail = async () => {
        var token = await getAccessToken()
        var email = getUserEmailFromToken(token)
        setUserEmail(email)
    }

    const getUserType = async () => {
        const accessToken = await getAccessToken()
        var type = getUserTypeFromToken(accessToken)
        setUserType(type)
    }

    useEffect(() => {
        getUserEmail()
        getUserType()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <HeaderAccount />
            <ScrollView>
                <View style={stylecss.contents} >
                    <View style={stylecss.first}>
                        <Icon name="user-circle" color="#199be6" size={65} style={stylecss.logo} />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, paddingVertical: 10 }}>Tên đăng nhập</Text>
                        <Text style={{ fontSize: 15 }}>Email liên hệ ({userEmail})</Text>
                    </View>
                    {userType == ADMIN_ROLE &&
                        <View style={{display: 'flex', justifyContent: 'center', alignItems:'center', marginBottom: 15}}>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("AddashboardScreen", { userEmail: userEmail })
                            }} style={{borderRadius: 20, backgroundColor: '#365DA4', width: '40%', paddingVertical: 5}}>
                                <Text style={{ fontSize: 16, fontWeight: '700', textAlign: 'center', color:'#fff' }}>Trang quản lý</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    <View>
                        <TouchableOpacity onPress={() => { navigation.navigate("UpdateAccountScreen", { userEmail: userEmail }) }} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Cập nhật hồ sơ</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("ChangePasswordScreen") }} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Thay đổi mật khẩu</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("NotifyScreen") }} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Hộp thư thông báo</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("RouteStudyScreen") }} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Lộ trình học tập</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showSupportModal} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Hỗ trợ khách hàng</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate("SecurityScreen") }} style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Cài đặt và bảo mật</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={stylecss.next}>
                            <Text style={{ fontSize: 15 }}>Đánh giá ứng dụng</Text>
                            <Icon name="angle-right" color="black" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={stylecss.second}>
                        <TouchableOpacity onPress={handleLogout} style={stylecss.out}>
                            <Text style={{ fontSize: 20, marginRight: 10, color: "#e02c26" }}>Đăng xuất </Text>
                            <Icon name="sign-out" color="#e02c26" size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Footer></Footer>
            <Modal isVisible={isSupportModalVisible}>
                <View style={stylecss.modalContent}>
                    <View style={stylecss.buttonclose}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: '40%' }}>Hỗ trợ</Text>
                        <TouchableOpacity onPress={hideSupportModal}>
                            <Icon name="close" color="black" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.5, marginVertical: 10 }} />
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                            <Icon name="phone" color="black" size={25} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 8 }}>Số điện thoại hỗ trợ</Text>
                        </View>
                        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                            <Icon name="envelope-o" color="black" size={22} />
                            <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 8 }}>Email</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
};

const stylecss = StyleSheet.create({
    contents: {
        marginHorizontal: 30,
        marginVertical: 20,
    },
    first: {
        alignItems: 'center',
        paddingBottom: 15
    },
    logo: {

    },
    next: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical: 5
    },
    second: {
        alignItems: 'center',
        paddingTop: 30
    },
    out: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '96%',
        marginHorizontal: "2%",
        height: 180,
        paddingVertical: 10,

    },

    buttonclose: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10

    }
})

export default AccountScreen;
