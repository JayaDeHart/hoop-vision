"use client";

import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      ></div>
      <div
        className={`z-10 rounded-lg bg-white p-8 shadow-lg ${
          width ? `w-full max-w-${width}` : "w-full max-w-4xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
