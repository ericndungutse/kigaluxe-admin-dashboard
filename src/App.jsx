import { Navigate, Route, Routes } from 'react-router-dom';
import AccountLayout from './features/account/AccountLayout';
import Login from './pages/Login';
import Properties from './pages/Properties';
import Locations from './pages/Locations';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Appointments from './pages/Appointments';
import Blogs from './pages/blogs';

function App() {
  return (
    <>
      <Routes>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<Navigate replace to='properties' />} />
          <Route path='properties' element={<Properties />} />
          <Route path='locations' element={<Locations />} />
          <Route path='categories' element={<Categories />} />
          <Route path='users' element={<Users />} />
          <Route path='appointments' element={<Appointments />} />
          <Route path='blogs' element={<Blogs />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
