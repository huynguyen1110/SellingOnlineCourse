import {
    View,
    Text,
    Touchable,
    TouchableOpacity
} from "react-native"
import { footerStyles } from "./footerStyles"
import { Path, Svg } from "react-native-svg"
import { styles } from "../../styles/commonStyle"
import { useNavigation, useRoute } from '@react-navigation/native';

const FooterLesson = (props: any) => {
    const navigation = useNavigation<any>()
    return (
                <View style={[footerStyles.footerContainerLesson, {justifyContent: 'center'}]}>
                    <TouchableOpacity onPress={() => {
                        props.previousAction()
                    }}  style={{display: 'flex', backgroundColor:'#365DA4', flexDirection:'row', borderRadius: 10, borderWidth: 1, justifyContent:'center', paddingVertical: 9, marginRight: 9}}>
                        <Svg fill={'#fff'} style={{width: '12%'}} viewBox="0 0 320 512"><Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></Svg>
                        <Text style={{paddingLeft: 6, color: '#fff'}}>Bài trước</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.menuAction()
                    }}  style={{display: 'flex', flexDirection:'row', borderRadius: 10, justifyContent:'center', paddingVertical: 9,borderWidth: 1}}>
                        <Svg  style={{width: '12%'}} viewBox="0 0 448 512"><Path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></Svg>
                        <Text style={{paddingLeft: 6}}>Danh sách</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.nextAction()
                    }}  style={{display: 'flex', backgroundColor:'#365DA4',flexDirection:'row', borderRadius: 10, borderWidth: 1, justifyContent:'center', paddingVertical: 9, marginLeft: 9}}>
                        <Text style={{paddingRight: 6, color: '#fff'}}>Bài tiếp</Text>
                        <Svg fill={'#fff'} style={{width: '12%'}} viewBox="0 0 320 512"><Path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></Svg>
                    </TouchableOpacity>
                </View>

    )
}

export default FooterLesson