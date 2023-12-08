import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import {
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import {
    useState,
    useEffect
} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../../styles/commonStyle';
import AdminHeader from '../../components/header/AdminHeader';
import { LessonInterface } from '../../services/interfaces/commoninterfaces';
import { delteKhoaHocById, getKhoaHocById, updateKhoaById } from '../../services/course_services/courseServices';
import { updateBaiById,getBaiHocById,deleteBaiHoc } from '../../services/lesson_services/lessonServices';
import {
    Dialog,
    Portal,
    Provider,
    TextInput,
    Button as Paper
} from 'react-native-paper';
import {
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import { CONG_NGHE_THONG_TIN, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, THIET_KE, TIN_HOC } from '../../ultils/courseCatergories';
import { filterModalPopUpStyles } from '../../components/ModalPopUp/FilterModalStyles';
import { uploadPayingImage } from '../../services/PayingSerivces/payingServices';
import { formatMoney } from '../../services/common';


const UpdateLessonScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const courseId = router.params.courseId;
    const userEmail: any = router.params.userEmail; //object type

    const [wantToDelete, setWantToDelete] = useState<boolean>(false);

    const [visible, setVisible] = useState<any>(false);
    const hideDialog = () => setVisible(false);
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [isComfirm, setIsComfirm] = useState<boolean>(false)

    const [course, setCourse] = useState<LessonInterface>({
        id: "",
        tenBaiHoc: "",
        moTa : "",
        noiDung: "",
        createAt: "",
        createBy: "",
        deleted: false,
    });

    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string>("");

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [filterListIndex, setFilterListIndex] = useState<number>(0);
    // filter list value
    const [filterValue, setFilterValue] = useState<string>("")

    const filterList = ["Ngoại ngữ", "Marketing", "Tin học văn phòng", "Thiết kế", "Công nghệ thông tin", "Phát triển bản thân"];
    const filterValues = [NGOAI_NGU, MARKETING, TIN_HOC, THIET_KE, CONG_NGHE_THONG_TIN, PHAT_TRIEN_BAN_THAN];

    const getCourseData = async () => {
        try {
            const response = await getBaiHocById(courseId);
            const { data } = response;
            const selectedFilterIndex = filterValues.findIndex(item => item === data.theLoai);
            setFilterListIndex(selectedFilterIndex);
            setCourse(data);
        } catch (err) {
            console.log("Lỗi ở hàm lấy bài học  ", err);
        }
    }

    useEffect(() => {
        getCourseData()
    }, [courseId])



    const updateCourse = async () => {
        try {
            console.log(imageUrl)

            const response = await updateBaiById(course, courseId);
            const { data } = response;
            console.log(data);
            alert("cập nhật thành công")
        } catch (err) {
            console.log("Lỗi ở hàm updateCourse màn UpdateCourseScreen " + err);
        }
    }

    const handleResetButton = () => {
        setIsComfirm(false);
        setAlertTitle("Bạn có muốn hủy bỏ thông tin đang nhập");
        setVisible(true);
    };

    useEffect(() => {
        if (isComfirm) {
            setFilterListIndex(0);
            setImage("");
            setCourse({
                ...course,
                tenBaiHoc: "",
                noiDung: "",
                moTa:"",
                createAt: "",
                createBy: "",
                
            });
            navigation.navigate('AdminManaScreen', { userEmail: userEmail });
        }
    }, [isComfirm]);

    const handleComfirmBtn = () => {
        setIsComfirm(true);
        hideDialog();
        if (alertTitle == "Bạn có chắc chắn muốn xóa bài học này"){
            setWantToDelete(true);
        }
    }

    const handleCancelBtn = () => {
        setIsComfirm(false);
        hideDialog();
    }

    const handleUpdateBtn = () => {
        setIsComfirm(false);
        setAlertTitle("Bạn có muốn cập nhật thông tin đã sửa");
        setVisible(true);
        setIsUpdate(true);
    }

    useEffect(() => {
        if (isComfirm && isUpdate) {
            updateCourse();
            setIsUpdate(false)
        }
    }, [isComfirm]);

    const deleteCourseById = async () => {
        try {
            const response = await deleteBaiHoc(courseId);
            const { data } = response;
            console.log(data)
            alert("Xoá thành công");
            navigation.goBack();
        } catch (err) {
            console.log("Lỗi ở hàm delete ", err);
        }
    }

    // handle delete btn
    const handleDelelteBtn = () => {
        setIsComfirm(false);
        setAlertTitle("Bạn có chắc chắn muốn xóa bài học này");
        setVisible(true);
    }

    useEffect(() => {
        if (isComfirm && wantToDelete) {
            deleteCourseById();
        }
    }, [isComfirm, wantToDelete]);

    // handle delete btn

    return (
        <Provider>
            <SafeAreaView style={[styles.container]}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AdminHeader userEmail={userEmail.userEmail} />
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.secondary_container]}>
                        <Text style={[styles.header_text_2]}>Chi tiết bài học</Text>
                        <View style={[styles.medium_margin_top]}>
                            <View >
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Tên bài học</Text>
                                <TextInput style={[styles.full_with_text_input]} value={course.tenBaiHoc}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            tenBaiHoc: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Nội dung</Text>
                                <TextInput style={[styles.full_with_text_input]} value={course.noiDung}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            noiDung: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Mô tả</Text>
                                <TextInput numberOfLines={10} style={[styles.full_with_text_input]} value={course.moTa}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            moTa: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Người tạo</Text>
                                <TextInput style={[styles.full_with_text_input]} value={userEmail.userEmail} editable={false}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            createBy: value
                                        })
                                    }}
                                />
                            </View>

                            <View style={[styles.small_margin_vertical, styles.horizontal_container, styles.item_space_between]}>
                                <View style={{ width: 100 }}>
                                    <Button onPress={handleUpdateBtn} title='Cập nhật' />
                                </View>
                                <View style={{ width: 100 }}>
                                    <Button title='Hủy bỏ' onPress={handleResetButton} />
                                </View>
                            </View>

                            <View style={[styles.small_margin_vertical]}>
                                <Button title='Xóa bài học' onPress={handleDelelteBtn} />
                            </View>
                        </View>

                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.Icon icon="alert" />
                                <Dialog.Title >{alertTitle}</Dialog.Title>
                                <Dialog.Content>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Paper onPress={handleCancelBtn}>Cancel</Paper>
                                    <Paper onPress={handleComfirmBtn}>Ok</Paper>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>

                    </ScrollView>
                </GestureHandlerRootView>
            </SafeAreaView>
        </Provider>
    )
}

export default UpdateLessonScreen