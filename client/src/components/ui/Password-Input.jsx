import { useState } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
    className = "",
    value = "",
    onChange,
    placeholder = "Enter your password",
    name = "",
    id = "",
    ...props
  }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  
    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            className={`pe-9 ${className}`}
            type={isVisible ? "text" : "password"}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
          />
          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls={id}
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    );
  };
  export default PasswordInput;