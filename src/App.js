import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskList from './components/Task/taskList';
import TaskForm from './components/Task/taskForm';
import TaskDetail from './components/Task/taskDetail';
import BlossomFall from './components/Task/BlossomFall';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <BlossomFall />  {/* Thêm hiệu ứng hoa mai rơi ở đây */}
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
