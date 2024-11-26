import React from "react";
import "./CustomBigButton.css";

interface CustomButtonProps {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    isActive: boolean;
  }

const CustomButton:React.FC<CustomButtonProps> = ({ label, icon, onClick, isActive }) => {
  return (
    <div
      className={`custom-button ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {icon && <div className="button-icon">{icon}</div>}
      <div className="button-label">{label}</div>
    </div>
  );
};

export default CustomButton;
