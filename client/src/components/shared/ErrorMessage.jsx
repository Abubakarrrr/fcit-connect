const ErrorMessage = ({ message, className = "", ...props }) => {
    if (!message) return null;
  
    return (
      <p className={`text-sm text-red-500 ${className}`} {...props}>
        * {message}
      </p>
    );
  };
  
  export default ErrorMessage;
    