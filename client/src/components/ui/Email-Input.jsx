import React from "react";
import { Input } from "@/components/ui/input"; 
import { Mail } from "lucide-react"; 

const EmailInput = ({ value, onChange, ...props }) => {
  return (
    <div className="">
      <div className="relative">

        <Input
          className="peer pe-9"
          type="email"
          value={value} 
          onChange={onChange}
          {...props} 
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Mail size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default EmailInput;
