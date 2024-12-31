import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FormInput({ label, error, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

