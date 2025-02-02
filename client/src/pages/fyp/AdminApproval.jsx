
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProjectApprovalCard() {
  const [feedback, setFeedback] = useState("");

  return (
    <Card className="my-16 w-full max-w-lg mx-auto rounded-2xl shadow-lg border border-muted bg-background">
      <CardHeader className="text-xl font-semibold text-center">
        Project Approval
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Provide feedback for approval/rejection..."
          className="min-h-[120px] resize-none rounded-lg p-3 text-sm border-muted focus:ring-2 focus:ring-primary"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-3">
        <Button
          variant="destructive"
          className={cn(
            "flex items-center gap-2 px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-all"
          )}
        //   onClick={() => onReject(feedback)}
        >
          <X size={18} />
          Reject
        </Button>
        <Button
          variant="default"
          className={cn(
            "flex items-center gap-2 px-6 py-2 text-white bg-green-600 hover:bg-green-700 transition-all"
          )}
        //   onClick={() => onApprove(feedback)}
        >
          <Check size={18} />
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}
