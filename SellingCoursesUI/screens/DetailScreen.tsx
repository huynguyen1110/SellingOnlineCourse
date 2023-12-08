import React,{ useState ,useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView ,TouchableOpacity,Switch,Animated} from 'react-native';
import { bestSallingCourses } from '../services/course_services/course_fake_data';
import Icon from 'react-native-vector-icons/FontAwesome';

const DetailScreen = () => {
    const course = bestSallingCourses.find((item) => item.id === 1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isXuSalesEnabled, setIsXuSalesEnabled] = useState(false); 


    const toggleFavorite = () => {
        setIsFavorite(!isFavorite); // Khi người dùng nhấn, thay đổi trạng thái
    };
    const toggleXuSales = () => {
        setIsXuSalesEnabled(!isXuSalesEnabled); 
    };
    const scrollY = useRef(new Animated.Value(0)).current; 

  
    const footerTranslateY = scrollY.interpolate({
        inputRange: [0, 400], 
        outputRange: [400, 0], 
        extrapolate: 'clamp', 
    });

  return (
    <View style={styles.container} >
        <View style={styles.header}>
            <Text>huhuhhhhhhhhhhhhhh</Text>
        </View>
        <ScrollView style={styles.content} onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
            <Text style={styles.namekh}>{course?.TenKhoaHoc}</Text>            
                <View style={styles.intro}>
                    <View style={styles.costinput}>
                        <Text style={styles.oneone}>Giá gốc:{course?.GiaGoc}đ </Text>
                        <Text style={styles.one}>Giá giảm:{course?.GiaGiam}đ</Text>
                    </View>
                    <TouchableOpacity style={styles.tym} onPress={toggleFavorite}>
                    <Icon
                        name={isFavorite ? 'heart' : 'heart-o'} // Tên biểu tượng trái tim hoặc trái tim trống
                        size={24}
                        color={isFavorite ? 'red' : 'black'} // Màu đỏ nếu đã nhấn, màu đen nếu chưa
                        />
                    </TouchableOpacity>
                </View>              
            <View style={styles.super}>
                <Icon name="tachometer" color="#217334" size={15} style={styles.icon}/>
                <Text>Thời gian ưu đãi còn 3 ngày</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.textinput}>ĐẶT MUA KHÓA HỌC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
                <Text style={styles.textinput}> ĐĂNG KÝ TƯ VẤN </Text>
            </TouchableOpacity>
            <Text style={{ opacity: 0.5 ,paddingLeft:20,paddingBottom: 10}} >Hoàn tiền trong vòng 10 ngày nếu nhưu không hài lòng</Text>
            <View style={styles.dayu}>
            <Icon name="check-square-o" color="#0d0002" size={20} style={styles.icon2}/>
                <Text>Thời lượng</Text>
            </View>
            <View style={styles.dayu}>
            <Icon name="check-square-o" color="#0d0002" size={20} style={styles.icon2}/>
                <Text>Nhận chứng chỉ</Text>
            </View>
            <View style={styles.dayu}>
            <Icon name="check-square-o" color="#0d0002" size={20} style={styles.icon2}/>
                <Text>Sỡ hữu trọn đời</Text>
            </View>
            <View style={styles.dayu}>
            <Icon name="check-square-o" color="#0d0002" size={20} style={styles.icon2}/>
                <Text>Thời lượng</Text>
            </View>
            <View style={styles.dayu}>
            <Icon name="check-square-o" color="#0d0002" size={20} style={styles.icon2}/>
                <Text>Thời lượng</Text>
            </View>
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View>
            <View style={styles.textview}>
                    <Text style={styles.text}>Gioi thiệu khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
            <View style={styles.textview}>
                    <Text style={styles.text}>Thông tin giảng viên</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View>  
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
            <View style={styles.textview}>
                    <Text style={styles.text}>Bạn nhận được gì sau khóa học</Text>
                    <View style={styles.line} />
                    <Text> - Yêu tổ quốc, yêu đồng bào </Text>
                    <Text> - Học tập tốt,lao động tốt</Text>
                    <Text> - Đoàn kết tốt,kỷ luật tốt </Text>
                    <Text> - Giu gìn vệ sinh thật tốt </Text>
                    <Text> - Khiêm tốn thật thà dũng cảm</Text>
            </View> 
         
            {/* <Text>Tên Khóa Học</Text> */}
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>
            <Text>Tên Khóa Học</Text>

        </ScrollView>
        <Animated.View style={[styles.footer, { transform: [{ translateY: footerTranslateY }] }]}>            
            <Text style={styles.bot}>Đăng kí ngay nào !</Text>
        </Animated.View>
    </View>
  )
};
const styles = StyleSheet.create({
    namekh:{
        fontSize: 25,
        fontWeight :'bold'
    },
    container : {
        flex : 1
    },
    header: {
        marginTop: 50,
        marginBottom: 15,
        height: 200,
        backgroundColor: '#48d0fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content : {
        marginHorizontal : 15 
    },
    costinput :{
        marginVertical : 10
    },
    one :{
        fontSize : 25,
        color:'red'
    },
    oneone : {
        fontSize : 15,
        color :'#0d8abf'
    },
    intro :{
        flexDirection : 'row',
        justifyContent:'space-between'
    },
    tym : {
        paddingTop:20
    },
    super : {
        flexDirection : 'row'
    },
    icon : {
        marginRight: 5
    },
    button : {
        marginVertical : 10,
        backgroundColor:'red',
        width: '100%',
        height: 50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 5,
    },
    button2 : {
        marginBottom : 10,
        backgroundColor:'#1017e6',
        width: '100%',
        height: 50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 5,
    },
    textinput : {
        fontSize : 20,
        color :'white'
    },
    dayu : {
        flexDirection : 'row',
        marginVertical : 5
    },
    icon2 : {
        marginRight : 5
    },
    textview:{
        paddingTop : 20 
      },
      text: {
        marginRight: 10, 
        marginBottom : 7
      },
      line: {
        flex: 1, 
        borderBottomColor: 'black', 
        borderBottomWidth: 1, 
      },
      footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0, // Đẩy thanh footer ra ngoài màn hình ban đầu
        backgroundColor: 'red',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
    bot : {
        fontSize : 20,
        color : 'white'
    }



})

export default DetailScreen