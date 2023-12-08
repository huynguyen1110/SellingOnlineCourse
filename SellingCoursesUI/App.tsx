import 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPassWordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import CourseListScreen from './screens/CourseListScreen';
import SearchScreen from './screens/SearchScreen';
import NotificationScreen from './screens/NotificationScreen';
import DetailCourseScreen from './screens/DetailCourseScreen';
import CartScreen from './screens/CartScreen';
import ComfirmInFoScreen from './screens/ComfirmInfoScreen';
import PayingScreen from './screens/PayingScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import AccountScreen from './screens/AccountScreen';
import UpdateAccountScreen from './screens/UpdateAccountScreen';
import NotifyScreen from './screens/NotifyScreen';
import RouteStudyScreen from './screens/RouteStudyScreen';
import ActiveCourseScreen from './screens/ActiveCourseScreen';
import SecurityScreen from './screens/SecurityScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import AdminPaymentScreen from './screens/AdminScreens/AdminPaymentScreen';import ChangePasswordScreen from './screens/ChangePasswordScreen';
import AdminCourseScreenManagement from './screens/AdminScreens/AdminCourseManagementScreen';
import UpdateCourseScreen from './screens/AdminScreens/UpdateCourseScreen';
import AdminCourseListScreen from './screens/AdminScreens/AdminCourseListScreen';
import AdminAddLessonScreen from './screens/AdminScreens/AdminAddLessonScreen';
import NewTest from './screens/AdminScreens/UpdateLessonCreen';
import AdminCourseLessonScreen from './screens/AdminScreens/AdminCourseLessonScreen';
import AdminManaScreen from './screens/AdminScreens/AdminManaScreen';
import UpdateLessonScreen from './screens/AdminScreens/UpdateLessonCreen';
import AddashboardScreen from './screens/AdminScreens/AddashboardScreen';
import CoursesRegisteredScreen from './screens/CoursesRegisteredScreen';
import LessonScreen from './screens/LessonScreens';
import AdminAddLectionToCouseManag from './screens/AdminScreens/AdminAddLectionToCouseManag';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='ForgotPassWordScreen' component={ForgotPassWordScreen} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={HomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='CourseListScreen' component={CourseListScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name='DetailCourseScreen' component={DetailCourseScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown:false}} />
        <Stack.Screen name='NotificationScreen' component={NotificationScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='CartScreen' component={CartScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='ComfirmInFoScreen' component={ComfirmInFoScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='PayingScreen' component={PayingScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='FavoriteScreen' component={FavoriteScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='AccountScreen' component={AccountScreen}  options={{ headerShown: false }} />
        <Stack.Screen name='UpdateAccountScreen' component={UpdateAccountScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='NotifyScreen' component={NotifyScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='RouteStudyScreen' component={RouteStudyScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='ActiveCourseScreen' component={ActiveCourseScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='SecurityScreen' component={SecurityScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='NotFoundScreen' component={NotFoundScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='CoursesRegisteredScreen' component={CoursesRegisteredScreen} options={{headerShown:false}} />
        <Stack.Screen name='LessonScreen' component={LessonScreen} options={{headerShown:false}} />
        
        
        {/* AdminScreens */}
        <Stack.Screen name='AdminPaymentScreen' component={AdminPaymentScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='ChangePasswordScreen' component={ChangePasswordScreen} options={{headerShown:false, animation: 'slide_from_right'}} />
        <Stack.Screen name='AdminCourseScreenManagement' component={AdminCourseScreenManagement} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='UpdateCourseScreen' component={UpdateCourseScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='AdminCourseListScreen' component={AdminCourseListScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='AdminManaScreen' component={AdminManaScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='AdminCourseLessonScreen' component={AdminCourseLessonScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='UpdateLessonScreen' component={UpdateLessonScreen} options={{headerShown:false, animation: 'fade'}}/>
        <Stack.Screen name='AdminAddLessonScreen' component={AdminAddLessonScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='AddashboardScreen' component={AddashboardScreen} options={{headerShown:false, animation: 'fade'}} />
        <Stack.Screen name='AdminAddLectionToCouseManag' component={AdminAddLectionToCouseManag} options={{headerShown:false, animation: 'fade'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
