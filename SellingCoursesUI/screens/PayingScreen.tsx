import {
    SafeAreaView,
    View,
    Text,
    Modal,
    Alert,
    ActivityIndicator,
    ScrollView
} from "react-native"
import {
    useState,
    useEffect
} from 'react'
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import HeaderScreen from "../components/header/HeaderComponent"
import { styles } from "../styles/commonStyle"
import { Clipboard } from 'react-native'
// import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { payingScreenStyles } from "../styles/payingScreenStyles"
import { TouchableOpacity } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNewPayment, uploadPayingImage } from "../services/PayingSerivces/payingServices"
import { CourseInterface, PaymentInterface, UserInfoInterface } from "../services/interfaces/commoninterfaces"
import { deleteGioHangById } from "../services/CartServices/CartServices"
import { formatMoney } from "../services/common"
import { Path, Svg } from "react-native-svg"

const PayingScreen = () => {

    const router = useRoute<any>()

    const userEmailAddress = router.params.userEmail

    const courses = router.params.coursesData

    const totalDiscountPrice = router.params.totalDiscountPrice

    const userInfo: UserInfoInterface = router.params.userInfo

    const [copiedText, setCopiedText] = useState('')

    const [modalVisible, setModalVisible] = useState(false);

    const [contentPaying, setContentPaying] = useState<any>()

    const [image, setImage] = useState<any>(null);

    const [imageUrl, setImageUrl] = useState<any>()

    const [isLoading, setIsLoading] = useState(false)

    const [isPaid, setIsPaid] = useState(false)

    const [coursesName, setCoursesName] = useState<string>();

    const stk1 = "0368784251"

    const navigation = useNavigation<any>()

    function getRandomNumber() {
        const min: number = 1
        const max: number = 10000000
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleCopyToClipboard = (content: string) => {
        Clipboard.setString(content);
        fetchCopiedText()
    }

    const fetchCopiedText = async () => {
        try {
            const text = await Clipboard.getString();
            setCopiedText(text);
            alert('Đã sao chép vào bộ nhớ tạm');
        } catch (error) {
            console.error(error);
            alert('Lỗi Không thể sao chép văn bản.');
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [10, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    };

    const uploadImage = async (selectedImage: string) => {
        try {
            const response = await uploadPayingImage(selectedImage)
            const { data } = response
            if (data && data.data) {
                setImageUrl(data.data)
                setContentPaying(`${userEmailAddress} thanh toán đơn hàng ${getRandomNumber()}`)
            } else {
                console.error("Không nhận được dữ liệu hợp lệ từ yêu cầu tải ảnh lên.");
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const getCoursesName = async() => {
        var result = ""
        await courses.map((item: any, index: any) => {
            if(index == courses.length - 1)
            {
                result = result.concat(item.tenKhoaHoc)
            }
            else
            {
                result = result.concat(item.tenKhoaHoc + ", ")
            }
        })
        setCoursesName(result)
    }

    const updateHandleBtn = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xác nhận thông tin không?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await uploadImage(image);
                            await createPayments();
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setIsLoading(false);
                        }
                    },
                }
            ],
            { cancelable: false }
        )
    }

    const deleteCartById = async (idCart: number) => {
        try {
            await deleteGioHangById(idCart)
        } catch (err) {
            console.log("Lỗi xóa giỏ hàng ở màn PayingSceen", err)
        }
    }

    const delteAllCart = async () => {
        if (isPaid == true) {
            const promises = courses.map(async (course: CourseInterface) => {
                const response = await deleteCartById(course.idGioHang)
                return response;
            })
            const results: any = await Promise.all(promises)
            setIsPaid(false)
            navigation.navigate("HomeScreen")
            return
        }
        return
    }

    useEffect(() => {
        if (isPaid == true) {
            delteAllCart()
        }
        getCoursesName();
    }, [isPaid])

    const createPayments = async () => {
        const currentDateTime: any = new Date()
        const currentDateTimeString = currentDateTime.toISOString();
        const currentDateTimeSliced = currentDateTimeString.slice(0, -1);

        if (contentPaying != undefined && imageUrl != undefined) {
            try {
                const promises = courses.map(async (course: CourseInterface) => {
                    const paymentData: any = {
                        idUser: userInfo.id,
                        idKhoaHoc: course.id,
                        hoTen: userInfo.lastName + " " + userInfo.firstName,
                        noiDung: contentPaying,
                        anhChuyenKhoan: imageUrl,
                        tenKhoaHoc: course.tenKhoaHoc,
                        gia: course.giaGiam,
                        createAt: currentDateTimeSliced,
                        updateAt: currentDateTimeSliced,
                        createBy: userInfo.lastName + " " + userInfo.firstName,
                    }
                    const response = await createNewPayment(paymentData)
                    return response;
                })
                const results: any = await Promise.all(promises)

                alert("Xác nhận thành công")
                setIsPaid(true)
            } catch (err) {
                console.error(err)
                alert("Thất bại, xin vui lòng ấn xác nhận lại")
            }
        } else {
            alert("Xin vui lòng ấn xác nhận lại, hãy chắc chắn rằng bạn đã chọn ảnh chuyển khoản")
        }

    }

    return (
        <SafeAreaView style={[styles.container]}>
            <HeaderScreen />
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>) : (<View></View>)}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal:10, marginTop: 8}}>
                    <Text style={{fontSize: 15}}>Khóa học: <Text style={{fontWeight: '600'}}>{coursesName}</Text></Text>
                    <Text style={{fontSize: 15, marginTop: 8}}>Số tiền phải thanh toán: <Text style={{fontWeight: '600'}}>{formatMoney(totalDiscountPrice)}</Text></Text>
                    <View style={{display:'flex', flexDirection: 'row', marginTop: 8}}>
                        <Svg fill={'#365DA4'} height="16" width="16" viewBox="0 0 512 512">
                            <Path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </Svg>
                        <Text style={{color: 'gray', marginLeft: 5}}>Thời gian xử lý thanh toán có thể mất 1 ngày làm việc. Mọi thắc mắc của quý khách hàng vui lòng liên hệ: 0988089418</Text>
                    </View>
                </View>
                <View style={{borderBottomWidth: 1, marginTop: 15}}></View>
                <View style={{paddingHorizontal:10}}>
                    <Text style={[styles.text_bold_strong, styles.header_text_3, styles.medium_margin_vertical]}>Chuyển khoản bằng QR</Text>
                    <View style={[]}>
                        <View>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image style={[payingScreenStyles.qr_image]} source={require('../assets/images/paying/qrcode.jpg')} />
                            </TouchableOpacity>
                            
                            <Text style={[styles.small_text_content, styles.text_bold, {marginTop: 15}]}>Bước 1: Mở app ngân hàng quyét QR code</Text>
                            <Text style={[styles.small_text_content, styles.small_margin_vertical, styles.text_bold]}>Bước 2: Nhập nội dung chuyển khoản</Text>
                            <Text style={[styles.small_text_content, styles.text_bold]}>Bước 3: Thực hiện thanh toán</Text>
                           
                        </View>
                    </View>

                    <Text style={[styles.text_bold_strong, styles.header_text_3, styles.medium_margin_vertical]}>Chuyển khoản qua số tài khoản</Text>
                    <View style={[{ width: "90%" }, styles.medium_marginHorizontal]}>
                        <View>
                            <View>
                                <View style={[styles.horizontal_container]}>
                                    <Text style={[styles.small_text_content, styles.text_bold]}>Số tài khoản:
                                        <Text style={[styles.small_text_content, styles.text_bold, {color: '#365DA4'}]}>  {stk1}</Text>
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCopyToClipboard(stk1)
                                        }}
                                    >
                                        <MaterialCommunityIcons name="content-copy" size={18} />
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.small_text_content, styles.text_bold, styles.small_margin_vertical]}>Tên tài khoản: Công ty Cổ phần đào tạo trực tuyến HHK</Text>
                            </View>
                            <View style={{display: 'flex', flexDirection: 'row'}}>
                                <Text style={[styles.small_text_content, styles.text_bold]}>Nội dung chuyển khoản:</Text>
                                <View style={[styles.horizontal_container]}>
                                    <Text style={[styles.small_text_content, styles.text_bold, {color: '#365DA4'}]}>{getRandomNumber()}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleCopyToClipboard(contentPaying)
                                        }}
                                    >
                                        <MaterialCommunityIcons name="content-copy" size={18} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.horizontal_container, {marginTop: 10}]}>
                            <Text style={[styles.small_text_content, styles.text_bold]}>Ảnh chuyển khoản <Text style={[styles.text_orage]}>(*)</Text> : </Text>
                            <TouchableOpacity style={payingScreenStyles.file_choosing_btn} onPress={pickImage} >
                                <Text>Chọn tệp</Text>
                            </TouchableOpacity>
                        </View>
                        {image && <Image source={{ uri: image }} style={[{ width: 200, height: 200 }, styles.small_margin_vertical]} />}



                    </View>
                    <TouchableOpacity style={[payingScreenStyles.comfirm_btn, styles.medium_margin_vertical, ]} onPress={updateHandleBtn}>
                        <Text style={{color: '#fff'}}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={[styles.horizontal_container, styles.item_space_between]}>
                    <View>
                    </View>
                    <TouchableOpacity style={[payingScreenStyles.close_buton]} onPress={() => setModalVisible(false)}>
                        <IconAntDesign name='close' size={30} />
                    </TouchableOpacity>
                </View>

                <View style={[payingScreenStyles.modal_container]}>
                    <Image style={{ width: 300, height: 300, resizeMode: 'stretch' }} source={require('../assets/images/paying/qrcode.jpg')} />
                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default PayingScreen