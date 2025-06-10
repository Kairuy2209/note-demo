import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, addTask, updateTask } from '../../Service/api';

export const useTaskForm = () => {
    // Khởi tạo các state để lưu trữ dữ liệu nhập từ form
    const [title, setTitle] = useState(''); // Lưu tiêu đề của nhiệm vụ
    const [description, setDescription] = useState(''); // Lưu mô tả của nhiệm vụ
    const [dueDate, setDueDate] = useState(''); // Lưu ngày và thời gian đến hạn của nhiệm vụ

    const { id } = useParams(); // Lấy id từ URL để biết nhiệm vụ nào đang được chỉnh sửa (nếu có)
    const navigate = useNavigate(); // Sử dụng để điều hướng trang

    // useEffect để tải nhiệm vụ khi component được render nếu có id
    useEffect(() => {
        const loadTask = async () => {
            if (id) { // Nếu có id trong URL (đang chỉnh sửa nhiệm vụ)
                try {
                    const response = await getTask(id); // Gọi API để lấy thông tin nhiệm vụ cần chỉnh sửa
                    setTitle(response.data.title); // Cập nhật state title với dữ liệu nhận được
                    setDescription(response.data.description); // Cập nhật state description
                    setDueDate(response.data.dueDate); // Cập nhật state dueDate
                } catch (error) {
                    console.log(error); // Bắt lỗi nếu có vấn đề trong quá trình lấy dữ liệu
                }
            }
        };
        loadTask(); // Gọi hàm loadTask nếu có id (tức là nếu đang ở chế độ chỉnh sửa)
    }, [id]); // useEffect sẽ chạy lại khi id thay đổi

    // Hàm xử lý khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
        const task = { title, description, dueDate }; // Tạo một object nhiệm vụ từ các giá trị nhập vào từ form

        try {
            if (id) {
                await updateTask(id, task); // Gọi API để cập nhật nhiệm vụ nếu đang ở chế độ chỉnh sửa
            } else {
                await addTask(task); // Gọi API để thêm nhiệm vụ mới nếu không có id (tức là đang tạo nhiệm vụ mới)
            }
            navigate('/');  // Điều hướng về trang danh sách nhiệm vụ sau khi thêm/cập nhật thành công
        } catch (error) {
            console.log(error); // Bắt lỗi nếu quá trình thêm/cập nhật gặp vấn đề
        }
    };

    // Hàm xử lý khi người dùng nhấn nút "Back"
    const handleBack = () => {
        navigate('/');  // Điều hướng về trang danh sách nhiệm vụ mà không lưu thông tin
    };

    // Trả về các state và hàm cần thiết để sử dụng trong component TaskForm
    return {
        title,             // Tiêu đề của nhiệm vụ
        setTitle,          // Hàm để thay đổi tiêu đề nhiệm vụ
        description,       // Mô tả của nhiệm vụ
        setDescription,    // Hàm để thay đổi mô tả nhiệm vụ
        dueDate,           // Ngày và thời gian đến hạn
        setDueDate,        // Hàm để thay đổi ngày và thời gian đến hạn
        handleSubmit,      // Hàm xử lý khi submit form
        handleBack,        // Hàm xử lý khi nhấn nút quay lại
        id                 // ID nhiệm vụ để biết khi nào đang chỉnh sửa nhiệm vụ hiện có
    };
};
