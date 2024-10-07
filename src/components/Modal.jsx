import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

export function ModalOverlay({ children }) {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-gray-400 bg-opacity-70 backdrop-blur-sm z-[1000] transition-all duration-500'>
      {children}
    </div>
  );
}

function Modal({ children, closeModal }) {
  const ref = useOutsideClick(closeModal, true);
  return (
    <ModalOverlay>
      <div
        ref={ref}
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-lg shadow-lg p-8 transition-all duration-500'
      >
        <button
          onClick={closeModal}
          className='bg-none border-none p-1 rounded-sm translate-x-2 transition-all duration-200 absolute top-3 right-[1.9rem]'
        >
          <HiXMark />
        </button>
        {children}
      </div>
    </ModalOverlay>
  );
}

export default Modal;
