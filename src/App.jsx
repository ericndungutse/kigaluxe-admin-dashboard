import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountLayout from './features/account/AccountLayout';
import Login from './pages/Login';
import Properties from './pages/Properties';

function App() {
  return (
    <>
      <Routes>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Navigate replace to='properties' />} />
          <Route path='properties' element={<Properties />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
