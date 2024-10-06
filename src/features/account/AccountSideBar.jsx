import React from 'react';
import AccountMainNav from './AccountMainNav';
import Logo from '../../components/Logo';
import Heading from '../../components/Heading';

export default function AccountAsideBar() {
  return (
    <aside className='flex bg-white flex-col h-full basis-[14rem] border-r py-4 px-6'>
      <div className='flex py-3 flex-col items-center justify-center border-b mb-5'>
        <Logo />
        <h3 className='text-lg font-semibold mt-2 uppercase tracking-widest'>Kigaluxe</h3>
      </div>

      <AccountMainNav />

      <footer className='mt-auto'>
        <p className='text-sm text-center text-gray-400'>&copy; Copyright AdTours 2024 All rights reserved</p>
      </footer>
    </aside>
  );
}
