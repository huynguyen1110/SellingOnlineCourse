import { FlatList, Platform, ScrollView, SectionList, TextInput } from "react-native"
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity, 
    KeyboardAvoidingView
} from "react-native"
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { CourseInterface, UserInfoInterface } from "../services/interfaces/commoninterfaces"
import { styles } from "../styles/commonStyle"
import { formatMoney } from "../services/common"
import HeaderScreen from "../components/header/HeaderComponent"
import { comFirmScreenStyles } from "../styles/comfirmScreenStyles"
import { useEffect, useRef, useState } from "react"
import { getUserByEmail } from "../services/authentication/loginRegesterServices"
import { getKhoaHocById, getKhoaHocTrongGioHang } from "../services/course_services/courseServices"
import { buttonStyles } from "../components/ButtonStyles"
import { THANH_TOAN } from "../ultils/courseCatergories"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { items } from "../ultils/pagingConstans"

const ComfirmInFoScreen = () => {

    const [userInfo, setUserInfo] = useState<UserInfoInterface>({
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        sdt: "",
        verify: false,
        idRole: 0,
        deleted: false,
        createAt: "",
        updateAt: "",
        yeuThich: false,
        gioiTInh: "",
        ngayThangNamSinh: ""
    })

    const [courses, setCourses] = useState<CourseInterface[]>([])

    const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>()

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    const userEmailAddress = router.params.userEmail

    const courseId = router.params.courseId

    const getUser = async () => {
        try {
            const response = await getUserByEmail(userEmailAddress)
            const { data } = response
            setUserInfo(data)
        } catch (err) {
            console.log(err)
        }
    }

    const getCourseById = async () => {
        try {
            if (courseId != undefined) {
                const response = await getKhoaHocById(courseId)
                const { data } = response
                if (data != undefined) {
                    let courseList = []
                    courseList.push(data)
                    setCourses(courseList)
                    calculateTotalDiscountPrice(courseList)
                } else {
                    return
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const calculateTotalDiscountPrice = (courses: any) => {
        if (!Array.isArray(courses) || courses.length === 0) {
            return 0;
        }

        const totalDiscountPrice: number = courses.reduce((total, course) => total + course.giaGiam, 0);
        setTotalDiscountPrice(totalDiscountPrice)
    }

    const getCourses = async () => {
        try {
            const response = await getKhoaHocTrongGioHang()
            const { data } = response
            setCourses(data)
            calculateTotalDiscountPrice(data)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getUser()
    }, [userEmailAddress])

    useEffect(() => {
        if (courseId == undefined) {
            getCourses()
        } else {
            getCourseById()
        }
    }, [courseId])

    const renderCourses = ({ item }: { item: CourseInterface }) => {
        return (
            <View style={[comFirmScreenStyles.course_list_container]} >
                <View style={[styles.horizontal_container]}>
                    <View>
                        <Image style={[styles.small_image]} source={require('../assets/images/course_images/9.jpg')} />
                    </View>
                    <View style={[styles.vertical_container, styles.item_center, styles.medium_marginHorizontal]}>
                        <Text style={[styles.text_content, styles.text_opacity]}>{item.tenKhoaHoc}</Text>
                        <Text>{item.createBy}</Text>
                        <View style={[styles.horizontal_container]}>
                            <Text style={[styles.text_content]}>{formatMoney(item.giaGiam)}</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.underline_border, styles.small_margin_vertical]}></View>
            </View>
        )
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <HeaderScreen />
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
            >
                {courses?.map((item: any, index: any) => (
                    <View key={index} style={{backgroundColor: '#fff', paddingVertical: 15,paddingHorizontal: 10, borderBottomWidth:1, borderColor: 'gray',display: 'flex', flexDirection: 'row'}}>
                        <Image style={{borderRadius: 10,borderColor: 'gray', borderWidth: 3,  width: 150, height: 100}} source={{ uri:item?.thumnail }} />
                        <View style={{marginLeft: 7}}>
                            <Text style={{fontWeight: '700', color:'#365DA4', fontSize: 18}}>{item?.tenKhoaHoc}</Text>
                            <Text style={{color: 'gray', marginTop: 5, fontSize: 13, fontWeight: '600'}}>Số lượng : 1</Text>
                            <Text style={{color: 'gray', marginTop: 5, fontSize: 13, fontWeight: '600'}}>Đơn giá: {formatMoney(item.giaGoc - item.giaGiam)}</Text>
                        </View>
                    </View>
                ))}
                <View style={{backgroundColor: '#fff', paddingTop: 15, width: '100%' }}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                        <View style={{width:'50%'}}>
                            <Text style={{color: '#365DA4', fontSize: 16, fontWeight: '700', marginLeft: 10, marginBottom: 6}}>Họ:</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center, { paddingHorizontal: 10}]}
                                value={userInfo?.firstName}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        firstName: value,
                                    })
                                }}
                            />
                        </View>
                        <View style={{width:'50%'}}>
                            <Text style={{color: '#365DA4', fontSize: 16, fontWeight: '700', marginLeft: 10, marginBottom: 6}}>Tên:</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center, { paddingHorizontal: 10}]}
                                value={userInfo?.lastName}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        lastName: value,
                                    })
                                }}
                            />
                        </View>
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 15}}>
                        <Text style={{color: '#365DA4', fontSize: 16, fontWeight: '700', marginBottom: 6}}>Email:</Text>
                        <TextInput style={[comFirmScreenStyles.text_input, styles.item_center, {width: '100%', paddingHorizontal: 10}]}
                                    value={userInfo?.email}
                                    onChangeText={value => {
                                        setUserInfo({
                                            ...userInfo,
                                            email: value,
                                        })
                                    }}
                                />
                    </View>
                    <View style={{marginHorizontal: 10, marginTop: 15}}>
                        <Text style={{color: '#365DA4', fontSize: 16, fontWeight: '700', marginBottom: 6}}>Số điện thoại:</Text>
                        <TextInput style={[comFirmScreenStyles.text_input, styles.item_center, {width: '100%', paddingHorizontal: 10}]}
                                    value={userInfo?.sdt}
                                    onChangeText={value => {
                                        setUserInfo({
                                            ...userInfo,
                                            sdt: value,
                                        })
                                    }}
                                />
                    </View>
                    <View style={{marginHorizontal: 10, marginVertical: 15}}>
                        <Text style={{color: '#365DA4', fontSize: 16, fontWeight: '700', marginBottom: 6}}>Ghi chú:</Text>
                        <TextInput style={[comFirmScreenStyles.text_input, styles.item_center, {width: '100%', height: 100,paddingHorizontal: 10}]}
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Ghi chú thanh toán"
                                />
                    </View>
                    <TouchableOpacity style={{marginHorizontal: 10, borderRadius: 3,paddingVertical: 15, backgroundColor: '#365DA4', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            navigation.navigate("PayingScreen", {
                                filtterType: THANH_TOAN,
                                userEmail: userEmailAddress,
                                coursesData: courses,
                                userInfo: userInfo, 
                                totalDiscountPrice: totalDiscountPrice
                            })
                        }}
                        >
                        <Text style={{color: '#fff'}}>Tiếp tục</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{marginHorizontal: 10, paddingVertical: 15, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            navigation.navigate("PayingScreen", {
                                filtterType: THANH_TOAN,
                                userEmail: userEmailAddress,
                                coursesData: courses,
                                userInfo: userInfo
                            })
                        }}
                        >
                        <Text style={{color: '#365Da4'}}>Quay lại</Text>
                    </TouchableOpacity> */}
                </View>
            </KeyboardAwareScrollView>
            {/* <FlatList
                ListHeaderComponent={
                    <ScrollView>
                        <View style={[comFirmScreenStyles.from_user_input_container, styles.small_margin_top]}>
                            <Text style={[styles.small_margin_vertical, styles.large_marginHorizontal, {fontWeight: '700', fontSize: 14}]}>Họ</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center]}
                                value={userInfo?.lastName}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        lastName: value,
                                    })
                                }}
                            />
                            <Text style={[styles.text_content, styles.small_margin_vertical, styles.large_marginHorizontal]}>Tên</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center]}
                                value={userInfo?.firstName}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        firstName: value,
                                    })
                                }}
                            />
                            <Text style={[styles.text_content, styles.large_marginHorizontal, styles.small_margin_vertical,]}>Email</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center]}
                                value={userInfo?.email}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        email: value,
                                    })
                                }}
                            />
                            <Text style={[styles.text_content, styles.large_marginHorizontal, styles.small_margin_vertical,]}>Số điện thoại</Text>
                            <TextInput style={[comFirmScreenStyles.text_input, styles.item_center]}
                                value={userInfo?.sdt}
                                onChangeText={value => {
                                    setUserInfo({
                                        ...userInfo,
                                        sdt: value,
                                    })
                                }}
                            />
                        </View>
                        <View>
                        </View>
                    </ScrollView>
                }
                data={courses}
                renderItem={couseItem => renderCourses(couseItem)}
                ListFooterComponent={
                    <View >
                        <View style={[styles.medium_margin_vertical, styles.horizontal_container, styles.item_space_between]}>
                            <Text>Tổng số tiền: </Text>
                            <Text>{formatMoney(totalDiscountPrice)}</Text>
                        </View>
                        <TouchableOpacity style={[buttonStyles.large_red_button]}
                        onPress={() => {
                            navigation.navigate("PayingScreen", {
                                filtterType: THANH_TOAN,
                                userEmail: userEmailAddress,
                                coursesData: courses,
                                userInfo: userInfo
                            })
                        }}
                        >
                            <Text>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                }
            /> */}

        </SafeAreaView>
    )
}

export default ComfirmInFoScreen