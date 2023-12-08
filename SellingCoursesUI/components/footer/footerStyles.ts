import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const footerStyles = StyleSheet.create({
    footerContainer: {
        flex: 0,
        flexDirection: 'row',
        width: "100%",
        height: 60,
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 4,
        zIndex: 999,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#bfc9c2',
    },
    icon_container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center",
    },
    footerContainerLesson: {
        flex: 0,
        flexDirection: 'row',
        width: "100%",
        height: 65,
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 4,
        zIndex: 999,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#bfc9c2',
    },
})