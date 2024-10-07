import React from 'react';
import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';

export function ModalOverlay({ children }) {
  return (
    <div className='fixed top-0 left-0 flex justify-center w-full h-screen bg-gray-400 bg-opacity-70 backdrop-blur-sm z-[1000] transition-all duration-500 overflow-auto pb-2'>
      {children}
    </div>
  );
}

function Modal({ children, closeModal }) {
  const ref = useOutsideClick(closeModal, true);
  return (
    <ModalOverlay>
      <div ref={ref} className='transition-all duration-500 h-auto w-max py-8'>
        {children}
      </div>
    </ModalOverlay>
  );
}

export default Modal;
