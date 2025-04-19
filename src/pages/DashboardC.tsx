import { Routes, Route } from 'react-router-dom';
import Layout from './dashboard/dashboardcomponents/Layout';
import Dashboard from './dashboard/Dashboard';
import Users from './dashboard/Users';
import Pricing from './dashboard/Pricing';
import React from 'react';

function DashboardC() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}

export default DashboardC;
