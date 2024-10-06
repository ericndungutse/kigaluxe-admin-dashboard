import { useState } from 'react';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import AccountLayout from './features/account/AccountLayout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route>
          <Route path='/account' element={<AccountLayout />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
