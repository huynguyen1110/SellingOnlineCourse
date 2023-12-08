import {
    View,
    SafeAreaView,
    Text,
    Touchable,
    TouchableOpacity
} from 'react-native';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { Svg, Path } from "react-native-svg"
import { styles } from "../../styles/commonStyle";
import React, {
    createContext,
    useState
} from 'react'
import { CONG_NGHE_THONG_TIN, GIO_HANG, KHOA_HOC_BAN_CHAY, KHOA_HOC_MOI, KHOA_HOC_UU_DAI, MARKETING, NGOAI_NGU, NOTIFICATION, PHAT_TRIEN_BAN_THAN, SEARCH, THANH_TOAN, THIET_KE, TIN_HOC, XAC_NHAN_THONG_TIN } from '../../ultils/courseCatergories';
import { headerStyles } from './Header';
import FilterPopUp from '../ModalPopUp/FilterModal';

const HeaderScreen = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const router = useRoute<any>()

    const navigation = useNavigation<any>()

    const filterName = router.params.filtterType

    var headerTitle = ''

    if (filterName == KHOA_HOC_BAN_CHAY) {
        headerTitle = "Top bán chạy"
    }
    if (filterName == KHOA_HOC_UU_DAI) {
        headerTitle = "Ưu đãi hôm nay"
    }
    if (filterName == KHOA_HOC_MOI) {
        headerTitle = "Mới ra mắt"
    }
    if (filterName == NOTIFICATION) {
        headerTitle = "Thông báo"
    }
    if (filterName == NGOAI_NGU) {
        headerTitle = "Ngoại ngữ"
    }
    if (filterName == MARKETING) {
        headerTitle = "Marketing"
    }
    if (filterName == TIN_HOC) {
        headerTitle = "Tin học văn phòng"
    }
    if (filterName == THIET_KE) {
        headerTitle = "Thiết kế"
    }
    if (filterName == CONG_NGHE_THONG_TIN) {
        headerTitle = "Công nghệ thông tin"
    }
    if (filterName == PHAT_TRIEN_BAN_THAN) {
        headerTitle = "Phát triển bản thân"
    }
    if (filterName == GIO_HANG) {
        headerTitle = "Giỏ hàng"
    }
    if (filterName == XAC_NHAN_THONG_TIN) {
        headerTitle = "Xác nhận thông tin"
    }
    if (filterName == THANH_TOAN) {
        headerTitle = "Thanh toán"
    }
    if (filterName == SEARCH) {
        headerTitle = "Tìm kiếm"
    }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    return (
        <SafeAreaView>
            <View style={[styles.horizontal_container, styles.item_space_between,
            styles.item_center,
            headerStyles.header_container]}>

                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View>
                        <Svg style={[styles.icon_style]} viewBox="0 0 448 512"><Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></Svg>
                    </View>
                </TouchableOpacity>

                <View>
                    <Text style={[styles.header_text_3, styles.text_center]}>
                        {headerTitle}
                    </Text>
                </View>
                <View>
                    {filterName === NGOAI_NGU ||
                    filterName === MARKETING ||
                    filterName === TIN_HOC ||
                    filterName === THIET_KE ||
                    filterName === CONG_NGHE_THONG_TIN ||
                    filterName === PHAT_TRIEN_BAN_THAN ? (
                        <TouchableOpacity onPress={() => {
                            setModalVisible(!isModalVisible)
                        }}>
                            <Svg style={[styles.icon_style]} viewBox="0 0 512 512">
                                <Path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
                            </Svg>
                        </TouchableOpacity>
                    ) : <Text style={[styles.icon_style]}></Text> }
                </View>
            </View>
            <FilterPopUp filtterType={filterName} isVisible={isModalVisible} closeModal={toggleModal}/>
        </SafeAreaView>

    )
}

export default HeaderScreen