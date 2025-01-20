import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function SelectWithSearch({
  labelText = "Select an option",
  items = [],
  emptyText = "No items found.",
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor="dynamic-select">{labelText}</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="dynamic-select"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
            >
              <span
                className={cn("truncate", !value && "text-muted-foreground")}
              >
                {value || labelText}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className="shrink-0 text-muted-foreground/80"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
            align="start"
          >
            <Command>
              <CommandInput
                placeholder={`Search ${labelText.toLowerCase()}...`}
              />
              <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                  {items.map((item, index) => (
                    <CommandItem
                      key={index}
                      value={item}
                      onSelect={() => {
                        onChange(item); // Notify parent of the selected value
                        setOpen(false); // Close the dropdown
                      }}
                    >
                      {item}
                      {value === item && (
                        <Check size={16} strokeWidth={2} className="ml-auto" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
