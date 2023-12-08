import { StyleSheet } from 'react-native'

export const payingScreenStyles = StyleSheet.create({
    content_container: {
        width: "90%",
        height: 100,
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.3)'
    },
    content_container1: {
        width: "90%",
        height: 100,
    },
    qr_image: {
        height: 150,
        width: 150,
        resizeMode: 'stretch'
    },
    modal_container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    close_buton: {
        width: 40,
        height: 40,
        padding: 4
    },
    file_choosing_btn: {
        width: 60,
        height: 20,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    comfirm_btn: {
        width: "100%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#365DA4'
    }
})