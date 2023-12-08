import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    ActivityIndicator,
    Keyboard
} from "react-native"
import { useState, useEffect } from 'react'
import { Svg, Path } from 'react-native-svg';
import { styles } from "../styles/commonStyle";
import { loginRegisterStyles } from "../styles/loginRegisterStyles";
import { buttonStyles } from "../components/ButtonStyles";
import { validateEmail, validatePassword } from "../ultils/validate";
import { getAccessToken, loginApi, setAccessToken } from "../services/authentication/loginRegesterServices";
import { decodeToken } from "../services/common";


const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [passwordVisible, setPasswordVisible] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const resetFormData = () => {
        setFormData({
            email: '',
            password: ''
        })
    }

    const handleLogin = async () => {
        try {
            const emailError = validateEmail(formData.email);
            let passwordEmptyErr = ''
            if (formData.password == '') {
                passwordEmptyErr = "Vui lòng nhập mật khẩu"
            }
            setErrors({
                email: emailError,
                password: passwordEmptyErr
            })
            Keyboard.dismiss();
            if (emailError === '' && formData.password !== '') {
                Keyboard.dismiss();
                setIsLoading(true)
                var loginData = await loginApi(formData);
                if (loginData?.data?.token) {
                    setIsLoading(false)
                    setAccessToken(loginData?.data?.token);
                    navigation.navigate("HomeScreen", resetFormData())
                } else {
                    setIsLoading(false)
                    alert(loginData?.data?.message)
                }
            }
        } catch (error) {
            setIsLoading(false)
            alert(error)
        }
    }

    const checkLogin = async () => {
        var token = await getAccessToken();
        if (token && token === '') {
            navigation.navigate("HomeScreen")
        }
    }

    useEffect(() => {
        setIsLoading(false)
        checkLogin();
    }, [])
    return (
        <SafeAreaView style={[styles.main_container]} >
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>) : (<View></View>)}
            <View style={[loginRegisterStyles.form_container]}>
                <View style={loginRegisterStyles.logoContainer}>
                    <Image style={loginRegisterStyles.logo} source={require('../assets/Logo5.png')} />
                </View>
                <Text style={[loginRegisterStyles.header_text_2, styles.text_center]}>Đăng nhập</Text>
                <View style={[styles.large_margin_top]}>
                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 512 512">
                            <Path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                        </Svg>
                        <TextInput style={[styles.text_input]} value={formData.email} placeholder="Email" onChangeText={(value) => setFormData({
                            ...formData,
                            email: value
                        })} />
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.email}</Text>

                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <View style={[styles.horizontal_container]}>
                            <Svg style={[styles.icon_style]} viewBox="0 0 448 512">
                                <Path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                            </Svg>
                            <TextInput style={styles.text_input} value={formData.password} placeholder="Nhập mật khẩu" secureTextEntry={!passwordVisible}
                                onChangeText={(value) => setFormData({
                                    ...formData,
                                    password: value
                                })}
                            />
                        </View>

                        <View>
                            <TouchableOpacity style={styles.item_space_between} onPress={() => setPasswordVisible(!passwordVisible)}>
                                <Svg style={styles.icon_style} viewBox="0 0 640 512">

                                    {!passwordVisible ? (<Path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />)
                                        :
                                        (<Path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />)
                                    }
                                </Svg>

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.password}</Text>

                    <TouchableOpacity style={[buttonStyles.large_blue_button, styles.medium_margin_vertical]}
                        onPress={handleLogin}>
                        <Text style={[styles.text_content]}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={[styles.horizontal_container, styles.item_space_between]}>
                        <View>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ForgotPassWordScreen", resetFormData())
                            }}>
                                <Text style={[styles.text_content, styles.text_blue]}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.horizontal_container, styles.item_center, styles.small_margin_vertical]}>
                        <Text style={[styles.text_content]}>Bạn chưa có tài khoản ? </Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("RegisterScreen", resetFormData())
                            setErrors({
                                ...errors,
                                email: ''
                            })
                        }}>
                            <Text style={[styles.text_content, styles.text_blue]}>Đăng ký mới</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen