import { SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    Keyboard } from "react-native"
import {useState, useEffect} from 'react'
import { Svg, Path  } from 'react-native-svg';
import { styles } from "../styles/commonStyle";
import { loginRegisterStyles } from "../styles/loginRegisterStyles";
import { buttonStyles } from "../components/ButtonStyles";
import { validateEmail, validatePassword } from "../ultils/validate";
import { getAccessToken, loginApi, setAccessToken } from "../services/authentication/loginRegesterServices";
import HeaderSearch from "../components/header/HeaderSearch";

const NotFoundScreen = ( {navigation} : {navigation: any} ) => {
    return (
        <SafeAreaView style={[stylecss.container]} >
            <HeaderSearch/>
            <View style={stylecss.mainContainer}>
                <Image style={stylecss.image} source={require('../assets/404.png')} />
                <Text style={stylecss.text}>Không tìm thấy kết quả tìm kiếm</Text>
            </View>
        </SafeAreaView>
    )
}

const stylecss = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    mainContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 205,
        height: 250, 
        marginBottom: 10,
        alignContent: 'center',
    },   
    text :{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#365DA4'
    }
});    

export default NotFoundScreen

