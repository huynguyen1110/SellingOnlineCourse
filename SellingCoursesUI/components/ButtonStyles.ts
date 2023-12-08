import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
    large_blue_button: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#81b1eb",
        borderRadius: 5
    },
    large_red_button: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        borderRadius: 5
    },
    square_button: {
        width: 65,
        height: 65,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16
    },
    catogories_button: {
        width: 116,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        backgroundColor: '#d1cbcb',
        padding: 4
    },
    custom_large_button: {
        width: "100%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#81b1eb",
        borderRadius: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
        padding: 4
    },
    paying_button: {
        width: '95%',
        height: 40,
        borderRadius: 6,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: 'center'
    }
})