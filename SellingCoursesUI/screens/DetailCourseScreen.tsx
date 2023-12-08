import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Switch, Animated, SafeAreaView } from 'react-native';
import { bestSallingCourses } from '../services/course_services/course_fake_data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { getKhoaHocById, updateKhoaHocYeuThich } from '../services/course_services/courseServices';
import { CourseInterface, UserInfoInterface } from '../services/interfaces/commoninterfaces';
import { formatMoney, getUserEmailFromToken } from '../services/common';
import { styles } from '../styles/commonStyle';
import HeaderShoppingCart from '../components/header/HeaderShoppingCart';
import { createGioHang } from '../services/CartServices/CartServices';
import { XAC_NHAN_THONG_TIN } from '../ultils/courseCatergories';
import { getAccessToken, getCurrentUser, getUserByEmail } from '../services/authentication/loginRegesterServices';
import { Path, Svg } from 'react-native-svg';

const DetailCourseScreen = () => {

    const [isXuSalesEnabled, setIsXuSalesEnabled] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const [course, setCourse] = useState<CourseInterface>()

    const [userEmail, setUserEmail] = useState<string>()

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    var khoaHocId = router.params.khoaHocId

    const toggleFavorite = async () => {
        try {
            setIsFavorite(!isFavorite)
            // Gọi hàm cập nhật yêu thích và truyền tham số 'khoaHocId' và trạng thái mới 'isFavorite'
            await updateKhoaHocYeuThich(khoaHocId, !isFavorite);
            // Sau khi cập nhật thành công, thay đổi trạng thái ở màn hình
        } catch (err) {
            console.log(err);
        }
    };
    const toggleXuSales = () => {
        setIsXuSalesEnabled(!isXuSalesEnabled);
    };
    const scrollY = useRef(new Animated.Value(0)).current;

    const footerTranslateY = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [150, 0],
        extrapolate: 'clamp',
    });

    const getCourseData = async () => {
        try {
            const response = await getKhoaHocById(khoaHocId)
            const { data } = response
            setCourse(data)
            if (data.yeuThich) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addCourseToCart = async () => {
        try {
            const response = await createGioHang(khoaHocId)
            if(response.data === true)
            {
                alert("Đã thêm vào giỏ hàng")
            }
            else{
                alert("Sản phẩm đã có trong giỏ hàng")
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getUserEmail = async () => {
        var token = await getAccessToken()
        var email = getUserEmailFromToken(token)
        setUserEmail(email)
    }

    useEffect(() => {
        getCourseData()
    }, [khoaHocId])

    useEffect(() => {
        getUserEmail()
    }, [])

    return (
        <SafeAreaView style={[styles.container]} >
            <HeaderShoppingCart />
            <View style={courseDetailStyles.header}>
                <Image style={[courseDetailStyles.imagetest]} source={course?.thumnail != 'data' ? { uri: course?.thumnail } : { uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png' }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={courseDetailStyles.content} onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
                scrollEventThrottle={16}>
                <View style={courseDetailStyles.intro}>
                    <View style={courseDetailStyles.costinput}>
                        <Text style={courseDetailStyles.one}>{formatMoney(course?.giaGiam)}</Text>
                        <Text style={courseDetailStyles.oneone}>{formatMoney(course?.giaGoc)}</Text>
                    </View>
                    <View style={courseDetailStyles.oneoneone}>
                        <Text style={{ color: 'white' }}>-50%</Text>
                    </View>
                    <TouchableOpacity style={courseDetailStyles.tym} onPress={toggleFavorite}>
                        <Icon
                            name={isFavorite ? 'heart' : 'heart-o'} // Tên biểu tượng trái tim hoặc trái tim trống
                            size={24}
                            color={isFavorite ? 'red' : 'black'} // Màu đỏ nếu đã nhấn, màu đen nếu chưa
                        />
                    </TouchableOpacity>
                </View>
                <View style={courseDetailStyles.super}>
                    <Icon name="tachometer" color="#217334" size={15} style={courseDetailStyles.icon} />
                    <Text>Thời gian ưu đãi còn 3 ngày</Text>
                </View>
                <TouchableOpacity style={courseDetailStyles.button}
                    onPress={() => {
                        navigation.navigate("ComfirmInFoScreen", {
                            filtterType: XAC_NHAN_THONG_TIN,
                            userEmail: userEmail,
                            courseId: khoaHocId,
                            totalDiscountPrice: course?.giaGiam
                        })
                    }}
                >
                    <Text style={courseDetailStyles.textinput}>Đặt mua khóa học</Text>
                </TouchableOpacity>
                <TouchableOpacity style={courseDetailStyles.button2} onPress={addCourseToCart}>
                    <Text style={courseDetailStyles.textinput}> Thêm vào giỏ hàng </Text>
                </TouchableOpacity>
                <Text style={{ opacity: 0.5, fontSize: 12, textAlign: 'center', paddingBottom: 10 }} >Hoàn tiền trong vòng 10 ngày nếu như không hài lòng</Text>
                <View style={courseDetailStyles.dayu}>
                    <Icon name="th-list" color="#0d0002" size={20} style={courseDetailStyles.icon2} />
                    <Text>Giáo trình 120 quyển</Text>
                </View>
                <View style={courseDetailStyles.dayu}>
                    <Icon name="check-square-o" color="#0d0002" size={20} style={courseDetailStyles.icon2} />
                    <Text>Nhận chứng chỉ hoàn thành khóa học</Text>
                </View>
                <View style={courseDetailStyles.dayu}>
                    <Icon name="upload" color="#0d0002" size={20} style={courseDetailStyles.icon2} />
                    <Text>Sỡ hữu trọn đời</Text>
                </View>
                <View style={courseDetailStyles.dayu}>
                    <Icon name="check-square-o" color="#0d0002" size={20} style={courseDetailStyles.icon2} />
                    <Text>Học mọi lúc, mọi nơi</Text>
                </View>
                <View style={courseDetailStyles.textview}>
                    <Text style={courseDetailStyles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={courseDetailStyles.line} />
                    <View>
                    {course?.noiDung?.split('. ')?.map((item: any, index: any) => (
                            <View key={index} style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                            <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                                <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </Svg>
                            <Text style={{paddingHorizontal: 15}}>{item}</Text>
                            </View>
                        ))}
                    </View>
                    
                </View>
                <View style={courseDetailStyles.textview}>
                    <Text style={courseDetailStyles.text}>Giới thiệu khóa học</Text>
                    <View style={courseDetailStyles.line} />
                    {course?.gioiThieu?.split('. ')?.map((item: any, index: any) => (
                            <View key={index} style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                            <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                                <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </Svg>
                            <Text style={{paddingHorizontal: 15}}>{item}</Text>
                            </View>
                        ))}
                </View>
                <View style={courseDetailStyles.textview}>
                    <Text style={courseDetailStyles.text}>Thông tin giảng viên</Text>
                    <View style={courseDetailStyles.line} />
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                        <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                            <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </Svg>
                        <Text style={{paddingHorizontal: 15}}>Họ & tên GV: <Text style={{fontWeight: '600'}}>{course?.createBy}</Text></Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                        <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                            <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </Svg>
                        <Text style={{paddingHorizontal: 15}}>SDT GV: <Text style={{fontWeight: '600'}}>0988089418</Text></Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                        <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                            <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                        </Svg>
                        <Text style={{paddingHorizontal: 15}}>Email hỗ trợ: <Text style={{fontWeight: '600'}}>uniedu@gmail.com</Text></Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
};
const courseDetailStyles = StyleSheet.create({
    namekh: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    container: {
        flex: 1
    },
    header: {
        height: 200,
        backgroundColor: '#48d0fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 15
    },
    costinput: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    one: {
        fontSize: 28,
        color: 'red',
        fontWeight: 'bold'
    },
    oneone: {
        fontSize: 14,
        color: '#0d8abf',
        paddingLeft: 15,
        paddingTop: 7,
        textDecorationLine: 'line-through'
    },
    oneoneone: {
        backgroundColor: 'red',
        width: 50,
        height: 27,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 90,
        // marginTop: 5
    },
    intro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tym: {
        paddingTop: 0
    },
    super: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 10
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#ff1c1c',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    button2: {
        marginBottom: 10,
        backgroundColor: '#4978e6',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textinput: {
        fontSize: 20,
        color: 'white'
    },
    dayu: {
        flexDirection: 'row',
        marginVertical: 5
    },
    icon2: {
        marginRight: 10,

    },
    textview: {
        paddingTop: 20
    },
    text: {
        marginRight: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    line: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, // Đẩy thanh footer ra ngoài màn hình ban đầu
        backgroundColor: '#d3ddf5',
        height: 50,
        justifyContent: 'center',

    },
    bot: {
        fontSize: 20,
        color: '#e4e7f0',
    },
    funal: {
        flexDirection: 'row',
        paddingHorizontal: 25
    },
    inter: {
        width: 180,
        height: 30,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    imagetest: {
        width: '100%',
        height: 200
    }
})

export default DetailCourseScreen

