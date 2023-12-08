import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList,ScrollView, TouchableOpacity, Switch, Animated, SafeAreaView } from 'react-native';
import { bestSallingCourses } from '../services/course_services/course_fake_data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    useNavigation,
    useRoute
} from "@react-navigation/native"
import { getCoursesRegistered, getKhoaHocById, updateKhoaHocYeuThich } from '../services/course_services/courseServices';
import { CourseInterface, LessonInterface } from '../services/interfaces/commoninterfaces';
import { formatMoney, getUserEmailFromToken } from '../services/common';
import { styles } from '../styles/commonStyle';
import HeaderShoppingCart from '../components/header/HeaderShoppingCart';
import { createGioHang } from '../services/CartServices/CartServices';
import { XAC_NHAN_THONG_TIN } from '../ultils/courseCatergories';
import { getAccessToken } from '../services/authentication/loginRegesterServices';
import { Path, Svg } from 'react-native-svg';
import HeaderRegistered from '../components/header/HeaderRegistered';
import { courseContentStyles } from '../components/course_contents/CourseContentStyle';
import HeaderLesson from '../components/header/HeaderLesson';
import FooterLesson from '../components/footer/FooterLesson';
import YouTubePlayer from '../components/Youtube/YoutubeComponent';
import VideoComponent from '../components/Video/VideoComponent';
import { getBaiHocByIdKhoaHoc } from '../services/lesson_services/lessonServices';

const LessonScreen = () => {
    const navigation = useNavigation<any>();
    const router = useRoute<any>();
    const [courses,setCourses] = useState<CourseInterface[]>([]);
    const [noiDung, setNoiDung] = useState<string>();
    const [lesson, setLesson] = useState<LessonInterface[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [isMenu, setIsMenu] = useState<boolean>(false);
    var id = router.params.khoaHocId;
    const getCourses = async () => {
        try {
          const response = await getCoursesRegistered()
          const {data} = response
          setCourses(data.listData)
        } catch (err) {
          console.error(err);
        }
      }
    const getLesson = async () => {
        try {
          const response = await getBaiHocByIdKhoaHoc(id)
          const {data} = response
          setLesson(data)
        } catch (err) {
          console.error(err);
        }
    }

    const nextAction = () => {
        if(index < lesson.length - 1)
        {
            setIndex(index + 1)
        }
        else 
        {
            setIndex(lesson.length-1)
        }
    }

    const previousAction = () => {
        if(index > 0)
        {
            setIndex(index - 1)
        }
        else 
        {
            setIndex(0)
        }
    }

    const selectLessonAction = (index: number) => {
        setIndex(index);
        setIsMenu(false);
    }
    const menuAction = () => {
        setIsMenu(!isMenu)
    }

    useEffect(()=>{
        getLesson();
        getCourses()
    },[])
  
    return (
        <SafeAreaView style={[styles.container]} >
            <View style={styles.container}>
                <HeaderLesson nameCourses={router.params.tenKhoaHoc} />
                <View>
                    <VideoComponent src={lesson[index]?.noiDung}></VideoComponent>
                </View>
                {isMenu ? <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', width: '100%', height: '100%', position: 'absolute', zIndex: 30}}>
                    <TouchableOpacity onPress={() => menuAction()} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <Svg style={{height: 25, width: 25, marginHorizontal: 10, marginTop: 10}} viewBox="0 0 384 512">
                            <Path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                        </Svg>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 10}}>Danh Sách bài học</Text>
                    </View>
                    {lesson?.map((item: any, index: any) => (
                        <TouchableOpacity onPress={() => selectLessonAction(index)} key={index} style={{marginHorizontal: 10, borderRadius: 7, borderColor: 'black', borderWidth: 1, marginTop: 5}}>
                            <Text style={{padding: 10}}>{"Bài "+ (index + 1) + ". " + item.tenBaiHoc}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>: <View></View>}
                <ScrollView style={{marginTop: 10, marginHorizontal: 15}} showsVerticalScrollIndicator={false} 
                    scrollEventThrottle={16}>
                        <View >
                            <Text style={{fontWeight:'700', fontSize: 20, color: '#365DA4', textAlign: 'center', marginBottom: 5}}>{"Bài " + (index+1) + ". " + lesson[index]?.tenBaiHoc}</Text>             
                        <View>
                        <Text style={{fontWeight:'700', fontSize: 17, marginVertical: 6}}>Nội dung bài học:</Text>
                        {lesson[index]?.moTa?.split('. ')?.map((item: any, index: any) => (
                            <View key={index} style={{display: 'flex', flexDirection: 'row', marginTop: 4}}>
                            <Svg fill={'green'} style={{ width: 18, height: 18 }} viewBox="0 0 448 512">
                                <Path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </Svg>
                            <Text style={{paddingHorizontal: 15}}>{item}</Text>
                            </View>
                        ))}
                        </View>  
                        
                    </View>
                </ScrollView>
            </View>
            <FooterLesson menuAction={()=> menuAction()} previousAction={() => previousAction()} nextAction={() => nextAction()}/>
        </SafeAreaView>
    )
};
const courseDetailStyles = StyleSheet.create({
    namekh: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    container: {
        flex:1
    },
    header: {
        height: 200,
        backgroundColor: '#48d0fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginHorizontal: 15
    },
    costinput: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    one: {
        fontSize: 28,
        color: 'red',
        fontWeight: 'bold'
    },
    oneone: {
        fontSize: 14,
        color: '#0d8abf',
        paddingLeft: 15,
        paddingTop: 7,
        textDecorationLine: 'line-through'
    },
    oneoneone: {
        backgroundColor: 'red',
        width: 50,
        height: 27,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 90,
        // marginTop: 5
    },
    intro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    tym: {
        paddingTop: 0
    },
    super: {
        flexDirection: 'row'
    },
    icon: {
        marginRight: 10
    },
    button: {
        marginVertical: 10,
        backgroundColor: '#ff1c1c',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    button2: {
        marginBottom: 10,
        backgroundColor: '#4978e6',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textinput: {
        fontSize: 20,
        color: 'white'
    },
    dayu: {
        flexDirection: 'row',
        marginVertical: 5
    },
    icon2: {
        marginRight: 10,

    },
    textview: {
        paddingTop: 20
    },
    text: {
        marginRight: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
    line: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, // Đẩy thanh footer ra ngoài màn hình ban đầu
        backgroundColor: '#d3ddf5',
        height: 50,
        justifyContent: 'center',

    },
    bot: {
        fontSize: 20,
        color: '#e4e7f0',
    },
    funal: {
        flexDirection: 'row',
        paddingHorizontal: 25
    },
    inter: {
        width: 180,
        height: 30,
        backgroundColor: 'red',
        alignItems: 'center'
    },
    imagetest: {
        width: '100%',
        height: 200
    },
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

export default LessonScreen

