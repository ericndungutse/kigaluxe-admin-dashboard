import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountLayout from './features/account/AccountLayout';
import Login from './pages/Login';
import Properties from './pages/Properties';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Properties />} />
          <Route path='properties' element={<Properties />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
