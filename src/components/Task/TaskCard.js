import React from 'react';
import { Link } from 'react-router-dom'; // Nhập Link từ React Router để điều hướng
import { FaEdit, FaTrash, FaCheck, FaClock, FaEye } from 'react-icons/fa'; // Nhập các biểu tượng cho các hành động // Import component BlossomFall cho hiệu ứng hoa mai rơi
import 'D:/Mini Project/4in1/src/components/Task/TaskCss/taskList.css';

// Component TaskCard nhận task và các hàm xử lý như props
const TaskCard = ({ task, handleToggleComplete, handleDelete, handleViewDescription }) => {
    return (
        // Render thẻ card cho task với các lớp CSS điều kiện dựa trên trạng thái hoàn thành
        <div key={task.id} className={`task-card ${task.completed ? 'completed' : 'pending'}`}>
            <h3>{task.title}</h3> {/* Hiển thị tiêu đề của task */}
            <p>Due: {new Date(task.dueDate).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true })}</p> {/* Định dạng và hiển thị ngày hết hạn */}
            <div className={`task-status ${task.completed ? 'completed-status' : 'pending-status'}`}>
                {task.completed ? 'Completed' : 'Pending'} {/* Hiển thị trạng thái của task */}
            </div>
            <div className="action-buttons"> {/* Container cho các nút hành động */}
                <button onClick={() => handleToggleComplete(task)} title={task.completed ? 'Đánh dấu là Chưa Hoàn Thành' : 'Đánh dấu là Hoàn Thành'}>
                    {task.completed ? <FaClock /> : <FaCheck />} {/* Biểu tượng thay đổi dựa trên trạng thái hoàn thành */}
                </button>
                <button onClick={() => handleViewDescription(task)} className="view-button" title="Xem Mô Tả">
                    <FaEye /> {/* Nút để xem mô tả task */}
                </button>
                <Link to={`/edit/${task.id}`} className="edit-button" title="Chỉnh Sửa Task">
                    <FaEdit /> {/* Liên kết đến trang chỉnh sửa task */}
                </Link>
                <button onClick={() => handleDelete(task.id)} className="delete-button" title="Xóa Task">
                    <FaTrash /> {/* Nút để xóa task */}
                </button>
            </div>
        </div>
    );
};

export default TaskCard; // Xuất component TaskCard
