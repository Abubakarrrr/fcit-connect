import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function FormTextarea({ label, error, ...props }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Textarea {...props} />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

