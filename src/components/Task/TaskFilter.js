import React from 'react';

const TaskFilter = ({ filter, setFilter }) => {
    return (
        // Dropdown select để lọc các task dựa trên trạng thái
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="All">All</option> {/* Lựa chọn hiển thị tất cả task */}
            <option value="Completed">Completed</option> {/* Lựa chọn chỉ hiển thị task đã hoàn thành */}
            <option value="Pending">Pending</option> {/* Lựa chọn chỉ hiển thị task chưa hoàn thành */}
        </select>
    );
};

export default TaskFilter; // Xuất component TaskFilter
