import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Image
} from "react-native"
import {
    useState,
    useEffect,
    useRef
} from 'react'
import { Svg, Path } from 'react-native-svg';
import { styles } from "../../styles/commonStyle";
import { bestSallingCourses } from "../../services/course_services/course_fake_data";
import { CourseInterface } from "../../services/interfaces/commoninterfaces";
import { courseContentStyles } from "./CourseContentStyle";
import { getAllKhoaHoc, getKhoaHocBanChay, getKhoaHocMoi, getKhoaHocUuDai } from "../../services/course_services/courseServices";
import { CONG_NGHE_THONG_TIN, KHOA_HOC_BAN_CHAY, KHOA_HOC_MOI, KHOA_HOC_UU_DAI } from "../../ultils/courseCatergories";
import { formatMoney } from "../../services/common";
import { useNavigation } from "@react-navigation/native"

const CourseContents = () => {

    const [itCourses, setItCourses] = useState<CourseInterface[]>([])

    const [bestSellerCourses, setBestSellerCourses] = useState<CourseInterface[]>([])

    const [promoteCourses, setPromoteCourses] = useState<CourseInterface[]>([])

    const [newCourses, setNewCourses] = useState<CourseInterface[]>([])

    const navigation = useNavigation<any>()

    const getBestSellerCourses = async () => {
        try {
            const response = await getKhoaHocBanChay()
            const { data } = response
            setBestSellerCourses(data)
        } catch (err) {
            console.error(err);
        }
    }

    const getPromoteCourses = async () => {
        try {
            const response = await getKhoaHocUuDai()
            const { data } = response
            setPromoteCourses(data)
        } catch (err) {
            console.error(err);
        }
    }

    const getNewCourses = async () => {
        try {
            const response = await getKhoaHocMoi()
            const { data } = response
            setNewCourses(data)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getBestSellerCourses()
        getPromoteCourses()
        getNewCourses()
    }, [])

    const renderTopsellerItems = ({ item }: { item: CourseInterface }) => {

        let bestSellerItem = item
        let limitedName = bestSellerItem.tenKhoaHoc;
        if (limitedName.length > 30) {
            limitedName = limitedName.substring(0, 30) + '...';
        }

        if (item.deleted) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailCourseScreen", { khoaHocId: item.id, tenKhoaHoc: item.tenKhoaHoc })
            }}>
                <View style={[courseContentStyles.item_container, styles.medium_margin_vertical]}>
                    <Image
                        style={[courseContentStyles.image_course_style]}
                        source={
                            bestSellerItem.thumnail !== 'data'
                                ? { uri: bestSellerItem.thumnail }
                                : { uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png' }
                        }
                    />
                    {/* <Image style={[courseContentStyles.image_course_style]} source={{ uri: bestSellerItem.thumnail }} /> */}
                    <View style={[]}>
                        <View style={[courseContentStyles.inner_item]}>
                            <Text style={[styles.text_content]}>
                                {limitedName}
                            </Text>
                        </View>
                        <View style={[courseContentStyles.rating_stars_container]}>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                        </View>
                        <View style={[styles.horizontal_container]}>
                            <Text style={[styles.text_content]}>{formatMoney(bestSellerItem.giaGiam)}</Text>
                            <Text style={[styles.text_opacity, styles.small_marginHorizontal, styles.strikethrough_text]}>{formatMoney(bestSellerItem.giaGoc)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderPromoteItems = ({ item }: { item: CourseInterface }) => {
        let bestSellerItem = item
        let limitedName = bestSellerItem.tenKhoaHoc;
        if (limitedName.length > 30) {
            limitedName = limitedName.substring(0, 30) + '...';
        }

        if (item.deleted) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailCourseScreen", { khoaHocId: item.id, tenKhoaHoc: item.tenKhoaHoc })
            }} >
                <View style={[courseContentStyles.item_container, styles.medium_margin_vertical]}>
                    <Image style={[courseContentStyles.image_course_style]} source={bestSellerItem.thumnail != 'data' ? { uri: bestSellerItem.thumnail } : { uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png' }} />
                    <View style={[]}>
                        <View style={[courseContentStyles.inner_item]}>
                            <Text style={[styles.text_content]}>
                                {limitedName}
                            </Text>
                        </View>
                        <View style={[courseContentStyles.rating_stars_container]}>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                        </View>
                        <View style={[styles.horizontal_container]}>
                            <Text style={[styles.text_content]}>{formatMoney(bestSellerItem.giaGiam)}</Text>
                            <Text style={[styles.text_opacity, styles.small_marginHorizontal, styles.strikethrough_text]}>{formatMoney(bestSellerItem.giaGoc)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderNewItems = ({ item }: { item: CourseInterface }) => {
        let bestSellerItem = item
        let limitedName = bestSellerItem.tenKhoaHoc;
        if (limitedName.length > 30) {
            limitedName = limitedName.substring(0, 30) + '...';
        }

        if (item.deleted) {
            return null;
        }

        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("DetailCourseScreen", { khoaHocId: item.id, tenKhoaHoc: item.tenKhoaHoc })
            }} >
                <View style={[courseContentStyles.item_container, styles.medium_margin_vertical]}>
                    <Image style={[courseContentStyles.image_course_style]} source={bestSellerItem.thumnail != 'data' ? { uri: bestSellerItem.thumnail } : { uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png' }} />
                    <View style={[]}>
                        <View style={[courseContentStyles.inner_item]}>
                            <Text style={[styles.text_content]}>
                                {limitedName}
                            </Text>
                        </View>
                        <View style={[courseContentStyles.rating_stars_container]}>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                            <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                        </View>
                        <View style={[styles.horizontal_container]}>
                            <Text style={[styles.text_content]}>{formatMoney(bestSellerItem.giaGiam)}</Text>
                            <Text style={[styles.text_opacity, styles.small_marginHorizontal, styles.strikethrough_text]}>{formatMoney(bestSellerItem.giaGoc)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <View style={[styles.medium_margin_top]}>
                <View style={[styles.horizontal_container, styles.item_space_between]}>
                    <Text style={[styles.text_content, styles.text_bold]}>Top bán chạy</Text>
                    <View>
                        <TouchableOpacity style={[styles.horizontal_container, styles.item_space_between]}
                            onPress={() => {
                                navigation.navigate("CourseListScreen", { filtterType: KHOA_HOC_BAN_CHAY })
                            }} >
                            <Text style={[styles.text_content, styles.text_opacity]}>Xem thêm</Text>
                            <Svg style={[styles.icon_style, styles.text_opacity]} viewBox="0 0 320 512"><Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></Svg>
                        </TouchableOpacity>
                    </View>
                </View>

                <View >
                    <FlatList
                        data={bestSellerCourses.slice(0, 10)}
                        renderItem={bestSellerItem => renderTopsellerItems(bestSellerItem)}
                        horizontal
                    />
                </View>
            </View>

            <View style={[styles.medium_margin_top]}>
                <View style={[styles.horizontal_container, styles.item_space_between]}>
                    <Text style={[styles.text_content, styles.text_bold]}>Ưu đãi hôm nay</Text>
                    <View>
                        <TouchableOpacity style={[styles.horizontal_container, styles.item_space_between]}
                            onPress={() => {
                                navigation.navigate("CourseListScreen", { filtterType: KHOA_HOC_UU_DAI })
                            }} >
                            <Text style={[styles.text_content, styles.text_opacity]}>Xem thêm</Text>
                            <Svg style={[styles.icon_style, styles.text_opacity]} viewBox="0 0 320 512"><Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></Svg>
                        </TouchableOpacity>
                    </View>
                </View>

                <View >
                    <FlatList
                        data={promoteCourses.slice(0, 10)}
                        renderItem={promoteItem => renderPromoteItems(promoteItem)}
                        horizontal
                    />
                </View>
            </View>

            <View style={[styles.medium_margin_top]}>
                <View style={[styles.horizontal_container, styles.item_space_between]}>
                    <Text style={[styles.text_content, styles.text_bold]}>Mới ra mắt</Text>
                    <View>
                        <TouchableOpacity style={[styles.horizontal_container, styles.item_space_between]}
                            onPress={() => {
                                navigation.navigate("CourseListScreen", { filtterType: KHOA_HOC_MOI })
                            }} >
                            <Text style={[styles.text_content, styles.text_opacity]}>Xem thêm</Text>
                            <Svg style={[styles.icon_style, styles.text_opacity]} viewBox="0 0 320 512"><Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></Svg>
                        </TouchableOpacity>
                    </View>
                </View>

                <View >
                    <FlatList
                        data={newCourses.slice(0, 10)}
                        renderItem={newItem => renderNewItems(newItem)}
                        horizontal
                    />
                </View>
            </View>
        </View>
    )
}

export default CourseContents