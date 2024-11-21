import React from "react";

type Props = {
  message: string;
  onClose: () => void;
};

function Alert({ message, onClose }: Props) {
  return (
    <div className="flex gap-2 rounded-lg border border-red-600 p-2 align-baseline">
      <div>{message}</div>
      <div className="hover:cursor-pointer" onClick={onClose}>
        X
      </div>
    </div>
  );
}

export default Alert;
