import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { useNavigation } from "@react-navigation/native"
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { adminMenuStyle } from './adminMenuStyles';
import { styles } from '../../../styles/commonStyle';
import { UserInfoInterface } from '../../../services/interfaces/commoninterfaces';
import { getUserByEmail, setAccessToken } from '../../../services/authentication/loginRegesterServices';
import { SafeAreaView } from 'react-native';


const AdminMenu = ({ visible, onClose, userEmail }: { visible: any, onClose: any, userEmail: string }) => {

    const navigation = useNavigation<any>()

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

    const getUser = async () => {
        try {
            const response = await getUserByEmail(userEmail)
            const { data } = response
            setUserInfo(data)
        } catch (err) {
            console.log("Lỗi lấy người dùng ở admin Menu", err)
        }
    }

    useEffect(() => {
        getUser()
    }, [userEmail])

    const handleNavigateToAdminDashboard = () => {
        navigation.navigate("AddashboardScreen", { userEmail })
        onClose();
    }
    const handleNavigateToAdminCourseMangement = () => {
        navigation.navigate("AdminCourseScreenManagement", { userEmail })
        onClose();
    }

    const handleNavigateToPaymentManagement = () => {
        navigation.navigate("AdminPaymentScreen", { userEmail })
        onClose();
    }

    const handleNavigateToAdminManaScreen = () => {
        navigation.navigate("AdminManaScreen",{userEmail})
        onClose();
    }

    // const handleNavigateToAdminManaScreen = () => {
    //     navigation.navigate("AdminManaScreen",{userEmail})
    // }
    return (
        <Modal style={[styles.container, adminMenuStyle.modalContainer]} isVisible={visible} animationIn="slideInLeft" animationOut="slideOutLeft" onBackdropPress={onClose}>
            <SafeAreaView>
                <View>
                    <Text style={[styles.header_text_2, styles.text_bold, styles.item_center, styles.text_white]}>Trang quản lý ứng dụng</Text>
                </View>

                <View style={[styles.horizontal_container, styles.small_margin_vertical, styles.item_center]}>
                    <Icon style={[styles.small_marginHorizontal, styles.text_white]} name='user-circle' size={20} />
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>{userInfo.lastName + " " + userInfo.firstName}</Text>
                </View>
                <View style={[styles.underline_border]}></View>

                <TouchableOpacity style={[styles.horizontal_container, styles.medium_margin_top, adminMenuStyle.menu_button]} onPress={handleNavigateToAdminDashboard}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="home" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý chung</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="users" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý người dùng</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]} onPress={handleNavigateToAdminCourseMangement}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="book" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý khóa học</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]} onPress={handleNavigateToPaymentManagement}>
                    <View style={[styles.medium_icon_style]}>
                        <MaterialIcons style={[styles.text_white]} name="payment" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý thanh toán</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]}>
                    <View style={[styles.medium_icon_style]}>
                        <Entypo style={[styles.text_white]} name="text-document" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý khóa học đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]} onPress={handleNavigateToAdminManaScreen}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="book" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Quản lý bài học</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]} onPress={() => {
                    navigation.navigate("HomeScreen")
                    onClose();
                }}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="house-user" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Trang người dùng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.horizontal_container, adminMenuStyle.menu_button]} onPress={() => {
                    setAccessToken("")
                    navigation.navigate("LoginScreen")
                    onClose();
                }}>
                    <View style={[styles.medium_icon_style]}>
                        <Icon style={[styles.text_white]} name="sign-out-alt" size={20} />
                    </View>
                    <Text style={[styles.text_content, styles.text_bold, styles.text_white]}>Đăng xuất</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
}

export default AdminMenu
