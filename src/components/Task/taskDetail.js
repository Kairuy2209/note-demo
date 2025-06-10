import React from 'react';
import { useParams } from 'react-router-dom'; // Nhập useParams từ React Router để lấy tham số URL
import { useQuery } from '@tanstack/react-query'; // Nhập useQuery từ TanStack React Query để thực hiện các truy vấn
import { getTask } from '../../Service/api'; // 
import 'D:/Mini Project/4in1/src/components/Task/TaskCss/taskForm-Detail.css';

const TaskDetail = () => {
    const { id } = useParams(); // Lấy id của task từ tham số URL

    // Thực hiện truy vấn để lấy thông tin task dựa trên id
    const { data: task, isLoading, isError, error } = useQuery({
        queryKey: ['task', id], // Khóa truy vấn để xác định task cụ thể
        queryFn: () => getTask(id), // Hàm để lấy thông tin task
    });

    // Kiểm tra trạng thái tải
    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị thông báo tải khi dữ liệu đang được tải
    }

    // Kiểm tra lỗi
    if (isError) {
        return <div>Error: {error.message}</div>; // Hiển thị thông báo lỗi nếu có
    }

    // Hiển thị thông tin chi tiết của task
    return (
        <div>
            <h1>Task Detail</h1>
            {task && ( // Kiểm tra xem task có tồn tại không
                <div>
                    <p>Title: {task.title}</p> {/* Hiển thị tiêu đề của task */}
                    <p>Description: {task.description}</p> {/* Hiển thị mô tả của task */}
                    <p>Due Date: {new Date(task.dueDate).toLocaleString()}</p> {/* Hiển thị ngày hết hạn của task */}
                    <p>Status: {task.completed ? 'Completed' : 'Pending'}</p> {/* Hiển thị trạng thái của task */}
                </div>
            )}
        </div>
    );
};

export default TaskDetail; // Xuất component TaskDetail
