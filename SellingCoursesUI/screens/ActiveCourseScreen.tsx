import { getKhoaHocYeuThich } from '../services/course_services/courseServices';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text,TextInput,Button, FlatList, ActivityIndicator ,TouchableOpacity,Image, SafeAreaView,StyleSheet,ScrollView} from 'react-native';
import { useNavigation } from "@react-navigation/native"
import axios from 'axios';
import { formatMoney } from '../services/common';
import { CourseInterface } from '../services/interfaces/commoninterfaces';
import { Svg, Path } from 'react-native-svg';
import { courseContentStyles } from '../components/course_contents/CourseContentStyle';
import { styles } from '../styles/commonStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderActiveCourse from '../components/header/HeaderActiveCourse';
const ActiveCouseScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <HeaderActiveCourse/>
        <View style={stylecss.container}>
      <Text style={stylecss.title}>Nhập mã kích hoạt</Text>
      <TextInput
        style={styles.input}
        placeholder="Ví dụ : EM0987"
        onChangeText={(text) => {}}
      />
      <TouchableOpacity style={stylecss.button}>
        <Text style={{fontSize: 20,fontWeight:'bold',color:'white'}}>Kích Hoạt</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
};
const stylecss = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20
    },
    input: {
      width: '80%',
      padding: 10,
      margin: 10,
      borderWidth: 1,
      borderColor: 'gray',    
    },
    button :{
        marginTop : 20 ,
        width : 200,
        height : 50,
        borderRadius : 5,
        backgroundColor:'red',
        justifyContent:"center",
        alignItems:'center'
    }
});    

export default ActiveCouseScreen