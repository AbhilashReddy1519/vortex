import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean,
  children: React.ReactNode
}

function Modal({isOpen, children}: Props) {
  if(!isOpen) return null;

  return (
    createPortal(
      <div className='fixed inset-0 bg-white/10 flex justify-center items-center'>
        {children}
      </div>,
      document.body
    )
  )
}

export default Modal;