import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Image,
    Modal,
    Alert,
    RefreshControl
} from "react-native";
import React, {
    useState,
    useEffect
} from 'react';
import {
    DataTable,
    Modal as ReactNativePaperModal,
    Portal,
    RadioButton
} from 'react-native-paper';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AdminHeader from "../../components/header/AdminHeader";
import { styles } from "../../styles/commonStyle";
import { items } from "../../ultils/pagingConstans";
import { PaymentInterface, RegisterCourseInterface, UserInfoInterface } from "../../services/interfaces/commoninterfaces";
import { deletePaymentByIdService, getAllPayments, updatePaymentStatusService } from "../../services/PayingSerivces/payingServices";
import {
    formatDateAndTime,
    formatMoney
} from "../../services/common";
import { adminPaymentScreenStyles } from "../../styles/admin_styles/adminPaymentScreenStyles";
import { createDangKy, deleteDangKyById } from "../../services/courseRegister/courseRegisterServices";
import * as payingStatus from "../../ultils/payingStatus";

const AdminPaymentScreen = () => {

    const navigation = useNavigation<any>()
    const router = useRoute<any>()

    const numberOfItemsPerPageList = [2, 4, 6, 8, 10];

    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    const [paymentsData, setPaymentsData] = useState<PaymentInterface[][]>([]);
    const [childPaymenstData, setChildPaymenstData] = useState<PaymentInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortByCreateDate, setSortByCreateDate] = useState<boolean>(true);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const radioBtnValues = [payingStatus.TAT_CA, payingStatus.DA_XAC_NHAN, payingStatus.CHUA_XAC_NHAN];
    const [radioBtnValue, setRadioBtnValues] = React.useState(payingStatus.TAT_CA);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [refreshing, setRefreshing] = useState(false);

    const listParams = router.params;

    const closeFilterModal = () => {
        setIsModalVisible(false);
    };

    const getPaymentsData = async () => {
        try {
            const response = await getAllPayments(numberOfItemsPerPage, page + 1, "", sortByCreateDate, radioBtnValue);
            const { data } = response;
            setPaymentsData(data);
            setIsLoading(false);
            setRefreshing(false);
        } catch (err) {
            console.error("Lỗi ở hàm getPaymentsData", err);
            setIsLoading(false);
            setRefreshing(false);
        }
    }


    const renderPaymentsData = () => {
        return paymentsData.map((paymentGroup: PaymentInterface[], index) => {
            const totalAmountInGroup = paymentGroup.reduce((total, payment) => total + payment.gia, 0);
            const allStatusPaymentFalse = paymentGroup.every((paymentData: PaymentInterface) => !paymentData.trangThai);
            const firstPaymentInGroup = paymentGroup[0];

            const statusIcon = allStatusPaymentFalse ? (
                <Text style={[styles.text_content, adminPaymentScreenStyles.payment_delete_status]}>
                    <FontAwesome name="times-circle-o" size={30} />
                </Text>
            ) : (
                <Text style={[styles.text_content, adminPaymentScreenStyles.payment_check_status, styles.text_bold_strong]}>
                    <FontAwesome name="check-circle" size={30} />
                </Text>
            );

            if (firstPaymentInGroup.deleted) {
                return null;
            }

            return (
                <View key={firstPaymentInGroup.id}>
                    <TouchableOpacity onPress={() => {
                        showModal();
                        setChildPaymenstData(paymentGroup);
                    }} >
                        <View style={[styles.horizontal_container, styles.item_space_between]}>
                            <View style={[adminPaymentScreenStyles.data_view_container]}>
                                <Text style={[styles.text_content]}>{formatDateAndTime(firstPaymentInGroup.createAt)}</Text>
                            </View>
                            <View style={[adminPaymentScreenStyles.data_view_container]}>
                                <Text style={[styles.text_content]}>{firstPaymentInGroup.hoTen}</Text>
                            </View>
                            <View style={[adminPaymentScreenStyles.data_view_container]}>
                                <Text style={[styles.text_content, adminPaymentScreenStyles.paymentAmount]}>{formatMoney(totalAmountInGroup)}</Text>
                            </View>
                            <View style={[adminPaymentScreenStyles.data_view_container]}>
                                {statusIcon}
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline_border, styles.small_margin_vertical, styles.text_opacity]}></View>
                </View>
            );
        }).filter(Boolean); // Loại bỏ các phần tử null
    }


    const createCourseRegister = async (courseId: number, userId: number) => {
        try {
            const response = await createDangKy(courseId, userId);
            const { data } = response;
            return data
        } catch (err) {
            console.log("Lỗi create ở AdminPaymentScreen", err)
            return null;
        }
    }

    const deletePaymentById = async (id: number) => {
        try {
            const response = await deletePaymentByIdService(id);
            const { data } = response;
            return response;
        } catch (err) {
            console.log("Lỗi deletePaymentById ở AdminPaymentScreen", err);
        }
    }

    const updatePaymentStatus = async (id: number) => {
        try {
            const response = await updatePaymentStatusService(id);
            const { data } = response;
            return response;
        } catch (err) {
            console.log("Lỗi updatePaymentById ở AdminPaymentScreen", err);
        }
    }

    const deletecourseRegister = async (id: number) => {
        try {
            const response = await deleteDangKyById(id)
        } catch (err) {
            console.log("Lỗi ở deletecourseRegister màn AdminPaymentScreen.", err)
        }
    }

    const handleComfirmBtn = async (childPaymenstData: PaymentInterface[]) => {
        let isSuccess = true;
        let listIdOfRegisterSuccess = []
        try {
            for (const data of childPaymenstData) {
                const response = await createCourseRegister(data.idKhoaHoc, data.idUser);
                listIdOfRegisterSuccess.push(response.id)
                updatePaymentStatus(data.id);
                console.log(data.idUser)
            }
        } catch (error) {
            console.error("Xác nhận không thành công:", error);
            if (listIdOfRegisterSuccess.length > 0) {
                for (const id of listIdOfRegisterSuccess) {
                    deletecourseRegister(id);
                }
            }
            isSuccess = false;
        }

        if (isSuccess) {
            alert("Đã xác nhận thành công");
        } else {
            alert("Xác nhận không thành công. Vui lòng thử lại sau.");
        }
    }

    const handleComfirmAlertBtn = (childPaymenstData: PaymentInterface[]) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xác nhận không?',
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
                            handleComfirmBtn(childPaymenstData)
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

    const deletePayment = async (id: number) => {
        try {
            const response = await deletePaymentByIdService(id);
            alert("Đã xóa thông tin thanh toán không hợp lệ")
        } catch (err) {
            console.log("Lỗi khi xóa payment ở màn AdminPaymentScreen", err);
        }
    }

    const handleDeletePaymentBtn = (childPaymenstData: PaymentInterface[]) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có muốn xác nhận hủy bỏ?',
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
                            childPaymenstData.map((payment: PaymentInterface) => {
                                deletePayment(payment.id);
                            });
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

    const rederChildPaymetsData = (groupPaymentsData: any) => {
        const paymentData: PaymentInterface = groupPaymentsData.item
        return (
            <View>
                <View>
                    <Text style={[styles.text_bold, styles.text_content]}>Họ và tên: {paymentData.hoTen}</Text>
                    <Text style={[styles.text_bold, styles.text_content, styles.small_margin_vertical]}>Tên Khóa học: {paymentData.tenKhoaHoc}</Text>
                    <Text style={[styles.text_bold, styles.text_content]}>Đơn giá: {formatMoney(paymentData.gia)}</Text>
                    <Text style={[styles.text_bold, styles.text_content, styles.small_margin_vertical]}>Nội dung thanh toán: {paymentData.noiDung}</Text>
                    <Text style={[styles.text_bold, styles.text_content, styles.small_margin_vertical]}>Thời gian tạo: {formatDateAndTime(paymentData.createAt)}</Text>
                    <Text style={[styles.text_bold, styles.text_content]}>Ảnh thanh toán: </Text>
                    <Image style={{ width: "100%", height: 250, resizeMode: 'stretch' }} source={{ uri: paymentData.anhChuyenKhoan }} />
                </View>
                <View style={[styles.underline_border, styles.small_margin_vertical]}></View>
            </View>
        )
    }

    const handleSortByCreateDate = () => {
        setSortByCreateDate(!sortByCreateDate);
    }

    useEffect(() => {
        setIsLoading(true);
        getPaymentsData()
    }, [page, numberOfItemsPerPage, sortByCreateDate, radioBtnValue])

    return (
        <PaperProvider>
            {isLoading ? (<View style={styles.loading}><ActivityIndicator size="large" /></View>) : (<View></View>)}
            <SafeAreaView style={[styles.container]}>
                <ScrollView showsVerticalScrollIndicator={false} style={[styles.secondary_container]}>
                    <AdminHeader userEmail={listParams.userEmail} />
                    <View style={[styles.horizontal_container, styles.item_space_between, styles.medium_marginHorizontal]} >
                        <Text style={[styles.header_text_2]}>Quản lý thanh toán</Text>
                        <TouchableOpacity style={[{ padding: 4, width: 100, alignItems: 'center', justifyContent: 'center' }]} onPress={() => {
                            setIsModalVisible(true);
                        }}>
                            <Text style={[styles.text_content]}>  <FontAwesome name="filter" size={20} /> Lọc</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <View style={[adminPaymentScreenStyles.data_view_container]}>
                                    <DataTable.Title numberOfLines={3}>
                                        <TouchableOpacity onPress={handleSortByCreateDate}>
                                            <Text style={[styles.text_content, styles.text_bold]}>
                                                {sortByCreateDate ? <Icon name="arrowdown" size={16} /> : <Icon name="arrowup" size={16} />}
                                                Ngày tạo</Text>
                                        </TouchableOpacity>
                                    </DataTable.Title>
                                </View>
                                <View style={[adminPaymentScreenStyles.data_view_container]}>
                                    <DataTable.Title numberOfLines={3}>
                                        <Text style={[styles.text_content, styles.text_bold]}>Người gửi</Text>
                                    </DataTable.Title>
                                </View>
                                <View style={[adminPaymentScreenStyles.data_view_container]}>
                                    <DataTable.Title numberOfLines={3}>
                                        <Text style={[styles.text_content, styles.text_bold]}>Tổng thanh toán</Text>
                                    </DataTable.Title>
                                </View>
                                <View style={[adminPaymentScreenStyles.data_view_container]}>
                                    <DataTable.Title numberOfLines={3}>
                                        <Text style={[styles.text_content, styles.text_bold]}>Trạng thái</Text>
                                    </DataTable.Title>
                                </View>
                            </DataTable.Header>

                            {renderPaymentsData()}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                                onPageChange={page => setPage(page)}
                                label={`${from + 1}-${to} of ${items.length}`}
                                showFastPaginationControls
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={numberOfItemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                selectPageDropdownLabel={'Số dòng một trang'}
                            />
                        </DataTable>
                    </View>
                </ScrollView>

                <Portal>
                    <ReactNativePaperModal visible={visible}>
                        <View style={[adminPaymentScreenStyles.modal_container]}>
                            <View style={[styles.horizontal_container, styles.item_space_between]}>
                                <View></View>
                                <TouchableOpacity onPress={hideModal}>
                                    <View><Icon name="close" size={24} /></View>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.underline_border, styles.small_margin_vertical]}></View>
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={() => {
                                            setRefreshing(true);
                                            getPaymentsData();
                                        }}
                                    />
                                }
                                data={childPaymenstData}
                                renderItem={(item: any) => rederChildPaymetsData(item)}
                                refreshing={refreshing}
                                ListFooterComponent={
                                    <View style={[styles.horizontal_container, styles.item_space_between]}>
                                        <TouchableOpacity style={[adminPaymentScreenStyles.button_style, styles.background_green]}
                                            onPress={() => {
                                                handleComfirmAlertBtn(childPaymenstData)
                                            }}
                                        >
                                            <Text style={[styles.text_content]}>Xác nhận thanh toán</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[adminPaymentScreenStyles.button_style, styles.background_red]}
                                            onPress={() => {
                                                handleDeletePaymentBtn(childPaymenstData);
                                            }}
                                        >
                                            <Text style={[styles.text_content]}>Không hợp lệ</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            />
                        </View>
                    </ReactNativePaperModal>
                </Portal>
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    onRequestClose={closeFilterModal}

                >
                    <View style={[adminPaymentScreenStyles.filter_modal_container]} >
                        <View >
                            <TouchableOpacity onPress={closeFilterModal} style={[styles.horizontal_container, styles.item_space_between]}>
                                <View></View>
                                <View><Icon name="close" size={24} /></View>
                            </TouchableOpacity>
                            <RadioButton.Group onValueChange={newValue => setRadioBtnValues(newValue)} value={radioBtnValue}>
                                <View>
                                    <View style={[styles.horizontal_container]}>
                                        <RadioButton value={radioBtnValues[0]} />
                                        <Text style={[styles.text_content]}>Tất cả</Text>
                                    </View>
                                    <View style={[styles.horizontal_container]}>
                                        <RadioButton value={radioBtnValues[1]} />
                                        <Text style={[styles.text_content]}>Đã xác nhận</Text>
                                    </View>
                                    <View style={[styles.horizontal_container]}>
                                        <RadioButton value={radioBtnValues[2]} />
                                        <Text style={[styles.text_content]}>Chưa xác nhận</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>

                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </PaperProvider>
    )
}

export default AdminPaymentScreen