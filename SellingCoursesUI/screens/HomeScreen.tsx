import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image, 
  RefreshControl
} from "react-native"
import {
  useState,
  useEffect
} from 'react'
import { Svg, Path } from 'react-native-svg';
import { loginRegisterStyles } from "../styles/loginRegisterStyles";
import { buttonStyles } from "../components/ButtonStyles";
import { validateEmail, validatePassword } from "../ultils/validate";
import { getAccessToken, loginApi, setAccessToken } from "../services/authentication/loginRegesterServices";
import ImageBannerCarousel from "../components/Banner/CarouselBanner";
import { styles } from "../styles/commonStyle";
import CourseContents from "../components/course_contents/CourseContents";
import { footerStyles } from "../components/footer/footerStyles";
import Footer from "../components/footer/Footer";
import LogoHeader from "../components/header/LogoHeader";
import { CONG_NGHE_THONG_TIN, GIO_HANG, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, THIET_KE, TIN_HOC } from "../ultils/courseCatergories";
import {
  useNavigation,
  useRoute
} from "@react-navigation/native"
import { getKhoaHocTrongGioHang } from "../services/course_services/courseServices";
import { CourseInterface } from "../services/interfaces/commoninterfaces";
import { deleteGioHangById } from "../services/CartServices/CartServices";
import { getUserEmailFromToken } from "../services/common";

const HomeScreen = () => {

  const navigation = useNavigation<any>()

  const router = useRoute<any>()

  const [userEmail, setUserEmail] = useState<string>()

    const getUserEmail = async () => {
        var token = await getAccessToken()
        var email = getUserEmailFromToken(token)
        setUserEmail(email)
    }

    useEffect(() => {
        getUserEmail()
    }, [])
  return (
    <SafeAreaView style={[styles.container]} >
      <LogoHeader />
      <View style={[styles.secondary_container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: -30, marginBottom: 10}}>
            <ImageBannerCarousel />
          </View>
          {/* button area */}
          <View style={[styles.horizontal_container, styles.item_space_between, styles.small_margin_vertical]}>
            <View>
              <TouchableOpacity style={[buttonStyles.square_button, styles.background_blue]}>
                <View>
                <Svg fill={'#ffff'} style={[styles.medium_icon_style]} viewBox="0 0 640 512"><Path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></Svg>
                </View>
              </TouchableOpacity>
              <Text style={[styles.text_center, styles.small_text_content, styles.small_margin_top]}>Hội viên</Text>
            </View>
            <View>
              <TouchableOpacity style={[buttonStyles.square_button, styles.background_purple]} onPress={() => {
                navigation.navigate("CartScreen", {filtterType: GIO_HANG,
                  userEmail: userEmail})
              }}>
                <View>
                  <Svg fill={'#ffff'} style={[styles.medium_icon_style]} viewBox="0 0 576 512"><Path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></Svg>
                </View>
              </TouchableOpacity>
              <Text style={[styles.text_center, styles.small_text_content, styles.small_margin_top]}>Giỏ hàng</Text>
            </View>
            <View>
              <TouchableOpacity style={[buttonStyles.square_button, styles.background_green]}>
                <View>
                  <Svg fill={'#ffff'} style={[styles.medium_icon_style]} viewBox="0 0 576 512"><Path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5V78.6c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8V454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5V83.8c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11V456c0 11.4 11.7 19.3 22.4 15.5z" /></Svg>
                </View>
              </TouchableOpacity>
              <Text style={[styles.text_center, styles.small_text_content, styles.small_margin_top]}>Combo</Text>
            </View>

            <View>
              <TouchableOpacity style={[buttonStyles.square_button, styles.background_red]}>
                <Svg fill={'#ffff'} style={[styles.medium_icon_style]} viewBox="0 0 448 512"><Path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z" /></Svg>
              </TouchableOpacity>
              <Text style={[styles.text_center, styles.small_text_content, styles.small_margin_top]}>Bán chạy</Text>
            </View>
          </View>
          {/* button area */}

          {/* courses content area */}
          <CourseContents />
          {/* courses content area */}

          {/* footer area */}
          <View>
            <View style={[styles.vertical_container, styles.item_space_between]}>
              <Text style={[styles.text_content, styles.text_bold, styles.text_center]}>Bạn chưa tìm thấy khóa học mình quan tâm ?</Text>
              <Text style={[styles.text_content, styles.text_bold, styles.text_center]}>Ở đây có hơn 2.000 khóa học đang chờ bạn khám phá</Text>
            </View>

            {/* catogories buttons */}
            <View style={[styles.horizontal_container, styles.item_space_between, styles.medium_margin_top]}>
              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: NGOAI_NGU })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 640 512"><Path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Ngoại ngữ</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: MARKETING })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 576 512"><Path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Marketing</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: TIN_HOC })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 640 512"><Path d="M384 96V320H64L64 96H384zM64 32C28.7 32 0 60.7 0 96V320c0 35.3 28.7 64 64 64H181.3l-10.7 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H277.3l-10.7-32H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm464 0c-26.5 0-48 21.5-48 48V432c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H528zm16 64h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Tin học văn phòng</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.horizontal_container, styles.item_space_between, styles.medium_margin_top]}>
              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: THIET_KE })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 576 512"><Path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Thiết kế</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: CONG_NGHE_THONG_TIN })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 512 512"><Path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Công nghệ thông tin</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[buttonStyles.catogories_button]}
                onPress={() => {
                  navigation.navigate("CourseListScreen", { filtterType: PHAT_TRIEN_BAN_THAN })
                }}
              >
                <Svg style={[styles.icon_style]} viewBox="0 0 384 512"><Path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z" /></Svg>
                <Text style={[styles.small_text_content, styles.text_center]}>Phát triển bản thân</Text>
              </TouchableOpacity>
            </View>
            {/* catogories buttons */}
          </View>
          {/* footer area */}
        </ScrollView>
      </View>
      <Footer />
    </SafeAreaView>
  )
}

export default HomeScreen
