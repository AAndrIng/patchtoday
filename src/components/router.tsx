// src/router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import HistoryPage from './History/HistoryPage';
import AdminPanel from './Admin/AdminPanel';
import NotFound from '../pages/NotFound';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
