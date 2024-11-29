import React, { ReactNode } from "react";


const Layout = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-2 sm:px-8 lg:px-16 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Layout;