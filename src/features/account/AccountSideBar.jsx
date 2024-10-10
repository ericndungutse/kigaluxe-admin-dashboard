import React from 'react';
import Logo from '../../components/Logo';
import AccountMainNav from './AccountMainNav';

export default function AccountAsideBar() {
  return (
    <aside className='flex bg-white flex-col h-full basis-[14rem] border-r py-4 px-6'>
      <div className='flex py-3 flex-col items-center justify-center border-b mb-5'>
        <Logo />
        <h3 className='text-lg font-semibold mt-2 uppercase tracking-widest'>Kigaluxe</h3>
      </div>

      <AccountMainNav />
    </aside>
  );
}
