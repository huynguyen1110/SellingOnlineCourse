import { StyleSheet } from "react-native";

export const courseContentStyles = StyleSheet.create({
    item_container: {
        borderWidth: 1,
        width: 180,
        height: 250,
        marginRight: 8,
        borderRadius: 6,
        borderColor: '#bfc9c2',
        justifyContent: 'space-between',
        padding: 8,
    },
    inner_item: {
        padding: 4
    },
    image_course_style: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch'
    },
    rating_stars_container: {
        flex: 0,
        flexDirection: 'row',
        margin: 3
    },
    rating_start_style: {
        height: 18,
        width: 18,
        opacity: 0.3
    }
})