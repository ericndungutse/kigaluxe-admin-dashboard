import React from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBlog } from 'react-icons/fa6';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { TbLocationCheck } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa6';
import { PiUsersBold } from 'react-icons/pi';

export default function AccountMainNav() {
  return (
    <nav className='text-primary flex flex-col gap-4'>
      <NavLink
        to='properties'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <MdOutlineRealEstateAgent className='size-[1.5rem]  group-hover:text-white transition-all duration-400 aria-[current=page]:text-primary' />{' '}
        <span className='text-base'>Properties</span>
      </NavLink>
      <NavLink
        to='categories'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <BiCategoryAlt className='size-[1.5rem] group-hover:text-white transition-all duration-400' />{' '}
        <span className='text-base'>Categories</span>
      </NavLink>
      <NavLink
        to='appointments'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <FaRegClock className='size-[1.5rem] group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Appointments</span>
      </NavLink>
      {/* <NavLink
        to='users'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <PiUsersBold className='size-[1.5rem] group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Users</span>
      </NavLink> */}
      <NavLink
        to='locations'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <TbLocationCheck className='size-[1.5rem] group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Locations</span>
      </NavLink>
      <NavLink
        to='settings'
        className='group px-2 py-1.5 rounded text-lg flex items-center gap-3 hover:bg-primary hover:text-white transition-all duration-400'
      >
        <FaBlog className='size-[1.5rem] group-hover:text-white transition-all duration-400' />
        <span className='text-base'>Blogs</span>
      </NavLink>
    </nav>
  );
}
