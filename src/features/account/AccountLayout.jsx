import React from 'react';

import { Outlet } from 'react-router-dom';
import AccountAsideBar from './AccountSideBar';

export default function AccountLayout() {
  return (
    <section className='bg-white w-screen h-screen flex'>
      <AccountAsideBar />
      <main className='bg-white flex-1 h-full flex flex-col'>
        {/* <header className='py-1.2rem px-4 bg-white border-b'>Header</header> */}
        <div className='overflow-auto pt-12 px-10 pb-32'>
          <Outlet />
        </div>
      </main>
    </section>
  );
}
