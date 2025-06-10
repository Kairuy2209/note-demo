import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask, addTask, updateTask } from '../../Service/api';

// Schema validation
const schema = yup.object().shape({
    title: yup.string().required('⚠️ Ô tiêu đề là bắt buộc'),
    description: yup.string().required('❗Ô mô tả là bắt buộc'),
    dueDate: yup.string()
        .required('🗓️ Ngày hết hạn không hợp lệ')
});

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            dueDate: ''  // Tránh giá trị null
        }
    });

    // Load task nếu có id (chế độ Edit)
    useEffect(() => {
        const loadTask = async () => {
            if (id) {
                try {
                    setIsLoading(true);
                    const response = await getTask(id);
                    setValue('title', response.data.title || '');
                    setValue('description', response.data.description || '');
                    setValue('dueDate', response.data.dueDate ? response.data.dueDate.substring(0, 16) : '');
                } catch (error) {
                    console.error(error);
                    setAlertMessage({ type: 'error', text: 'Không thể tải note. Vui lòng thử lại.' });
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadTask();
    }, [id, setValue]);

    // Xử lý submit
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            if (id) {
                await updateTask(id, data);
                setAlertMessage({ type: 'success', text: 'Cập nhật note thành công!' });
            } else {
                await addTask(data);
                setAlertMessage({ type: 'success', text: 'Thêm note thành công!' });
            }
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error(error);
            setAlertMessage({ type: 'error', text: 'Không thể lưu nhiệm vụ. Vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };

    // Nút quay lại
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="task-form-container">
            <h1 className="form-title">{id ? 'EDIT TASK' : 'ADD TASK'}</h1>

            {alertMessage && (
                <div className={`alert ${alertMessage.type === 'error' ? 'alert-error' : 'alert-success'}`}>
                    {alertMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="task-form">
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Tiêu đề </label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                id="title"
                                placeholder="Nhập tiêu đề"
                                className={`form-input ${errors.title ? 'input-error' : ''}`}
                            />
                        )}
                    />
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="description"
                                placeholder="Nhập mô tả"
                                rows="4"
                                className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                            />
                        )}
                    />
                    {errors.description && <p className="error-message">{errors.description.message}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate" className="form-label">Ngày hết hạn</label>
                    <Controller
                        name="dueDate"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="datetime-local"
                                id="dueDate"
                                className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
                            />
                        )}
                    />
                    {errors.dueDate && <p className="error-message">{errors.dueDate.message}</p>}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="back-button"
                    >
                        Quay lại
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`submit-button ${isLoading ? 'loading' : ''}`}
                    >
                        {isLoading ? 'Đang lưu...' : (id ? 'Cập nhật' : 'Thêm')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
