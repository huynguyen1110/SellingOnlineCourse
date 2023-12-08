import { SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View, 
    Keyboard,
    ActivityIndicator } from "react-native"
import {useState} from 'react'
import { Svg, Path  } from 'react-native-svg';
import { styles } from "../styles/commonStyle";
import { loginRegisterStyles } from "../styles/loginRegisterStyles";
import { buttonStyles } from "../components/ButtonStyles";
import { validateEmail, validateFullName, validatePassword } from "../ultils/validate";
import { forgotPassword } from "../services/authentication/loginRegesterServices";
import { useNavigation } from "@react-navigation/native";


const ForgotPassWordScreen = () => {
    const navigation = useNavigation<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: ''
    });
    
    const [errors, setErrors] = useState({
        email: ''
    });

    const handleResetPassword = async() => {
        Keyboard.dismiss();
        try {
            const emailError = validateEmail(formData.email);
            setErrors({
                email: emailError
            })
            if(emailError == "")
            {
                setIsLoading(true);
                const response = await forgotPassword(formData.email);
                if(response?.data?.statusCode == "Success")
                {
                    setIsLoading(false);
                    alert("Thay đổi mật khẩu thành công");
                    navigation.navigate("LoginScreen");
                }
                else
                {
                    setIsLoading(false);
                    alert(response?.data?.message)
                }
                }
        } catch (error) {
            setIsLoading(false);
            alert(error)
        }

    }

    return (
        <SafeAreaView style={[styles.main_container]} >
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>): (<View></View>)}
            <View style={[loginRegisterStyles.form_container]}>
                <View style={[styles.large_margin_top]}>
                    <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
                        <Svg style={[styles.icon_style]} viewBox="0 0 512 512">
                            <Path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                        </Svg>
                        <TextInput style={[styles.text_input]} placeholder="Email" onChangeText={(value) => {
                            setFormData({
                                email: value
                            })
                        }}/>
                    </View>
                    <View style={[styles.underline_border]}></View>
                    <Text style={[loginRegisterStyles.err_message]}>{errors.email}</Text>

                    

                    <TouchableOpacity style={[buttonStyles.large_blue_button, styles.medium_margin_vertical]}
                    onPress={handleResetPassword}
                    >
                        <Text style={[styles.text_content]}>Gửi mật khẩu cho tôi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassWordScreen