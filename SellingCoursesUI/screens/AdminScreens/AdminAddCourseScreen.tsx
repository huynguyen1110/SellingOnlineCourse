import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    SafeAreaView,
    View,
    Button,
    Image
} from "react-native";
import {
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'
import AdminHeader from "../../components/header/AdminHeader"
import { styles } from "../../styles/commonStyle";
import { ScrollView } from "react-native-gesture-handler";
import { Dialog, Portal, Provider, TextInput, Text, Button as Paper, ActivityIndicator } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { filterModalPopUpStyles } from '../../components/ModalPopUp/FilterModalStyles';
import { CONG_NGHE_THONG_TIN, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, THIET_KE, TIN_HOC } from '../../ultils/courseCatergories';
import { uploadPayingImage } from '../../services/PayingSerivces/payingServices';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { payingScreenStyles } from '../../styles/payingScreenStyles';
import { CourseInterface } from '../../services/interfaces/commoninterfaces';
import { createKhoaHoc } from '../../services/course_services/courseServices';
import { formatMoney } from '../../services/common';

const AdminAddCourseScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const [visible, setVisible] = useState<any>(false);
    const hideDialog = () => setVisible(false);
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [isComfirm, setIsComfirm] = useState<boolean>(false)

    const userEmail = router.params.userEmail;

    const [image, setImage] = useState<any>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const [isCreate, setIsCreate] = useState<boolean>(false);

    const [filterListIndex, setFilterListIndex] = useState<number>(0);
    // filter list value
    const [filterValue, setFilterValue] = useState<string>("")

    const filterList = ["Ngoại ngữ", "Marketing", "Tin học văn phòng", "Thiết kế", "Công nghệ thông tin", "Phát triển bản thân"];
    const filterValues = [NGOAI_NGU, MARKETING, TIN_HOC, THIET_KE, CONG_NGHE_THONG_TIN, PHAT_TRIEN_BAN_THAN];

    const [newCourse, setNewCourse] = useState<CourseInterface>({
        id: 0,
        tenKhoaHoc: "",
        giaGoc: 0,
        giaGiam: 0,
        thumnail: "",
        noiDung: "",
        gioiThieu: "",
        createAt: "",
        updateAt: "",
        createBy: "",
        deleted: false,
        idGioHang: 0,
        theLoai: ""
    })

    useEffect(() => {
        if (filterListIndex >= 0 && filterListIndex < filterValues.length) {
            const selectedValue = filterValues[filterListIndex];
            setFilterValue(selectedValue);
        }
    }, [filterListIndex]);

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
            setIsImageLoaded(true);
            const response = await uploadPayingImage(selectedImage);
            const { data } = response;
            if (data && data.data) {
                setImageUrl(data.data);
                setIsImageLoaded(false);
            } else {
                console.error("Không nhận được dữ liệu hợp lệ từ yêu cầu tải ảnh lên.");
                setIsImageLoaded(false);
            }
        } catch (err) {
            console.log(err);
            setIsImageLoaded(false);
        }
    }

    useEffect(() => {
        if (image) {
            uploadImage(image)
        }
    }, [image])

    const createCourse = async (newCourse: CourseInterface) => {
        try {
            const response = await createKhoaHoc(newCourse);
            setAlertTitle("Lưu thành công");
            setImageUrl("");
            setImage(null);
            setNewCourse({
                ...newCourse,
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
            setVisible(true);
        } catch (err) {
            setAlertTitle("Lưu thất bại");
            setVisible(true);
            console.log("Lỗi ở hàm createCourse màn AdminAddCourseScreen", err);
        }
    }

    const handleSaveBtn = () => {
        const currentDateTime: any = new Date();
        const currentDateTimeString = currentDateTime.toISOString();
        const currentDateTimeSliced = currentDateTimeString.slice(0, -1);
        setNewCourse({
            ...newCourse,
            thumnail: imageUrl,
            theLoai: filterValue,
            createAt: currentDateTimeSliced,
            updateAt: currentDateTimeSliced,
            createBy: userEmail
        });
        if (newCourse.thumnail != "" && newCourse.theLoai != "") {
            setAlertTitle("Bạn đã chắc chắn nhập đúng thông tin?");
            setVisible(true);
            setIsCreate(true);
        } else {
            setAlertTitle("Bạn đã chắc chắn nhập đủ các trường");
            console.log(newCourse.theLoai, "  dd ", newCourse.thumnail)
            setVisible(true);
        }
    }

    useEffect(() => {
        if (newCourse.thumnail !== "" && newCourse.theLoai !== "") {
            return;
        } else {
            setNewCourse({
                ...newCourse,
                thumnail: imageUrl,
                theLoai: filterValue,
                createBy: userEmail
            });
        }
    }, [imageUrl, filterValue]);

    useEffect(() => {
        if (isComfirm == true && isCreate == true) {
            createCourse(newCourse);
        }
    }, [isComfirm, isCreate])

    const handleResetButton = () => {
        setAlertTitle("Bạn có muốn hủy bỏ thông tin đang nhập");
        setVisible(true);
        setIsCreate(false)
    };

    useEffect(() => {
        //handle resetbtn
        if (isComfirm == true && isCreate == false) {
            setFilterListIndex(0);
            setImage("");
            setNewCourse({
                ...newCourse,
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
            setIsComfirm(false);
            navigation.goBack();
        }
    }, [isComfirm, isCreate]);

    const handleComfirmBtn = () => {
        setIsComfirm(true);
        hideDialog();
    }

    const handleCancelBtn = () => {
        setIsComfirm(false);
        hideDialog();
    }
    return (
        <Provider>
            {isImageLoaded ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>) : (<View></View>)}
            <SafeAreaView style={[styles.container]}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AdminHeader userEmail={userEmail} />
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.secondary_container]}>
                        <Text style={[styles.header_text_2]}>Thêm khoá học</Text>
                        <View style={[styles.medium_margin_top]}>
                            <View >
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Tên khóa học</Text>
                                <TextInput style={[styles.full_with_text_input]} value={newCourse.tenKhoaHoc}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            tenKhoaHoc: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giá gốc</Text>
                                <TextInput style={[styles.full_with_text_input]} keyboardType='numeric' value={formatMoney(newCourse.giaGoc.toString())}
                                    onChangeText={value => {
                                        const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
                                        if (!isNaN(numericValue)) {
                                            setNewCourse({
                                                ...newCourse,
                                                giaGoc: numericValue
                                            });
                                        } else {
                                            setNewCourse({
                                                ...newCourse,
                                                giaGoc: 0
                                            });
                                        }
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giá giảm</Text>
                                <TextInput style={[styles.full_with_text_input]} value={formatMoney(newCourse.giaGiam.toString())}
                                    keyboardType='numeric'
                                    onChangeText={value => {
                                        const numericValue = parseFloat(value.replace(/[^0-9]/g, ''));
                                        if (!isNaN(numericValue)) {
                                            setNewCourse({
                                                ...newCourse,
                                                giaGiam: numericValue
                                            });
                                        } else {
                                            setNewCourse({
                                                ...newCourse,
                                                giaGiam: 0
                                            });
                                        }
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Nội dung</Text>
                                <TextInput style={[styles.full_with_text_input]} value={newCourse.noiDung}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            noiDung: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Giới thiệu</Text>
                                <TextInput numberOfLines={10} style={[styles.full_with_text_input]} value={newCourse.gioiThieu}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            gioiThieu: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Người tạo</Text>
                                <TextInput style={[styles.full_with_text_input]} value={userEmail} editable={false}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
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


                            <View style={[styles.medium_margin_vertical, styles.horizontal_container, styles.item_space_between]}>
                                <Text style={[styles.small_margin_vertical]}>Ảnh</Text>
                                <Button title='Chọn tệp' onPress={pickImage} />
                            </View>

                            <View>
                                {image && <Image source={{ uri: image }} style={[{ width: "100%", height: 200, resizeMode: 'stretch' }]} />}
                            </View>

                            <View style={[styles.medium_margin_vertical]}>
                                <Button title='Lưu' onPress={handleSaveBtn} />
                            </View>

                            <View style={[styles.small_margin_vertical]}>
                                <Button title='Hủy bỏ' onPress={handleResetButton} />
                            </View>
                        </View>

                        <Portal>
                            <Dialog visible={visible} onDismiss={hideDialog}>
                                <Dialog.Icon icon="alert" />
                                <Dialog.Title >{alertTitle}</Dialog.Title>
                                {/* <Dialog.Content>
                                </Dialog.Content> */}
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

export default AdminAddCourseScreen