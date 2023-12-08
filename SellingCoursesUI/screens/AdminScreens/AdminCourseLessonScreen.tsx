import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    RefreshControl
} from "react-native";
import {
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import { DataTable, Provider } from 'react-native-paper';
import AdminHeader from "../../components/header/AdminHeader";
import { styles } from "../../styles/commonStyle";
import { useEffect, useState } from "react";
import { CourseInterface, LessonInterface } from "../../services/interfaces/commoninterfaces";
import { getAllKhoaHoc } from "../../services/course_services/courseServices";
import { items } from "../../ultils/pagingConstans";
import { Image } from "react-native";
import { formatDateAndTime } from "../../services/common";
import { GET_ALL_BAI_HOC } from "../../services/api";
import { getAllBaiHoc } from "../../services/lesson_services/lessonServices";

const AdminCourseLessonScreen = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const userEmail = router.params.userEmail;

    const [refreshing, setRefreshing] = useState(false);

    const [courses, setCourses] = useState<LessonInterface[]>([]);

    const numberOfItemsPerPageList = [2, 4, 6, 8, 10];
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    const getCoursesData = async () => {
        try {
            const response = await getAllBaiHoc(numberOfItemsPerPage, page + 1);
            const { data } = response;
            setCourses(data.items);
        } catch (err) {
            console.error("Lỗi lấy khóa học ở màn AdminCourseListScreen", err);
        } finally {
            setRefreshing(false);
        }
    }

    useEffect(() => {
        getCoursesData()
    }, [page, numberOfItemsPerPage])

    const onRefresh = () => {
        setRefreshing(true);
        getCoursesData();
    };

    const renderCouresData = (courses: LessonInterface[]) => {
        return (
            courses.map((course: LessonInterface) => (
                <View key={course.id}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("UpdateLessonScreen", { courseId: course.id, userEmail })
                    }}>
                        <View style={[styles.horizontal_container, styles.item_space_between]}>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}>{course.tenBaiHoc}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}>{formatDateAndTime(course.createAt)}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}>{course.createBy}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.underline_border, styles.small_margin_vertical]}></View>
                </View>
            ))
        );
    };


    return (
        <Provider>
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.secondary_container]}>
                    <AdminHeader userEmail={userEmail.userEmail} />
                    <Text style={[styles.header_text_2]}>Bài học của khóa học</Text>
                    <ScrollView showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Tên bài học</Text></DataTable.Title>
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Ngày tạo</Text></DataTable.Title>
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Người thêm</Text></DataTable.Title>
                            </DataTable.Header>

                            {renderCouresData(courses)}
                            

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                                onPageChange={page => setPage(page)}
                                label={`${from + 1}-${to} of ${items.length}`}
                                showFastPaginationControls
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={numberOfItemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                selectPageDropdownLabel={'Số dòng một trang'}
                            />
                        </DataTable>
                        
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Provider>
    )
}

export default AdminCourseLessonScreen