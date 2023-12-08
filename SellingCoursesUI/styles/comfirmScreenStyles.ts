import { StyleSheet } from "react-native";

export const comFirmScreenStyles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f3e6',
        width: "100%"
    },
    from_user_input_container: {
        backgroundColor: 'white',
        width: "100%",
        height: 400,
        marginBottom: 20
    },
    course_list_container: {
        backgroundColor: 'white',
        width: "100%",
    },
    text_input: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'rgba(10, 10, 10, 0.3)',
        width: "90%",
        height: 50,
        padding: 3,
    },
    vertical_container: {
        flex: 1,
        flexDirection: "column"
    },
    align_item_center: {
        alignItems: 'center'
    }
})