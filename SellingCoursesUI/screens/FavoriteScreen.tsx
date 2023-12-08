
import { getKhoaHocYeuThich } from '../services/course_services/courseServices';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator ,TouchableOpacity,Image, SafeAreaView,StyleSheet,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native"
import axios from 'axios';
import { formatMoney } from '../services/common';
import { CourseInterface } from '../services/interfaces/commoninterfaces';
import { Svg, Path } from 'react-native-svg';
import { courseContentStyles } from '../components/course_contents/CourseContentStyle';
import { styles } from '../styles/commonStyle';
import Footer from '../components/footer/Footer';
import HeaderFavorite from '../components/header/HeaderFavorite';
import Icon from 'react-native-vector-icons/FontAwesome';

const FavoriteScreen = () => {
    const navigation = useNavigation<any>()
    const [favoriteCourses,setFavoritecourses] = useState<CourseInterface[]>([])

    const getFavoriteCourses = async () => {
      try {
        const response = await getKhoaHocYeuThich()
        const {data} = response
        setFavoritecourses(data)
      } catch (err) {
        console.error(err);
      }
    }
    useEffect(()=>{
      getFavoriteCourses()
    },[])

    const renderFavoriteItems = ({ item }: { item: CourseInterface }) => {

      let bestSellerItem = item
      let limitedName = bestSellerItem.tenKhoaHoc;
      if (limitedName.length > 35) {
          limitedName = limitedName.substring(0, 35) + '...';
      }

      return (
          <TouchableOpacity onPress={() => {
              navigation.navigate("DetailCourseScreen", { khoaHocId: item.id, tenKhoaHoc: item.tenKhoaHoc })
          }}>
              <View style={[stylelist.item_container, styles.medium_margin_vertical,{flexDirection:'row'}]}>
                  <Image style={[stylelist.image_course]} source={bestSellerItem?.thumnail != 'data' ? {uri: bestSellerItem?.thumnail} :{uri: 'https://res.cloudinary.com/dei7onjwu/image/upload/v1698720346/SellingCourses/Picture1_r4yysy.png'}} />
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                      <View style={[stylelist.inner_item]}>
                          <Text style={[stylelist.text_content,{ flexWrap: 'wrap' }]}>
                              {limitedName}
                          </Text>
                      </View>
                      <View style={[stylelist.rating_stars_container]}>
                          <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                          <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                          <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                          <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                          <Svg viewBox="0 0 576 512" style={[courseContentStyles.rating_start_style]}><Path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" /></Svg>
                      </View>
                      <View style={[stylelist.horizontal_container]}>
                          <Text style={[stylelist.text_content2]}>{formatMoney(bestSellerItem.giaGiam)}₫</Text>
                          <Text style={[stylelist.text_opacity, stylelist.small_marginHorizontal, stylelist.strikethrough_text]}>{formatMoney(bestSellerItem.giaGoc)}₫</Text>
                      </View>
                  </View>
              </View>
          </TouchableOpacity>
      )
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderFavorite></HeaderFavorite>
      
      <View style={styles.secondary_container} >
      <View>
          {favoriteCourses.length === 0 ? (
            <View style={stylelist.centeredTextContainer} >
               <Icon name="search" color="#199be6" size={100} />
               <Text style={{fontSize: 20,paddingTop:20}}>Bạn chưa có khóa học yêu thích nào cả !!!</Text>
            </View>
          ) : (
            <>
              <FlatList
                data={favoriteCourses.slice(0, 10)}
                renderItem={favoriteItem => renderFavoriteItems(favoriteItem)}
                
              />
            </>
          )}
        </View>       
       </View>
      
      
      <Footer></Footer>
    </SafeAreaView>

  )
};

const stylelist = StyleSheet.create ({
  item_container: {
    borderWidth:1,
    width: "96%",
    marginHorizontal:"2%",
    height: 145,
    // marginRight: 8,
    borderRadius: 5,
    borderColor: '#bfc9c2',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 0,
  },
  image_course : {
    width : '40%',
    height: 250 / 2,
    resizeMode: 'stretch'
  },
  inner_item : {
    padding: 5
  },
  text_content : { 
      fontSize: 16,
      fontWeight : 'bold'
      // paddingRight: 80
  },
  rating_stars_container :{
    flex: 0,
    flexDirection: 'row',
    margin: 3
  },
  horizontal_container : {
    flex: 0,
    flexDirection: "row",
    paddingTop : 10
  },
  text_opacity: {
    opacity: 0.6,
  },
  small_marginHorizontal : {
    marginHorizontal:8,
    
  },
  strikethrough_text :{
    textDecorationLine: "line-through"
  },
  text_content2 : {
    fontSize : 16 
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250, // Điều chỉnh khoảng cách so với đỉnh màn hình
  },

  
})


export default FavoriteScreen;
