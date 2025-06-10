import React, { useState } from 'react'; // Import React và useState
import 'D:/Mini Project/4in1/src/components/Task/TaskCss/TaskModal.css'; // Import CSS cho modal

const TaskModal = ({ isModalOpen, closeModal, selectedTask }) => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Trạng thái cho chế độ tối

    if (!isModalOpen) return null; // Nếu modal không mở, trả về null

    // Function to handle saving the description as a text file
    const saveDescriptionAsFile = () => {
        const blob = new Blob([selectedTask?.description], { type: 'text/plain' }); // Tạo blob từ mô tả tác vụ
        const link = document.createElement('a'); // Tạo liên kết để tải xuống
        link.href = URL.createObjectURL(blob); // Gán URL cho blob
        link.download = `${selectedTask?.title || 'task_description'}.txt`; // Đặt tên file tải xuống
        link.click(); // Bắt đầu tải xuống
    };

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode); // Chuyển đổi trạng thái chế độ tối
    };

    return (
        <div className={`modal ${isDarkMode ? 'dark-mode' : ''}`}> {/* Container cho modal với lớp CSS cho chế độ tối nếu đang bật */}
            <div className="modal-content"> {/* Nội dung của modal */}
                <span className="close" onClick={closeModal}>&times;</span> {/* Nút đóng modal */}
                <h2>Note Description</h2> {/* Tiêu đề mô tả tác vụ */}
                <p>{selectedTask?.description}</p> {/* Hiển thị mô tả tác vụ */}
                {/* Save Description Button */}
                <button onClick={saveDescriptionAsFile} className="save-button"> {/* Nút lưu mô tả */}
                    Save Description
                </button>
                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="dark-mode-toggle"> {/* Nút chuyển đổi chế độ tối */}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'} {/* Hiển thị chữ cho chế độ hiện tại */}
                </button>
            </div>
        </div>
    );
};

export default TaskModal; // Xuất component TaskModal

