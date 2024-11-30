import React from "react";
import "./CustomBigButton.css";

interface CustomButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  description: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  onClick,
  isActive,
  description,
}) => {
  return (
    <div
      className={`custom-button ${isActive ? "active" : "inactive"}`}
      onClick={isActive ? onClick : undefined}
    >
      {icon && <div className="button-icon">{icon}</div>}
      <div className="button-label">{label}</div>
      {description && <div className="custom-button-desc">{description}</div>}
    </div>
  );
};

export default CustomButton;
