import {
    View,
    SafeAreaView,
    Text,
    Touchable,
    TouchableOpacity
} from 'react-native';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { Svg, Path } from "react-native-svg"
import { styles } from "../../styles/commonStyle";
import React, { useEffect, useState } from 'react'
import { GIO_HANG, KHOA_HOC_BAN_CHAY, KHOA_HOC_MOI, KHOA_HOC_UU_DAI, NOTIFICATION } from '../../ultils/courseCatergories';
import { headerStyles } from './Header';
import { getAccessToken } from '../../services/authentication/loginRegesterServices';
import { getUserEmailFromToken } from '../../services/common';

const HeaderShoppingCart = () => {

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    const courseName = router.params.tenKhoaHoc

    const [userEmail, setUserEmail] = useState<string>()

    const getUserEmail = async () => {
        var token = await getAccessToken()
        var email = getUserEmailFromToken(token)
        setUserEmail(email)
    }

    useEffect(() => {
        getUserEmail()
    }, [])

    return (
        <View>
            <View style={[styles.horizontal_container, styles.item_space_between,
            styles.item_center,
            headerStyles.header_container]}>

                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View>
                        <Svg style={[styles.icon_style]} viewBox="0 0 448 512"><Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></Svg>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={[styles.header_text_3, styles.text_center]}>
                        {courseName}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("CartScreen", {
                        filtterType: GIO_HANG,
                        userEmail: userEmail
                    })
                }}>
                    <View>
                        <Svg style={[styles.icon_style]} viewBox="0 0 576 512"><Path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></Svg>
                    </View>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default HeaderShoppingCart