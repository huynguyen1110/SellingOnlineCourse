import { StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native';


export const filterModalPopUpStyles = StyleSheet.create({
    flexView: {
        flex: 1,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingTop: 12,
        paddingHorizontal: 12,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        minHeight: "60%",
        paddingBottom: 20,
        alignItems: 'center'
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    barIcon: {
        width: 60,
        height: 5,
        backgroundColor: "#bbb",
        borderRadius: 3,
    },
    text: {
        color: "#bbb",
        fontSize: 24,
        marginTop: 100,
    },
    btnContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 500,
    },
    dropdown2BtnStyle: {
        width: '90%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    dropdownDropdownStyle: {
        backgroundColor: '#444'
    },
    dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});