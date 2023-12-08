import { SafeAreaView,
        Text,
        TextInput,
        TouchableOpacity,
        View,
        ActivityIndicator, 
        KeyboardAvoidingView, 
        ScrollView, 
        Platform, 
        Image } from "react-native"
import {useState, useEffect} from 'react'
import { Svg, Path  } from 'react-native-svg';
import { styles } from "../styles/commonStyle";
import { loginRegisterStyles } from "../styles/loginRegisterStyles";
import { buttonStyles } from "../components/ButtonStyles";
import { validateEmail, validateFullName, validatePassword, validatePhoneNumber } from "../ultils/validate";
import { registerApi } from "../services/authentication/loginRegesterServices";
import { useNavigation } from '@react-navigation/native'; 

const RegisterScreen = ( { navigation } : {navigation: any} ) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        sdt: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        sdt: '',
        email: '',
        password: '',
    });

    const handleRegister = async() => {
        try {
            const firstNameError = validateFullName(formData.firstName);
            const lastNameError = validateFullName(formData.lastName);
            const sdtError = validatePhoneNumber(formData.sdt);
            const emailError = validateEmail(formData.email);
            const passwordError = validatePassword(formData.password);
            
            setErrors({
                firstName: firstNameError,
                lastName: lastNameError,
                sdt: sdtError,
                email: emailError,
                password: passwordError,
            })

            
            if(firstNameError === ''&& lastNameError === '' 
            && sdtError === '' && emailError === '' && passwordError === '' )
            {
                setIsLoading(true)
                var registerResponse = await registerApi(formData);
                alert(registerResponse?.data?.message);
                navigation.navigate("LoginScreen");
            }

        } catch (error) {
            setIsLoading(false)
            alert(error)
        }
    }
    useEffect(() => {
        setIsLoading(false);
    },[])
    return (
        <SafeAreaView style={[styles.main_container]} >
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>): (<View></View>)}
            <KeyboardAvoidingView style={loginRegisterStyles.form_container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
                <View style={loginRegisterStyles.logoContainer}>
                    <Image style={loginRegisterStyles.logo} source={require('../assets/Logo5.png')} />
                </View>
                <Text style={[loginRegisterStyles.header_text_2, styles.text_center]}>Đăng ký</Text>

                <View style={[styles.large_margin_top]}>
                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 448 512">
                            <Path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Họ" onChangeText={(value) => setFormData( {
                            ...formData,
                            firstName: value
                        } )}/>
                    </View>

                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.firstName}</Text>

                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 448 512">
                            <Path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Tên" onChangeText={(value) => setFormData( {
                            ...formData,
                            lastName: value
                        } )}/>
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.lastName}</Text>

                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 512 512">
                            <Path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Số điện thoại" onChangeText={(value) => setFormData( {
                            ...formData,
                            sdt: value
                        } )}/>
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.sdt}</Text>

                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 512 512">
                            <Path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Email" onChangeText={(value) => setFormData( {
                            ...formData,
                            email: value
                        } )} />
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.email}</Text>

                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 448 512">
                            <Path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Nhập mật khẩu" secureTextEntry={true} onChangeText={(value) => setFormData( {
                            ...formData,
                            password: value
                        } )} />
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.password}</Text>

                    <TouchableOpacity style={[buttonStyles.large_blue_button, styles.medium_margin_vertical]}
                    onPress={handleRegister}
                    >
                        <Text style={[styles.text_content]}>Đăng Ký</Text>
                    </TouchableOpacity>

                    <View style={[styles.horizontal_container, styles.item_center]}>
                        <Text style={[styles.text_content]}>Bạn đã có tài khoản ? </Text>
                        <TouchableOpacity onPress={() => { 
                            navigation.navigate("LoginScreen") 
                            setErrors({
                                firstName: '',
                                lastName: '',
                                sdt: '',
                                email: '',
                                password: ''
                            })
                            } }>
                            <Text style={[styles.text_content, styles.text_blue]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen