import { StyleSheet } from "react-native";
import {Dimensions} from 'react-native'
import { Platform, StatusBar } from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    secondary_container: {
        flex: 1,
        width: "95%",
        marginLeft: 10,
        marginRight: 10,
    },
    main_container: {
        flex: 1,
        alignItems: 'center',
    },
    horizontal_container: {
        flex: 0,
        flexDirection: "row"
    },
    vertical_container: {
        flex: 1,
        flexDirection: "column"
    },
    icon_style: {
        width: 20,
        height: 20,
        marginHorizontal: 8,
        opacity: 0.6,
        padding: 8
    },
    large_icon_style: {
        width: 40,
        height: 40,
        marginHorizontal: 8,
        opacity: 0.6
    },
    medium_icon_style: {
        width: 30,
        height: 30,
        marginHorizontal: 8,
        opacity: 0.9, 
    },
    header_text_1: {
        fontWeight: "bold",
        fontSize: 40
    },
    header_text_2: {
        fontWeight: "700",
        fontSize: 24
    },
    header_text_3: {
        fontWeight: "700",
        fontSize: 20
    },
    text_center: {
        textAlign: "center"
    },
    text_left: {
        textAlign: "left"
    },
    strikethrough_text: {
        textDecorationLine: "line-through"
    },
    text_opacity: {
        opacity: 0.6,
    },
    text_content: {
        fontSize: 16,
    },
    small_text_content: {
        fontSize: 14
    },
    text_bold: {
        fontWeight: '500'
    },
    text_blue: {
        color: '#81b1eb'
    },
    text_red: {
        color: 'red'
    },
    text_orage: {
        color: "#eda955"
    },
    text_white: {
        color: 'white'
    },
    text_black: {
        color: 'black'
    },
    item_center: {
        alignSelf: 'center'
    },
    item_justify_center: {
        justifyContent: 'center'
    },
    item_space_between: {
        justifyContent: "space-between"
    },
    item_space_around: {
        justifyContent: "space-around"
    },
    underline_border: {
        borderBottomWidth: 2,
        opacity: 0.3,
        borderBottomColor: '#0a0a0a',
        width: "100%"
    },
    large_margin_top: {
        marginTop: 30
    },
    medium_margin_top: {
        marginTop: 20
    },
    medium_margin_vertical: {
        marginVertical: 20
    },
    small_margin_vertical: {
        marginVertical: 12
    },
    small_margin_top: {
        marginTop: 4
    },
    small_marginHorizontal: {
        marginHorizontal: 4
    },
    medium_marginHorizontal: {
        marginHorizontal: 8
    },
    large_marginHorizontal: {
        marginHorizontal: 20
    },
    text_input: {
        width: "80%",
        height: 30,
        padding: 8
    },
    full_with_text_input: {
        width: "100%",
        height: 30,
        padding: 8
    },
    background_purple: {
        backgroundColor: "#c004d1"
    },
    background_blue: {
        backgroundColor: "#365DA4"
    },
    background_green: {
        backgroundColor: "#158579"
    },
    background_red: {
        backgroundColor: "#ed0222"
    }, 
    input:{
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: '80%',
        borderColor: 'black', 
        padding: 8, 
        marginLeft: 10
    }, 
    flex_wrap:{
        flexWrap:"wrap"
    },
    text_bold_strong: {
        fontWeight: '700'
    }, 
    button:{
        borderWidth: 1, 
        borderColor:'rgb(20 110 190)',
        borderEndEndRadius: 5,
        borderStartEndRadius: 5,
        padding: 8
    }, 
    bg_primary:{
        backgroundColor: 'rgb(20 110 190)'
    },
    small_image: {
        width: 130,
        height: 70,
        resizeMode: 'stretch'
    }, 
    loading: {
        display: "flex",
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute', 
        backgroundColor: 'black', 
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5,
        zIndex: 50
    },
    app_background_color: {
        backgroundColor: '#365DA4',
    }
})