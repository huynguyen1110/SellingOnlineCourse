import { StyleSheet } from 'react-native'

export const adminPaymentScreenStyles = StyleSheet.create({
    modal_container: {
        width: "95%",
        height: 600,
        backgroundColor: "white",
        padding: 4,
        alignSelf: 'center',
        borderRadius: 8
    },
    filter_modal_container: {
        backgroundColor: "white",
        width: "40%",
        alignSelf: 'flex-end',
        marginTop: 90,
        marginRight: 50
    },
    data_view_container: {
        width: 90,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4
    },
    paymentRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    paymentAmount: {
        flex: 1,
        textAlign: 'right',
        color: 'green'
    },
    button_style: {
        width: "45%",
        height: 50,
        borderRadius: 4,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payment_check_status: {
        color: 'green',
        textAlign: 'right'
    },
    payment_delete_status: {
        color: 'red',
        textAlign: 'right'
    }
})