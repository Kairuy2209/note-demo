import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskHeader = ({ searchTerm, setSearchTerm, toggleCalendar, showCalendar, setDate, date, tileClassName }) => {
    return (
        <div className="add-task-container">
            <Link to="/add" className="add-task-icon">
                <FaPlus size={24} />
            </Link>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="calendar-icon" onClick={toggleCalendar}>
                <FaCalendarAlt size={24} />
            </div>

            {showCalendar && (
                <>
                    {/* Phần nền mờ */}
                    <div className="overlay" onClick={toggleCalendar}></div>

                    {/* Calendar Modal */}
                    <div className="calendar-modal">
                        <Calendar
                            onChange={setDate}
                            value={date}
                            tileClassName={tileClassName}
                            className="calendar"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskHeader;
