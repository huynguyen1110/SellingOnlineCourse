import {
    View,
    SafeAreaView,
    FlatList,
    Text,
    Image,
    TouchableOpacity, 
    ScrollView, 
    Animated
} from 'react-native'
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import HeaderScreen from '../components/header/HeaderComponent'
import { styles } from '../styles/commonStyle'
import {
    useState,
    useEffect
} from 'react'
import { CourseInterface } from '../services/interfaces/commoninterfaces'
import { getKhoaHocTrongGioHang } from '../services/course_services/courseServices'
import { formatMoney } from '../services/common'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { deleteGioHangById, getAllGioHang } from '../services/CartServices/CartServices'
import { buttonStyles } from '../components/ButtonStyles'
import { XAC_NHAN_THONG_TIN } from '../ultils/courseCatergories'
import Swipeout from 'react-native-swipeout';

const CartScreen = () => {

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    const [courses, setCourses] = useState<CourseInterface[]>([])

    const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>()

    const [totalPrice, setTotalPrice] = useState<number>()

    const userEmailAddress = router.params.userEmail

    const getCourses = async () => {
        try {
            const response = await getAllGioHang();
            const { data } = response
            setCourses(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteCartById = async (id: number) => {
        try {
            await deleteGioHangById(id)
        } catch (err) {
            console.log(err)
        }
    }

    const calculateTotalDiscountPrice = (courses: CourseInterface[]) => {
        if(courses.length <= 0)
        {
            setTotalDiscountPrice(0)
        }
        var total = 0
        courses.forEach(x =>{
            total = total+ x.giaGiam 
        })
        setTotalDiscountPrice(total)
    }

    const calculateTotalPrice = (courses: CourseInterface[]) => {
        if(courses.length <= 0)
        {
            setTotalDiscountPrice(0)
        }
        var total = 0
        courses.forEach(x =>{
            total = total+ x.giaGoc 
        })
        setTotalPrice(total)
    }

    const delteButton = async(index: number) => {
        await deleteCartById(courses[index].id)
        var result = courses.filter((data: any) => data.id !== courses[index].id)
        setCourses(result)
        calculateTotalDiscountPrice(courses)
        calculateTotalPrice(courses)
    }
    
    const [swipeoutBtns, setSwipeoutBtns] = useState<any>([]);

    const handleSwipeoutOpen = (index: any) => {
        const newSwipeoutBtns = [...swipeoutBtns];
        newSwipeoutBtns[index] = [
        {
            text: 'Xóa',
            backgroundColor: 'red',
            onPress: () => {
                delteButton(index)
            },
        },
        ];
        setSwipeoutBtns(newSwipeoutBtns);
    };

    useEffect(() => {
        getCourses()
        calculateTotalPrice(courses)
        calculateTotalDiscountPrice(courses)
    }, [courses])

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#fff'}]}>
            <HeaderScreen />
            <ScrollView  showsVerticalScrollIndicator={false}>
                {courses?.map((item, index) => ( 
                    <View key={index} style={{ paddingVertical: 15, paddingHorizontal: 10, borderBottomWidth: 1, borderColor: 'gray', display: 'flex', flexDirection: 'row' }}>
                        <View style={{width: '92%', display: 'flex', flexDirection: 'row'}}>
                            <Image style={{ borderRadius: 10, borderColor: 'gray', borderWidth: 3, width: 150, height: 100 }} source={{ uri: item?.thumnail }} />
                            <View style={{ marginLeft: 7 }}>
                                <Text style={{ fontWeight: '700', color: '#365DA4', fontSize: 18 }}>{item?.tenKhoaHoc}</Text>
                                <Text style={{ color: 'gray', marginTop: 5, fontSize: 13, fontWeight: '600' }}>Số lượng : 1</Text>
                                <Text style={{ color: 'gray', marginTop: 5, fontSize: 13, fontWeight: '600' }}>Đơn giá: {formatMoney(item.giaGiam)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.horizontal_container, {alignItems: 'flex-end'}]}
                                onPress={() => delteButton(index)}
                            >
                                <View>
                                    <FeatherIcon size={25} name='trash-2' />
                                </View>
                        </TouchableOpacity>
                    </View>
                    
                ))}
            </ScrollView>
            <View style={{marginBottom: 10}}>
                <View style={[styles.horizontal_container, styles.small_margin_vertical, styles.medium_marginHorizontal]}>
                    <Text style={[styles.text_content, {fontWeight: '600'}]}>Tổng tiền: </Text>
                    <Text style={[styles.text_content, styles.text_red, {fontWeight: '600'}]}>{formatMoney(totalDiscountPrice)}</Text>
                    {totalPrice > 0 ? <Text style={[styles.strikethrough_text, styles.medium_marginHorizontal]}>{formatMoney(totalPrice)}</Text>: <Text></Text>}
                </View>
                <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={[buttonStyles.paying_button, {backgroundColor: '#365da4'}]}
                            onPress={() => {
                                if(courses.length >0 )
                                {
                                    navigation.navigate("ComfirmInFoScreen", {
                                        filtterType: XAC_NHAN_THONG_TIN,
                                        userEmail: userEmailAddress,
                                        totalDiscountPrice: totalDiscountPrice,
                                        courseId: undefined
                                    })
                                }
                            }}
                        >

                            <Text style={[styles.text_content, {color:'#fff'}]}> <FeatherIcon style={{color:'#fff'}} name='shopping-bag' size={20} /> Đặt hàng</Text>
                        </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default CartScreen