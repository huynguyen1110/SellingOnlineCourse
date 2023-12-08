import { StyleSheet } from "react-native";

export const loginRegisterStyles = StyleSheet.create({
    form_container: {
        flex: 1,
        width: '90%',
        justifyContent: 'center'
    },
    err_message: {
        fontSize: 13,
        color: "red",
        marginHorizontal: 4
    },
    logo: {
        width: 205,
        height: 62, 
        marginBottom: 10,
        alignContent: 'center',
    }, 
    logoContainer: {
        display: "flex", 
        width: '100%',
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    header_text_2: {
        fontWeight: "700",
        fontSize: 28
    },
})