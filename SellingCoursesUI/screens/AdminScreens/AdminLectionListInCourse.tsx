import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    ScrollView,
    RefreshControl
} from "react-native"
import {
    useNavigation,
    useRoute,
    CommonActions
} from "@react-navigation/native";
import { DataTable, Provider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { styles } from "../../styles/commonStyle"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AdminHeader from "../../components/header/AdminHeader";
import { getBaiKhoaTrongKhoaHoc, xoaChiTietKhoaHoc } from "../../services/detailcourse_services/detailCourseServices";
import { CourseDetailInterface, LessonInterface } from "../../services/interfaces/commoninterfaces";
import { useEffect, useState } from "react";
import { items } from "../../ultils/pagingConstans";
import { getAllBaiHoc } from "../../services/lesson_services/lessonServices";
import { formatDateAndTime } from "../../services/common";
import { View } from "react-native";
import { Alert } from "react-native";

const AdminLectionListInCourse = () => {

    const navigation = useNavigation<any>();
    const router = useRoute<any>();

    const userEmail = router.params.userEmail;
    const courseId = router.params.courseId;

    const [refreshing, setRefreshing] = useState(false);

    const [courses, setCourses] = useState<LessonInterface[]>([]);

    const numberOfItemsPerPageList = [2, 4, 6, 8, 10];
    const [page, setPage] = useState<number>(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

    const [detailOfCourses, setDetailOfCourses] = useState<CourseDetailInterface []>([]);


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

    const getCourseDetail = async () => {
        try {
            const response = await getBaiKhoaTrongKhoaHoc(courseId);
            const {data} = response;
            setDetailOfCourses(data);
        } catch(err) {
            console.error("Lỗi ở hàm getCourseDetail man AdminExistingLection", err)
        }
    }

    useEffect(() => {
        getCourseDetail();
    }, [courseId])

    useEffect(() => {
        getCoursesData()
    }, [page, numberOfItemsPerPage])

    const onRefresh = () => {
        setRefreshing(true);
        getCourseDetail();
        getCoursesData();
    };

    const deleteCourseDetail = async (courseId: number, lessionId: number) => {
        try {
            const respone = await xoaChiTietKhoaHoc(courseId, lessionId);
            alert("Đã xóa khỏi danh sách");
        } catch(err) {
            console.error("Lỗi ở màn deleteCourseDetail màn AdminExistingLection");
        }
    }

    const deleteBtn = (courseId: number, lessionId: number) => {
        deleteCourseDetail(courseId, lessionId);
    }

    const showDeleteAlert = (courseId: number, lesionId: number) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xóa bài học này khỏi khóa học?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => deleteBtn(courseId, lesionId) }
            ],
            { cancelable: true }
        );
    };

    const renderCouresData = (courses: LessonInterface[]) => {
        return (
            courses.map((course: LessonInterface) => {
                // Check if the course ID exists in the detail data
                const isCourseInDetail = detailOfCourses.some(detailCourse => detailCourse.idBaiHoc === course.id);
    
                // Render the course only if it exists in the detail data
                if (isCourseInDetail) {
                    return (
                        <View key={course.id}>
                            <View style={[styles.horizontal_container, { marginLeft: 20 }]}>
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}>{course.tenBaiHoc}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}>{formatDateAndTime(course.createAt)}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity onPress={() => {
                                        showDeleteAlert(courseId ,course.id)
                                    }}>
                                        <Text numberOfLines={3} style={[styles.text_content, styles.text_bold, styles.text_black]}><AntDesign name="close" size={24} /></Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.underline_border, styles.small_margin_vertical]}></View>
                        </View>
                    );
                } else {
                    return null;
                }
            })
        );
    };
    


    return (
        <Provider>
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.secondary_container]}>
                    <AdminHeader userEmail={userEmail.userEmail} />
                    <Text style={[styles.header_text_2]}>Danh sách bài học hiện có</Text>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <DataTable>
                            <DataTable.Header >
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Tên bài học</Text></DataTable.Title>
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Ngày tạo</Text></DataTable.Title>
                                <DataTable.Title numberOfLines={2}><Text style={[styles.text_content, styles.text_bold_strong]}>Thêm</Text></DataTable.Title>
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

export default AdminLectionListInCourse