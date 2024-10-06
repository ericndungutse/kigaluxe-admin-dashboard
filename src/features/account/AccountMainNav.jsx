import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiDetour } from 'react-icons/gi';
import { HiCalendarDays, HiOutlineCog6Tooth, HiOutlineUsers } from 'react-icons/hi2';

export default function AccountMainNav() {
  return (
    <nav className='text-gray-500 flex flex-col gap-4'>
      <NavLink
        to='tours'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary-light hover:text-white transition-all duration-400'
      >
        <GiDetour className='size-[1.5rem] text-gray-400 group-hover:text-white transition-all duration-400 aria-[current=page]:text-primary' />{' '}
        <span className='text-base'>Tours</span>
      </NavLink>
      <NavLink
        to='bookings'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary-light hover:text-white transition-all duration-400'
      >
        <HiCalendarDays className='size-[1.5rem] text-gray-400 group-hover:text-white transition-all duration-400' />{' '}
        <span className='text-base'>Bookings</span>
      </NavLink>
      <NavLink
        to='users'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary-light hover:text-white transition-all duration-400'
      >
        <HiOutlineUsers className='size-[1.5rem] text-gray-400 group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Users</span>
      </NavLink>
      <NavLink
        to='settings'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary-light hover:text-white transition-all duration-400'
      >
        <HiOutlineCog6Tooth className='size-[1.5rem] text-gray-400 group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Settings</span>
      </NavLink>
    </nav>
  );
}
