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
import { headerStyles } from './Header';
import { styles } from "../../styles/commonStyle";
import { Svg, Path } from "react-native-svg"

const HeaderFavorite = () => {
    const navigation = useNavigation<any>()
    return (
        <View >
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
                    <Text style={[styles.header_text_3,styles.text_center,{ marginRight:90 }]}>
                        Khóa học yêu thích 
                    </Text>
                </View>

            </View>
        </View>
)
};
export default HeaderFavorite
