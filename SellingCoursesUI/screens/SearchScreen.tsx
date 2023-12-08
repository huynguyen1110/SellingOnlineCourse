import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet
  } from "react-native"
  import {
    useState,
    useEffect
  } from 'react'
  import { styles } from "../styles/commonStyle";
  import CourseContents from "../components/course_contents/CourseContents";
  import { Ionicons, FontAwesome } from '@expo/vector-icons';
import TagComponent from "../components/Tag/TagComponent";
import Footer from "../components/footer/Footer";
import { Path, Svg } from "react-native-svg";
import { CONG_NGHE_THONG_TIN, KHOA_HOC_BAN_CHAY, MARKETING, NGOAI_NGU, PHAT_TRIEN_BAN_THAN, SEARCH, THIET_KE, TIN_HOC } from "../ultils/courseCatergories";
import { CourseInterface } from "../services/interfaces/commoninterfaces";
import { searchKhoaHoc } from "../services/course_services/courseServices";
  const SearchScreen = ({ navigation }: { navigation: any }) => {
    const [searchText, setSearchText] = useState<any>();
    const [courses, setCourses] = useState<CourseInterface[]>([])
    const handleHelperSearch = (key : any) => {
      setSearchText(key);
    }
    const handleSearch = async() => {
      const response = await searchKhoaHoc(searchText);
      setCourses(response.data.data.items);
      if(searchText && response.data.data.totalItems > 0 )
      {
        navigation.navigate("CourseListScreen", {filtterType: SEARCH, keyword: searchText})
      }
      else if(searchText && response.data.data.totalItems <= 0 ) {
        navigation.navigate("NotFoundScreen")
      }
    }

    return (
        <SafeAreaView style={[styles.container]} >
          <View style={[styles.horizontal_container, styles.small_margin_vertical]}>
            <TextInput onChangeText={setSearchText} style={styles.input} value={searchText} placeholder="Tìm kiếm khóa học"></TextInput>
            <TouchableOpacity onPress={handleSearch} style={[styles.button, styles.bg_primary]}>
              <Svg fill='#fbfcfe' style={styles.icon_style} viewBox="0 0 512 512"><Path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></Svg>
            </TouchableOpacity>
          </View>
          <View style={[styles.secondary_container,styles.small_margin_top]}>
              <Text style={[styles.text_bold_strong, styles.small_margin_top]}>Top tìm kiếm</Text>
              <View style={[styles.horizontal_container, styles.flex_wrap, stylecss.marginTitle]}>
                  <TagComponent handelHelper={handleHelperSearch} content={"lập trình đa nền tảng"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"tiếng anh"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"python"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"ASP .NET Core"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"C++"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"yoga"}></TagComponent>
                  <TagComponent handelHelper={handleHelperSearch} content={"guitar"}></TagComponent>
              </View>
              <View style={[styles.small_margin_top]}>
                <Text style={[styles.text_bold_strong, styles.small_margin_top]}>Lĩnh vực tìm kiếm</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: NGOAI_NGU})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 640 512"><Path d="M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Ngoại ngữ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: MARKETING})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 576 512"><Path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Marketing</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: TIN_HOC})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 640 512"><Path d="M384 96V320H64L64 96H384zM64 32C28.7 32 0 60.7 0 96V320c0 35.3 28.7 64 64 64H181.3l-10.7 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H277.3l-10.7-32H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm464 0c-26.5 0-48 21.5-48 48V432c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H528zm16 64h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Tin học văn phòng</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: THIET_KE})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 576 512"><Path d="M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Thiết kế</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: CONG_NGHE_THONG_TIN})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 512 512"><Path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Công nghệ thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("CourseListScreen", {filtterType: PHAT_TRIEN_BAN_THAN})}} style={stylecss.itemContainer}>
                  <Svg style={[styles.icon_style]} viewBox="0 0 384 512"><Path d="M297.2 248.9C311.6 228.3 320 203.2 320 176c0-70.7-57.3-128-128-128S64 105.3 64 176c0 27.2 8.4 52.3 22.8 72.9c3.7 5.3 8.1 11.3 12.8 17.7l0 0c12.9 17.7 28.3 38.9 39.8 59.8c10.4 19 15.7 38.8 18.3 57.5H109c-2.2-12-5.9-23.7-11.8-34.5c-9.9-18-22.2-34.9-34.5-51.8l0 0 0 0c-5.2-7.1-10.4-14.2-15.4-21.4C27.6 247.9 16 213.3 16 176C16 78.8 94.8 0 192 0s176 78.8 176 176c0 37.3-11.6 71.9-31.4 100.3c-5 7.2-10.2 14.3-15.4 21.4l0 0 0 0c-12.3 16.8-24.6 33.7-34.5 51.8c-5.9 10.8-9.6 22.5-11.8 34.5H226.4c2.6-18.7 7.9-38.6 18.3-57.5c11.5-20.9 26.9-42.1 39.8-59.8l0 0 0 0 0 0c4.7-6.4 9-12.4 12.7-17.7zM192 128c-26.5 0-48 21.5-48 48c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80c8.8 0 16 7.2 16 16s-7.2 16-16 16zm0 384c-44.2 0-80-35.8-80-80V416H272v16c0 44.2-35.8 80-80 80z" /></Svg>
                  <Text style={[styles.small_text_content, styles.text_center]}>Phát triển bản thân</Text>
                </TouchableOpacity>
              </View>
          </View>
          <Footer/>
        </SafeAreaView>
    )
  }
  const stylecss = StyleSheet.create({
    itemContainer: {
      display: "flex", 
      flexDirection: "row", 
      alignItems: 'center', 
      borderBottomWidth: 1,
      paddingVertical: 13, 
      borderBottomColor: "#d6d6dc"
    }, 
    marginTitle: {
      marginVertical: 7
    }
  })
  export default SearchScreen
  