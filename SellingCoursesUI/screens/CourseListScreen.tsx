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
    useEffect
} from 'react'
import { getAllKhoaHoc, getKhoaHocBanChay, getKhoaHocMoi, getKhoaHocUuDai, searchKhoaHoc } from "../services/course_services/courseServices"
import { CourseInterface } from "../services/interfaces/commoninterfaces"
import { courseContentStyles } from "../components/course_contents/CourseContentStyle"
import { styles } from "../styles/commonStyle"
import { formatMoney } from "../services/common"
import { Svg, Path } from "react-native-svg"
import Footer from "../components/footer/Footer"
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { CONG_NGHE_THONG_TIN, KHOA_HOC_BAN_CHAY, KHOA_HOC_MOI, KHOA_HOC_UU_DAI, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, SEARCH, THIET_KE, TIN_HOC } from "../ultils/courseCatergories"
import HeaderScreen from "../components/header/HeaderComponent"
import { TU_3_SAO, TU_4_SAO, _5_SAO } from "../ultils/filterConstants"

const CourseListScreen = () => {

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    const filterName = router.params.filtterType

    const keyword = router.params.keyword

    var sapXepKhoaHocParam = router.params.sapXepKhoaHoc

    var sapXepKhoaHocTheoDiemDanhGiaParam = router.params.sapXepKhoaHocTheoDanhGia

    const [courses, setCourses] = useState<CourseInterface[]>([])

    if (sapXepKhoaHocParam == undefined) {
        sapXepKhoaHocParam = ""
    }
    if (sapXepKhoaHocTheoDiemDanhGiaParam == undefined) {
        sapXepKhoaHocTheoDiemDanhGiaParam = 0
    }

    if (sapXepKhoaHocTheoDiemDanhGiaParam != null || sapXepKhoaHocTheoDiemDanhGiaParam != undefined) {
        if (sapXepKhoaHocTheoDiemDanhGiaParam == TU_3_SAO) {
            sapXepKhoaHocTheoDiemDanhGiaParam = 3
        }
        if (sapXepKhoaHocTheoDiemDanhGiaParam == TU_4_SAO) {
            sapXepKhoaHocTheoDiemDanhGiaParam = 4
        }
        if (sapXepKhoaHocTheoDiemDanhGiaParam == _5_SAO) {
            sapXepKhoaHocTheoDiemDanhGiaParam = 5
        }
    }

    const getCourses = async () => {
        try {
            if (filterName == KHOA_HOC_BAN_CHAY) {
                const response = await getKhoaHocBanChay()
                const { data } = response
                setCourses(data)
            }
            if (filterName == KHOA_HOC_UU_DAI) {
                const response = await getKhoaHocUuDai()
                const { data } = response
                setCourses(data)
            }
            if (filterName == KHOA_HOC_MOI) {
                const response = await getKhoaHocMoi()
                const { data } = response
                setCourses(data)
            }
            if (filterName == NGOAI_NGU) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, NGOAI_NGU, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if (filterName == MARKETING) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, MARKETING, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if (filterName == TIN_HOC) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, TIN_HOC, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if (filterName == THIET_KE) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, THIET_KE, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if (filterName == CONG_NGHE_THONG_TIN) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, CONG_NGHE_THONG_TIN, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if (filterName == PHAT_TRIEN_BAN_THAN) {
                const page = 1
                const pageSize = 10
                const response = await getAllKhoaHoc(sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam, PHAT_TRIEN_BAN_THAN, page, pageSize)
                const { data } = response
                setCourses(data)
            }
            if(filterName == SEARCH)
            {
                const response = await searchKhoaHoc(keyword);
                setCourses(response.data.data.items);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getCourses()
    }, [sapXepKhoaHocParam, sapXepKhoaHocTheoDiemDanhGiaParam])

    const renderTopsellerItems = ({ item }: { item: CourseInterface }) => {
        let courseItem = item
        let limitedName = courseItem.tenKhoaHoc
        if (limitedName.length > 30) {
            limitedName = limitedName.substring(0, 30) + '...';
        }
        
        return (
            <View style={[styles.horizontal_container, styles.item_space_between]}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("DetailCourseScreen", { khoaHocId: item.id, tenKhoaHoc: item.tenKhoaHoc })
                }} >
                    <View style={[courseContentStyles.item_container, styles.medium_margin_vertical]}>
                        <Image style={[courseContentStyles.image_course_style]} source={courseItem?.thumnail != 'data' ? {uri: courseItem?.thumnail} :{uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png'}} />
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
                                <Text style={[styles.text_content]}>{formatMoney(courseItem.giaGiam)}₫</Text>
                                <Text style={[styles.text_opacity, styles.small_marginHorizontal, styles.strikethrough_text]}>{formatMoney(courseItem.giaGoc)}₫</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <HeaderScreen />
            <View style={[styles.secondary_container]}>
                <FlatList
                    data={courses}
                    numColumns={2}
                    renderItem={(itemcourse) => renderTopsellerItems(itemcourse)}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
            <Footer />
        </SafeAreaView>
    )
}

export default CourseListScreen