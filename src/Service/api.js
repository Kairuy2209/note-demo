import axios from 'axios';

// URL cơ bản của API, trỏ đến máy chủ đang chạy tại localhost, cổng 5000
const API_URL = 'http://localhost:5000/tasks';// json-server --watch db.json --port 5000

// Phương thức fetchTasks: Lấy tất cả các task từ API
export const fetchTasks = () => {
    return axios.get(API_URL);
};

// Phương thức getTask: Lấy thông tin chi tiết của một task dựa trên ID
export const getTask = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Phương thức addTask: Thêm một task mới vào cơ sở dữ liệu
export const addTask = (task) => {
    return axios.post(API_URL, task);
};

// Phương thức updateTask: Cập nhật thông tin của một task dựa trên ID
export const updateTask = (id, task) => {
    return axios.put(`${API_URL}/${id}`, task);
};

// Phương thức deleteTask: Xóa một task dựa trên ID
export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};
