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
import { CourseInterface } from '../../services/interfaces/commoninterfaces';
import { delteKhoaHocById, getKhoaHocById, updateKhoaById } from '../../services/course_services/courseServices';
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

const UpdateCourseScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const courseId = router.params.courseId;
    const userEmail: any = router.params.userEmail; //object type

    const [wantToDelete, setWantToDelete] = useState<boolean>(false);

    const [visible, setVisible] = useState<any>(false);
    const hideDialog = () => setVisible(false);
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [isComfirm, setIsComfirm] = useState<boolean>(false)

    const [course, setCourse] = useState<CourseInterface>({
        id: 0,
        idGioHang: 0,
        tenKhoaHoc: "",
        giaGoc: 0,
        giaGiam: 0,
        noiDung: "",
        createAt: "",
        updateAt: "",
        createBy: "",
        deleted: false,
        gioiThieu: "",
        theLoai: "",
        thumnail: ""
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
            const response = await getKhoaHocById(courseId);
            const { data } = response;
            const selectedFilterIndex = filterValues.findIndex(item => item === data.theLoai);
            setFilterListIndex(selectedFilterIndex);
            setCourse(data);
        } catch (err) {
            console.log("Lỗi ở hàm lấy khóa học màn UpdateCourseScreen ", err);
        }
    }

    useEffect(() => {
        getCourseData()
    }, [courseId])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [10, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const uploadImage = async (selectedImage: string) => {
        try {
            const response = await uploadPayingImage(selectedImage);
            const { data } = response;
            if (data && data.data) {
                setImageUrl(data.data);
            } else {
                console.error("Không nhận được dữ liệu hợp lệ từ yêu cầu tải ảnh lên.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (image) {
            uploadImage(image)
        }
    }, [image])


    useEffect(() => {
        setCourse({
            ...course,
            thumnail: imageUrl
        })
    }, [imageUrl])

    const updateCourse = async () => {
        try {
            console.log(imageUrl)

            const response = await updateKhoaById(course, courseId);
            console.log(course + "couseId" + courseId)
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
                tenKhoaHoc: "",
                giaGoc: 0,
                giaGiam: 0,
                thumnail: "",
                noiDung: "",
                gioiThieu: "",
                createAt: "",
                updateAt: "",
                createBy: "",
                theLoai: ""
            });
            navigation.navigate('AdminCourseScreenManagement', { userEmail: userEmail });
        }
    }, [isComfirm]);

    const handleComfirmBtn = () => {
        setIsComfirm(true);
        hideDialog();
        if (alertTitle == "Bạn có chắc chắn muốn xóa khóa học này"){
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
            const response = await delteKhoaHocById(courseId);
            const { data } = response;
            console.log(data)
            alert("Xoá thành công");
            navigation.goBack();
        } catch (err) {
            console.log("Lỗi ở hàm delete khóa học theo id ở màn UpdateCourseScreen", err);
        }
    }

    // handle delete btn
    const handleDelelteBtn = () => {
        setIsComfirm(false);
        setAlertTitle("Bạn có chắc chắn muốn xóa khóa học này");
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
                        <Text style={[styles.header_text_2]}>Chi tiết khóa học</Text>
                        <View style={[styles.medium_margin_top]}>
                            <View >
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Tên khóa học</Text>
                                <TextInput style={[styles.full_with_text_input]} value={course.tenKhoaHoc}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            tenKhoaHoc: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giá gốc</Text>
                                <TextInput style={[styles.full_with_text_input]} keyboardType='numeric' value={formatMoney(course.giaGoc.toString())}
                                    onChangeText={value => {
                                        const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
                                        if (!isNaN(numericValue)) {
                                            setCourse({
                                                ...course,
                                                giaGoc: numericValue
                                            });
                                        } else {
                                            setCourse({
                                                ...course,
                                                giaGoc: 0
                                            });
                                        }
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giá giảm</Text>
                                <TextInput style={[styles.full_with_text_input]} value={formatMoney(course.giaGiam.toString())}
                                    keyboardType='numeric'
                                    onChangeText={value => {
                                        const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
                                        if (!isNaN(numericValue)) {
                                            setCourse({
                                                ...course,
                                                giaGiam: numericValue
                                            });
                                        } else {
                                            setCourse({
                                                ...course,
                                                giaGiam: 0
                                            });
                                        }
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
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giới thiệu</Text>
                                <TextInput numberOfLines={10} style={[styles.full_with_text_input]} value={course.gioiThieu}
                                    onChangeText={value => {
                                        setCourse({
                                            ...course,
                                            gioiThieu: value
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

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Thể loại</Text>
                                <SelectDropdown
                                    data={filterList}
                                    defaultValueByIndex={0}
                                    onSelect={(selectedItem, index) => {
                                        setFilterListIndex(index)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return filterList[filterListIndex]
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    buttonStyle={{ backgroundColor: 'white', width: "100%" }}
                                    buttonTextStyle={{ color: 'black' }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'black'} size={18} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={filterModalPopUpStyles.dropdownDropdownStyle}
                                    rowStyle={filterModalPopUpStyles.dropdown2RowStyle}
                                    rowTextStyle={filterModalPopUpStyles.dropdown2RowTxtStyle}
                                />
                            </View>

                            <View style={[styles.medium_margin_top]}>
                                <Button title='Danh sách bài học' onPress={() => {
                                    navigation.navigate("AdminAddLectionToCouseManag", {userEmail, courseId})
                                }}/>
                            </View>

                            <View style={[styles.medium_margin_vertical, styles.horizontal_container, styles.item_space_between]}>
                                <Text style={[styles.small_margin_vertical]}>Ảnh</Text>
                                <Button title='Chọn tệp' onPress={pickImage} />
                            </View>

                            <View>
                                {course.thumnail && image == null ? (
                                    <Image source={{ uri: course.thumnail }} style={{ width: "100%", height: 200, resizeMode: 'stretch' }} />
                                ) : (
                                    image && <Image source={{ uri: image }} style={{ width: "100%", height: 200, resizeMode: 'stretch' }} />
                                )}
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
                                <Button title='Xóa khóa học' onPress={handleDelelteBtn} />
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

export default UpdateCourseScreen