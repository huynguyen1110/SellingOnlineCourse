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
import { Dialog, Portal, Provider, TextInput, Text, Button as Paper } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { filterModalPopUpStyles } from '../../components/ModalPopUp/FilterModalStyles';
import { CONG_NGHE_THONG_TIN, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, THIET_KE, TIN_HOC } from '../../ultils/courseCatergories';
import { uploadPayingImage } from '../../services/PayingSerivces/payingServices';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { payingScreenStyles } from '../../styles/payingScreenStyles';
import { LessonInterface } from '../../services/interfaces/commoninterfaces';
import { createBaiHoc } from '../../services/lesson_services/lessonServices';
const AdminAddLessonScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const [visible, setVisible] = useState<any>(false);
    const hideDialog = () => setVisible(false);
    const [alertTitle, setAlertTitle] = useState<string>("");
    const [isComfirm, setIsComfirm] = useState<boolean>(false)

    const userEmail = router.params.userEmail;

    const [filterListIndex, setFilterListIndex] = useState<number>(0);
    // filter list value
    const [filterValue, setFilterValue] = useState<string>("")

    const filterList = ["Ngoại ngữ", "Marketing", "Tin học văn phòng", "Thiết kế", "Công nghệ thông tin", "Phát triển bản thân"];
    const filterValues = [NGOAI_NGU, MARKETING, TIN_HOC, THIET_KE, CONG_NGHE_THONG_TIN, PHAT_TRIEN_BAN_THAN];

    const [newCourse, setNewCourse] = useState<LessonInterface>({
        id:"",
        tenBaiHoc: "",
        noiDung: "",
        moTa : "",
        deleted: false,
        createAt : "",
        createBy : userEmail,
    })

    // useEffect(() => {
    //     if (filterListIndex >= 0 && filterListIndex < filterValues.length) {
    //         const selectedValue = filterValues[filterListIndex];
    //         setFilterValue(selectedValue);
    //     }
    // }, [filterListIndex]);



    const createLesson = async (newCourse: LessonInterface) => {
        try {
            const response = await createBaiHoc(newCourse);
            console.log(response);
            setAlertTitle("Lưu thành công");
            setVisible(true);
        } catch (err) {
            setAlertTitle("Lưu thất bại");
            setVisible(true);
            console.log("Lỗi ở hàm createLesson màn AdminAddLessonScreen", err);
        }
    }

    const handleSaveBtn = () => {
        const currentDateTime: any = new Date();
        setNewCourse({
            ...newCourse,
            tenBaiHoc: "",
            noiDung: "",
            moTa:""
        });
        console.log(newCourse)
        if (newCourse.tenBaiHoc != "" && newCourse.noiDung != "" && isComfirm == true) {
            setAlertTitle("Bạn đã chắc chắn nhập đúng thông tin?");
            setVisible(true);
            if (isComfirm == true) {
                createLesson(newCourse);
            }
        } else {
            setAlertTitle("Bạn đã chắc chắn nhập đủ các trường");
            setVisible(true);
        }
    }

    const handleResetButton = () => {
        setFilterListIndex(0);
        setNewCourse({
            ...newCourse,
            tenBaiHoc: "",
            noiDung: "",
            moTa: ""  
        })
    }

    const handleComfirmBtn = () => {
        setIsComfirm(true);
        hideDialog();
    }

    const handleCancelBtn = () => {
        setIsComfirm(true);
        hideDialog();
    }
    // const hand
    return (
        <Provider>
            <SafeAreaView style={[styles.container]}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <AdminHeader userEmail={userEmail} />
                    <ScrollView showsVerticalScrollIndicator={false} style={[styles.secondary_container]}>
                        <Text style={[styles.header_text_2]}>Thêm Bài học</Text>
                        <View style={[styles.medium_margin_top]}>
                            <View >
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Tên khóa học</Text>
                                <TextInput style={[styles.full_with_text_input]} value={newCourse.tenBaiHoc}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            tenBaiHoc: value
                                        })
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
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Mô Tả</Text>
                                <TextInput style={[styles.full_with_text_input]} value={newCourse.moTa}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            moTa: value
                                        })
                                    }}
                                />
                            </View>

                            <View>
                                <Text style={[styles.small_margin_vertical, styles.text_content]}>Người tạo</Text>
                                {/* <TextInput style={[styles.full_with_text_input]} value={userEmail} editable={false}
                                    onChangeText={value => {
                                        setNewCourse({
                                            ...newCourse,
                                            createdBy: value
                                        })
                                    }}
                                /> */}
                            </View>

                            {/* <View>
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
                            </View> */}

                            <View style={[styles.medium_margin_vertical]}>
                                <Button title='Lưu' onPress={handleSaveBtn} />
                            </View>

                            <View style={[styles.small_margin_vertical]}>
                                <Button title='Reset' onPress={handleResetButton} />
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


export default AdminAddLessonScreen