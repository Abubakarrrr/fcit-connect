import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SimpleSelect({
  labelText,
  placeholderText,
  items,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor="dynamic-select">{labelText}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="dynamic-select">
          <SelectValue placeholder={placeholderText} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
