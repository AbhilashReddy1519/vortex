import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean,
  children: React.ReactNode,
  type: string
}

function Modal({isOpen, children, type}: Props) {
  if(!isOpen) return null;

  if(type === 'type1') {
    return (
      createPortal(
        <div className="fixed inset-0 bg-white/10 flex justify-center items-center">
          {children}
        </div>,
        document.body,
      )
    )
  }
  if(type === 'type2') {
    return (
      createPortal(
        <>
          {children}
        </>,
        document.body
      )
    )
  }
}

export default Modal;