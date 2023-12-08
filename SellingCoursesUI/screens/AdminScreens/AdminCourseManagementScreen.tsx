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

const AdminCourseScreenManagement = () => {

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
                name="AdminCourseListScreen"
                initialParams={{userEmail}}
                component={AdminCourseListScreen}
                options={{
                    tabBarLabel: 'Khóa học hiện có',
                    tabBarIcon: ({ color }) => (
                        <Icon name="bookshelf" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="AdminAddCourseScreen"
                initialParams={userEmail}
                component={AdminAddCourseScreen}
                options={{
                    tabBarLabel: 'Thêm khóa học mới',
                    tabBarIcon: ({ color }) => (
                        <Icon name="notebook-plus" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


export default AdminCourseScreenManagement