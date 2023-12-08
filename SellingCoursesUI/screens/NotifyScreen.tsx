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
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderNotify from '../components/header/HeaderNotify';

const NotifyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <HeaderNotify/>
    </SafeAreaView>

  )
}

export default NotifyScreen