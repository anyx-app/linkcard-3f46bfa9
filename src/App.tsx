
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        {/* Future routes: /admin, /analytics, /:username */}
      </Route>
    </Routes>
  );
}
