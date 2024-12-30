// Dependencies: pnpm install lucide-react
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Dropdown({trigger,list,handleSelect,selected}) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div>
            {trigger}
        </div>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
             {selected || trigger}
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
           {list.map((item,index)=><DropdownMenuItem key={index} onClick={() => handleSelect(item)}>{item}</DropdownMenuItem>)}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    );
  }
  