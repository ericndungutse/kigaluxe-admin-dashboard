import React, { useState } from 'react';
import { HiEllipsisVertical, HiEye, HiPencil, HiTrash } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

export default function DropDownManue() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseMenu = () => setIsOpen(false);
  const ref = useOutsideClick(handleCloseMenu, true);
  const handleClick = () => {
    setIsOpen((curr) => !curr);
  };

  return (
    <nav className='w-fit relative z-50'>
      <button
        className={`group p-1 w-fit  rounded transition-all cursor-pointer duration-400 hover:bg-primary-light hover:text-white ${
          isOpen && 'bg-primary-light parent text-white'
        }`}
        onClick={handleClick}
      >
        <HiEllipsisVertical
          className={`h-[1.5rem] w-[1.5rem] group-hover:text-primary-color ${isOpen && 'text-primary-color'}`}
        />
      </button>

      {isOpen && (
        <ul
          className='bg-white rounded z-40 shadow-xl drop-shadow-xl border flex flex-col w-48 absolute top-[80%] right-9 py-2'
          ref={ref}
        >
          <li className='group  hover:bg-primary-light hover:text-white'>
            <button className='px-6 py-3 size-full text-start  flex items-center gap-2'>
              <HiEye className='size-[1rem] text-gray-400 group-hover:text-white' /> Details
            </button>
          </li>
          <li className='group hover:bg-primary-light hover:text-white'>
            <button className='px-6 py-3 size-full text-start  flex items-center gap-2'>
              <HiPencil className='size-[1rem] text-gray-400 group-hover:text-white' /> Update
            </button>
          </li>
          <li className='group hover:bg-primary-light hover:text-white'>
            <button className='px-6 py-3 size-full text-start flex items-center gap-2'>
              <HiTrash className='size-[1rem] text-gray-400 group-hover:text-white' />
              Delete
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}
