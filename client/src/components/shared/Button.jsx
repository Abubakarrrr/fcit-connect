import React from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';


const Button= ({
  to,
  icon: Icon,
  text,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: {
      textColor: "text-white",
      bgColor: "bg-primary",
      iconBgColor: "bg-white",
      iconColor: "text-primary",
    },
    secondary: {
      textColor: "text-white",
      bgColor: "bg-secondary",
      iconBgColor: "bg-white",
      iconColor: "text-primary",
    },
    whitePrimary: {
      textColor: "text-primary",
      bgColor: "bg-white",
      iconBgColor: "bg-primary",
      iconColor: "text-white",
    },
  };

  const { textColor, bgColor, iconBgColor, iconColor } = variants[variant];

  return (
    <Link
      to={to}
      className={`inline-flex items-center ${bgColor} ${textColor} px-1 rounded-full font-medium hover:bg-opacity-90 transition py-1 ${className}`}
      {...props}
    >
      <div className={`flex items-center justify-center ${iconBgColor} rounded-full w-10 h-10`}>
        {Icon && <Icon className={`${iconColor}`} />}
      </div>
      <span className="px-2">{text}</span>
    </Link>
  );
};

export default Button;