import React, {
    useState,
    useMemo,
    useEffect
} from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import {
    View,
    Text,
    StatusBar,
} from 'react-native';
import Modal from "react-native-modal";
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import SelectDropdown from 'react-native-select-dropdown'
import { filterModalPopUpStyles } from './FilterModalStyles';
import { styles } from '../../styles/commonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { buttonStyles } from '../ButtonStyles';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import {
    DANH_GIA_CA0,
    GIA_CAO_DEN_THAP,
    GIA_THAP_DEN_CAO,
    HOC_NHIEU, MAC_DINH,
    MOI_NHAT, TU_3_SAO,
    TU_4_SAO, _5_SAO
} from '../../ultils/filterConstants';

const FilterPopUp = ({ isVisible, closeModal, filtterType }: { isVisible: any, closeModal: any, filtterType: string}) => {

    const navigation = useNavigation<any>()

    const router = useRoute<any>()

    const filterList = ["Mặc đinh", "Học nhiều nhất", "Đánh giá cao", "Mới nhất", "Giá thấp đến cao", "Giá cao đến thấp"]

    const filterValues = [MAC_DINH, HOC_NHIEU, DANH_GIA_CA0, MOI_NHAT, GIA_THAP_DEN_CAO, GIA_CAO_DEN_THAP]

    const [filterListIndex, setFilterListIndex] = useState<number>(0)

    const [selectedId, setSelectedId] = useState<string | undefined>()

    // radiobutton value
    const [selectedValue, setSelectedValue] = useState<string | undefined>("")

    // filter list value
    const [filterValue, setFilterValue] = useState<string | undefined>("")

    const [isApplyButtonClick, setIsApplyButtonClick] = useState(false)

    const [isResetButtonClick, setIsResetButtonClick] = useState(false)

    const applyPressHandle = () => {
        setIsApplyButtonClick(true);
        navigation.navigate("CourseListScreen", {
            filtterType: filtterType,
            sapXepKhoaHoc: filterValue,
            sapXepKhoaHocTheoDanhGia: selectedValue
        })
        alert("Đã áp dụng")
        setTimeout(() => {
            setIsApplyButtonClick(false);
        }, 200);
    };

    const resetPressHandle = () => {
        setIsResetButtonClick(true)
        setFilterListIndex(0)
        setSelectedValue(undefined)
        setFilterValue(undefined)
        setSelectedId(undefined)
        setTimeout(() => {
            setIsResetButtonClick(false);
        }, 200);
    };

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1',
            label: '5 sao',
            value: _5_SAO
        },
        {
            id: '2',
            label: 'từ 4 sao',
            value: TU_4_SAO
        },
        {
            id: '3',
            label: 'từ 3 sao',
            value: TU_3_SAO
        }
    ]), []);


    useEffect(() => {
        if (selectedId) {
            const selectedRadioButton = radioButtons.find(button => button.id === selectedId);
            if (selectedRadioButton) {
                const Value = selectedRadioButton.value;
                setSelectedValue(Value)
            }
        }
    }, [selectedId, radioButtons]);

    useEffect(() => {
        if (filterListIndex > 0 && filterListIndex < filterValues.length) {
            const selectedValue = filterValues[filterListIndex];
            setFilterValue(selectedValue);
        }
    }, [filterListIndex]);

    return (
        <View style={filterModalPopUpStyles.flexView}>
            <Modal
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                isVisible={isVisible}
                swipeDirection="down"
                onSwipeComplete={closeModal}
                animationIn="bounceInUp"
                animationOut="bounceOutDown"
                animationInTiming={900}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
                style={filterModalPopUpStyles.modal}
            >
                <View style={filterModalPopUpStyles.modalContent}>
                    <View style={filterModalPopUpStyles.center}>
                        <View style={filterModalPopUpStyles.barIcon} />
                    </View>

                    <View>
                        <View>
                            <Text style={[styles.text_content, styles.small_margin_vertical]}>Sắp xếp theo</Text>
                        </View>

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
                            buttonStyle={filterModalPopUpStyles.dropdown2BtnStyle}
                            buttonTextStyle={filterModalPopUpStyles.dropdown2BtnTxtStyle}
                            renderDropdownIcon={isOpened => {
                                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={filterModalPopUpStyles.dropdown2DropdownStyle}
                            rowStyle={filterModalPopUpStyles.dropdown2RowStyle}
                            rowTextStyle={filterModalPopUpStyles.dropdown2RowTxtStyle}
                        />

                        <View>
                            <View>
                                <Text style={[styles.text_content, styles.small_margin_vertical]}>Đánh giá khóa học</Text>
                            </View>
                            <View>
                                <RadioGroup
                                    containerStyle={{
                                        alignItems: 'flex-start'
                                    }}
                                    radioButtons={radioButtons}
                                    onPress={setSelectedId}
                                    selectedId={selectedId}
                                />
                            </View>
                        </View>

                        <View style={[styles.large_margin_top]}></View>
                        <View style={[styles.large_margin_top]}></View>
                        <View style={[styles.large_margin_top]}></View>
                        <View style={[styles.small_margin_vertical]}>
                            <Text style={[buttonStyles.custom_large_button, { opacity: isResetButtonClick ? 0.6 : 1 }]}
                                onPress={() => {
                                    resetPressHandle()
                                }}
                            >Thiết lập lại</Text>
                        </View>
                        <View >
                            <Text style={[buttonStyles.custom_large_button, { opacity: isApplyButtonClick ? 0.6 : 1 }]}
                                onPress={() => {
                                    applyPressHandle()
                                }}
                            >Áp dụng</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default FilterPopUp