import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movies from '../views/Movies'
import SingleMovie from '../views/SingleMovie';

const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<SingleMovie />} />
      </Routes>
  );
};

export default AppRoutes;
