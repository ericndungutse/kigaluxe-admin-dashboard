import React from 'react';

import { Outlet } from 'react-router-dom';
import AccountAsideBar from './AccountSideBar';

export default function AccountLayout() {
  return (
    <section className='bg-white w-screen h-screen flex'>
      <AccountAsideBar />
      <main className='bg-[#f9fafb] flex-1 h-full flex flex-col'>
        <header className='py-6 px-4 bg-white border-b'>Header</header>
        <div className='overflow-auto py-8 px-14 h-full'>
          <Outlet />
        </div>
      </main>
    </section>
  );
}
