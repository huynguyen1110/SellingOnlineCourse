import {
    SafeAreaView,
    Text
} from "react-native"
import {
    useNavigation,
    useRoute,
    CommonActions
} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { styles } from "../../styles/commonStyle"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminCourseListScreen from "./AdminCourseListScreen";
import AdminAddCourseScreen from "./AdminAddCourseScreen";
import AdminAddLessonScreen from "./AdminAddLessonScreen";
import AdminCourseLessonScreen from "./AdminCourseLessonScreen";
import NewTest from "./UpdateLessonCreen";

const AdminManaScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const userEmail = router.params;

    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Feed"
            activeColor="black"
            barStyle={styles.app_background_color}
        >
            <Tab.Screen
                name="AdminCourseLessonScreen"
                initialParams={{userEmail}}
                component={AdminCourseLessonScreen}
                options={{
                    tabBarLabel: 'Danh sách các bài học',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bookshelf" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="AdminAddLessonScreen"
                initialParams={userEmail}
                component={AdminAddLessonScreen}
                options={{
                    tabBarLabel: 'Thêm bài học mới',
                    tabBarIcon: ({ color }) => (
                        <Icon name="notebook-plus" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default AdminManaScreen