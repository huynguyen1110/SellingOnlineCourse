import { View, Text,SafeAreaView,StyleSheet,TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AdminHeader from "../../components/header/AdminHeader"
import { getAllUser, getCurrentUser } from '../../services/authentication/loginRegesterServices';
import { CourseInterface, PaymentInterface, RegisterCourseInterface, UserInfoInterface } from '../../services/interfaces/commoninterfaces';
import { getAllKhoaHoc } from '../../services/course_services/courseServices';
import { getAllPayments, selectAllPayment } from '../../services/PayingSerivces/payingServices';
import { getAllDangKy } from '../../services/courseRegister/courseRegisterServices';
const AddashboardScreen = () => {
    const progressValue = 5 / 6;
    const router = useRoute<any>();
    const userEmail = router.params.userEmail;
    const [user, setUser] = useState<UserInfoInterface>();
    const [courses, setCourses] = useState<CourseInterface[]>([]);
    const [paymentsData, setPaymentsData] = useState<PaymentInterface[]>([]);
    const [users, setUsers] = useState<UserInfoInterface[]>([]);
    const [registerdCourses, setRegisterdCourses] = useState<RegisterCourseInterface[]>([]);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    
    const getUser = async() => {
        const response = await getCurrentUser();
        setUser(response.data.data)
    }

    const getCoursesData = async () => {
        try {
            const response = await getAllKhoaHoc("", 0, "", 0, 10000);
            const { data } = response;
            setCourses(data);
        } catch (err) {
            console.error("Lỗi lấy khóa học ở màn AdminCourseListScreen", err);
        }
    }

    const getPaymentsData = async () => {
        try {
            const response = await selectAllPayment();
            const { data } = response;
            setPaymentsData(data);
            
        } catch (err) {
            console.error("Lỗi ở hàm getPaymentsData", err);
        }
    }

    const getUsers = async () => {
        try {
            const response = await getAllUser(2);
            const { data } = response;
            setUsers(data.listData);
            
        } catch (err) {
            console.error("Lỗi", err);
        }
    }

    const getRegisterdCourses = async () => {
        try {
            const response = await getAllDangKy();
            const { data } = response;
            setRegisterdCourses(data);
        } catch (err) {
            console.error("Lỗi", err);
        }
    }

    const onRefresh = () => {
        setIsRefresh(true)
    }

    useEffect(() => {
        getUser();
        getCoursesData();
        getPaymentsData();
        getUsers();
        getRegisterdCourses();
        setIsRefresh(false);
    }, [isRefresh]);
  return (
    <SafeAreaView  style={{ flex: 1, marginTop: 50, marginBottom: 10 }}>
       <AdminHeader userEmail={userEmail} />
      <View style={styles.container}>
        {/* <View style={styles.starting}>
            <View>
                <Text style={{fontSize:15}}>WELCOME</Text>
                <Text style={{fontSize:25,fontWeight:'bold'}}>Tên admin</Text>
            </View>
            <Icon name="user-circle" color="#199be6" size={55}/>
        </View> */}
        <ScrollView 
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefresh}
                    onRefresh={onRefresh}
                />
            }
            // refreshControl={
            //     <RefreshControl
            //         refreshing={isRefresh}
            //     />
            // }
        >
            <View style={styles.starting}>
                <View>
                    <Text style={{fontSize:15}}>WELCOME</Text>
                    <Text style={{fontSize:25,fontWeight:'bold'}}>{user?.firstName + " " + user?.lastName}</Text>
                </View>
            </View>
            <View style = {{flexDirection:'row',justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.action1}>
                    <Text style={styles.reng}>Khóa học</Text>
                    <Text style={styles.number}>{courses.length}</Text>
                    <View style={{flexDirection:'row',paddingTop:5}}>
                        <Text style={{color : "#fff", fontSize: 13}}>Cập nhật mới ngày: {courses[courses.length-1]?.createAt.split("T")[0]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action2}>
                    <Text style={styles.reng}>Lượt đăng ký</Text>
                    <Text style={styles.number}>{registerdCourses.length}</Text>
                    <View style={{flexDirection:'row',paddingTop:5}}>
                        <Text style={{color : "#fff"}}>Cập nhật mới ngày: {registerdCourses[registerdCourses.length-1]?.createAt.split("T")[0]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {{flexDirection:'row',justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.action3}>
                    <Text style={styles.reng}>Học viên</Text>
                    <Text style={styles.number}>{users.length}</Text>
                    <View style={{flexDirection:'row',paddingTop:5}}>
                    <Text style={{color : "#fff", fontSize: 13}}>Cập nhật mới ngày: {users[users?.length-1]?.createAt?.split('T')[0]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action4}>
                    <Text style={styles.reng}>Lượt thanh toán</Text>
                    <Text style={styles.number}>{paymentsData.length}</Text>
                    <View style={{flexDirection:'row',paddingTop:5}}>
                        <Text style={{color : "#fff", fontSize: 13}}>Cập nhật mới ngày: {paymentsData[paymentsData?.length-1]?.createAt?.split('T')[0]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {styles.content}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontWeight:'bold'}}>UNIEDU SYSTEM</Text>
                </View>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, opacity: 0.2,marginVertical: 10 }} />
                <View style={{flexDirection :'row',marginTop:15,marginBottom:8,justifyContent:'space-between'}}>
                    <View style ={styles.list}>
                    <Icon name="gears" color="#f7f9fa" size={35} />
                    </View>
                    <View style={styles.progressContainer}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Đánh giá</Text>
                        <View style={styles.progressBar}>
                            <View style={{ width: `${progressValue * 100}%`, backgroundColor: '#4496e3', height: 6, borderRadius: 5 }} />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Tốt</Text>
                            <Text>{Math.round(progressValue * 100)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection :'row',marginTop:15,marginBottom:8,justifyContent:'space-between'}}>
                    <View style ={styles.list2}>
                    <Icon name="upload" color="#f7f9fa" size={35} />
                    </View>
                    <View style={styles.progressContainer}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Đăng tải</Text>
                        <View style={styles.progressBar}>
                            <View style={{ width: `${progressValue * 100}%`, backgroundColor: '#2dc425', height: 6, borderRadius: 5 }} />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Tốt</Text>
                            <Text>{Math.round(progressValue * 100)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection :'row',marginTop:15,marginBottom:8,justifyContent:'space-between'}}>
                    <View style ={styles.list3}>
                    <Icon name="server" color="#f7f9fa" size={35} />
                    </View>
                    <View style={styles.progressContainer}>
                        <Text style={{fontSize:18,fontWeight:'bold'}}>Khóa học đánh giá cao</Text>
                        <View style={styles.progressBar}>
                            <View style={{ width: `${progressValue * 100}%`, backgroundColor: '#bf1736', height: 6, borderRadius: 5 }} />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Tốt</Text>
                            <Text>{Math.round(progressValue * 100)}%</Text>
                        </View>
                    </View>
                </View>
                {/* <View style={{flexDirection :'row',marginTop:15,marginBottom:8,justifyContent:'space-between'}}>
                    <View style ={styles.list4}>
                    <Icon name="trash-o" color="#f7f9fa" size={35} />
                    </View>
                    <View style={styles.progressContainer}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Application Delete</Text>
                        <View style={styles.progressBar}>
                            <View style={{ width: `${progressValue * 100}%`, backgroundColor: '#dde01b', height: 6, borderRadius: 5 }} />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text>Completed</Text>
                            <Text>{Math.round(progressValue * 100)}%</Text>
                        </View>
                    </View>
                </View> */}
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create ({
    container : {
        marginVertical : 20 ,
        marginHorizontal : 15 ,
        // borderColor : 'black',
        // borderWidth : 5, 
    },
    starting : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginBottom : 30,
    },
    action1: {
        backgroundColor : '#22d487',
        borderRadius : 15,
        width : "48%",
        height : 140,
        marginBottom : 15,
        padding : 15
    },
    action2: {
        backgroundColor : '#fc0352',
        borderRadius : 15,
        width : "48%",
        height : 140,
        marginBottom : 15,
        padding : 15
    },
    action3: {
        backgroundColor : '#ffdc04',
        borderRadius : 15,
        width : "48%",
        height : 140,
        marginBottom : 15,
        padding : 15
    },
    action4: {
        backgroundColor : '#0390fc',
        borderRadius : 15,
        width : "48%",
        height : 140,
        marginBottom : 15,
        padding : 15
    },
    reng:{
        fontSize : 17,
        color : 'white',
        fontWeight :'bold',
    },
    number : {
        fontSize : 25,
        color : 'white',
        fontWeight :'bold',
        paddingTop : 25
    },
    content :{
        backgroundColor : '#ccf1ff',
        padding : 10,
        height : 500,
        borderRadius : 17
    },
    list : {
        height : 60 ,
        width: "16%",
        backgroundColor:'#4496e3',
        borderRadius : 15,
        justifyContent:'center',
        alignItems:'center', 
    },
    list2 : {
        height : 60 ,
        width: "16%",
        backgroundColor:'#2dc425',
        borderRadius : 15,
        justifyContent:'center',
        alignItems:'center', 
    },
    list3 : {
        height : 60 ,
        width: "16%",
        backgroundColor:'#bf1736',
        borderRadius : 15,
        justifyContent:'center',
        alignItems:'center', 
    },
    list4 : {
        height : 60 ,
        width: "16%",
        backgroundColor:'#dde01b',
        borderRadius : 15,
        justifyContent:'center',
        alignItems:'center', 
    },
    progressContainer: {
        flexDirection: 'column',
        justifyContent: 'center', 
        width: '80%',
      },
    progressBar: {
        backgroundColor: 'lightgray',
        width: '100%',
        height: 6,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical : 6
        
    },
    progressText: {
        // marginTop: 10,
      },
})

export default AddashboardScreen