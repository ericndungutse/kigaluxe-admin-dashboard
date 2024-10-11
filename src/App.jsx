import { Navigate, Route, Routes } from 'react-router-dom';
import AccountLayout from './features/account/AccountLayout';
import Login from './pages/Login';
import Properties from './pages/Properties';
import Locations from './pages/Locations';
import Categories from './pages/Categories';

function App() {
  return (
    <>
      <Routes>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Navigate replace to='properties' />} />
          <Route path='properties' element={<Properties />} />
          <Route path='locations' element={<Locations />} />
          <Route path='categories' element={<Categories />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
