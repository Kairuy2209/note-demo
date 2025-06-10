import React, { useState, useEffect } from 'react'; // Import React và các hook useState, useEffect
import { fetchTasks, deleteTask, updateTask } from '../../Service/api'; // Import các hàm API để lấy, xóa, và cập nhật tác vụ
import TaskHeader from './TaskHeader'; // Import component header cho task
import TaskFilter from './TaskFilter'; // Import component filter cho task
import TaskCard from './TaskCard'; // Import component hiển thị từng tác vụ
import TaskModal from './TaskModal'; // Import component modal cho mô tả tác vụ

const TaskList = () => {
    // Tạo state cho TaskList
    const [taskState, setTaskState] = useState({
        tasks: [], // Danh sách các tác vụ
        searchTerm: '', // Từ khóa tìm kiếm
        filter: 'All', // Bộ lọc cho tác vụ (tất cả, đã hoàn thành, chưa hoàn thành)
        selectedTask: null, // Tác vụ đang được chọn để xem mô tả
        isModalOpen: false, // Trạng thái mở/đóng modal
        date: new Date(), // Ngày hiện tại
        showCalendar: false, // Trạng thái hiển thị lịch
    });

    // Tải danh sách tác vụ từ API khi component được mount
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await fetchTasks(); // Gọi hàm fetchTasks để lấy danh sách tác vụ
                setTaskState(prevState => ({ ...prevState, tasks: response.data })); // Cập nhật state với danh sách tác vụ
            } catch (error) {
                console.log(error); // Log lỗi nếu có
            }
        };
        loadTasks(); // Gọi hàm tải tác vụ
    }, []); // Chạy khi component được mount

    // Xử lý khi xóa tác vụ
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) { // Hiển thị thông báo xác nhận
            try {
                await deleteTask(id); // Gọi hàm deleteTask để xóa tác vụ
                setTaskState(prevState => ({
                    ...prevState,
                    tasks: prevState.tasks.filter(task => task.id !== id), // Cập nhật state để loại bỏ tác vụ đã xóa
                }));
            } catch (error) {
                console.log(error); // Log lỗi nếu có
            }
        }
    };

    // Xử lý khi chuyển trạng thái hoàn thành của tác vụ
    const handleToggleComplete = async (task) => {
        const updatedTask = { ...task, completed: !task.completed }; // Chuyển đổi trạng thái hoàn thành của tác vụ
        try {
            await updateTask(task.id, updatedTask); // Gọi hàm updateTask để cập nhật trạng thái tác vụ
            setTaskState(prevState => ({
                ...prevState,
                tasks: prevState.tasks.map(t => (t.id === task.id ? updatedTask : t)), // Cập nhật danh sách tác vụ
            }));
        } catch (error) {
            console.log(error); // Log lỗi nếu có
        }
    };

    // Xử lý khi xem mô tả tác vụ
    const handleViewDescription = (task) => {
        setTaskState(prevState => ({
            ...prevState,
            selectedTask: task, // Lưu trữ tác vụ được chọn
            isModalOpen: true, // Mở modal
        }));
    };

    // Đóng modal
    const closeModal = () => {
        setTaskState(prevState => ({
            ...prevState,
            isModalOpen: false, // Đóng modal
            selectedTask: null, // Đặt tác vụ đã chọn về null
        }));
    };

    // Lọc danh sách tác vụ theo từ khóa tìm kiếm, bộ lọc và ngày
    const filteredTasks = taskState.tasks.filter(task => {
        const isMatchingSearch = task.title.toLowerCase().includes(taskState.searchTerm.toLowerCase()); // Kiểm tra từ khóa tìm kiếm
        const isMatchingFilter = taskState.filter === 'All' || (taskState.filter === 'Completed' && task.completed) || (taskState.filter === 'Pending' && !task.completed); // Kiểm tra bộ lọc
        return isMatchingSearch && isMatchingFilter && new Date(task.dueDate).toDateString() === taskState.date.toDateString(); // Lọc theo ngày
    });

    // Chuyển đổi trạng thái hiển thị lịch
    const toggleCalendar = () => {
        setTaskState(prevState => ({ ...prevState, showCalendar: !prevState.showCalendar })); // Chuyển đổi trạng thái hiển thị của lịch
    };

    // Kiểm tra xem có tác vụ nào vào ngày đã cho hay không
    const isTaskOnDate = (date) => {
        return taskState.tasks.some(task => {
            const taskDate = new Date(task.dueDate).toDateString(); // Lấy ngày của tác vụ
            return taskDate === date.toDateString(); // Kiểm tra nếu ngày của tác vụ trùng với ngày đã cho
        });
    };

    // Phân lớp cho các ô lịch
    const tileClassName = ({ date, view }) => {
        if (view === 'month' && isTaskOnDate(date)) { // Nếu đang ở chế độ tháng và có tác vụ vào ngày đó
            return 'has-task'; // Trả về lớp CSS để đánh dấu ô ngày
        }
        return null; // Không có lớp CSS nào khác
    };

    // Giao diện component TaskList
    return (
        <div className="task-container"> {/* Container cho danh sách tác vụ */}
            <h1 className="task-title">Task List</h1> {/* Tiêu đề danh sách tác vụ */}

            <TaskHeader
                searchTerm={taskState.searchTerm} // Truyền từ khóa tìm kiếm
                setSearchTerm={searchTerm => setTaskState(prevState => ({ ...prevState, searchTerm }))} // Cập nhật từ khóa tìm kiếm
                toggleCalendar={toggleCalendar} // Hàm chuyển đổi hiển thị lịch
                showCalendar={taskState.showCalendar} // Trạng thái hiển thị lịch
                setDate={date => setTaskState(prevState => ({ ...prevState, date }))} // Cập nhật ngày
                date={taskState.date} // Ngày hiện tại
                tileClassName={tileClassName} // Hàm phân lớp cho các ô lịch
            />

            <TaskFilter filter={taskState.filter} setFilter={filter => setTaskState(prevState => ({ ...prevState, filter }))} /> {/* Bộ lọc cho danh sách tác vụ */}

            <div className="task-list"> {/* Container cho danh sách tác vụ */}
                {filteredTasks.length > 0 ? ( // Kiểm tra xem có tác vụ nào trong danh sách đã lọc không
                    filteredTasks.map(task => ( // Nếu có, hiển thị danh sách tác vụ
                        <TaskCard
                            key={task.id} // Khóa duy nhất cho mỗi tác vụ
                            task={task} // Truyền thông tin tác vụ
                            handleToggleComplete={handleToggleComplete} // Hàm chuyển đổi trạng thái hoàn thành
                            handleDelete={handleDelete} // Hàm xóa tác vụ
                            handleViewDescription={handleViewDescription} // Hàm xem mô tả tác vụ
                        />
                    ))
                ) : (
                    <p>No tasks available. Please add a task.</p> // Nếu không có tác vụ, hiển thị thông báo
                )}
            </div>

            <TaskModal isModalOpen={taskState.isModalOpen} closeModal={closeModal} selectedTask={taskState.selectedTask} /> {/* Modal hiển thị mô tả tác vụ */}
        </div>
    );
};

export default TaskList; // Xuất component TaskList
