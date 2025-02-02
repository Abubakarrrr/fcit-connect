import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ProjectApprovalCard({ id }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const { sudo_approveProject, sudo_rejectProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const handleReject = async () => {
    setIsLoading(true);
    try {
      await sudo_rejectProject(id, feedback);
      navigate("/admin/fyps");
      toast({
        title: "Project Rejected by Admin",
        description: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error Rejecting FYP:", error);
      toast({
        title: "Error Rejecting FYP",
        description: "",
      });
    }
  };
  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await sudo_approveProject(id, feedback);
      navigate("/admin/fyps");
      toast({
        title: "Project Approved",
        description: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error Approvng FYP:", error);
      toast({
        title: "Error Approvng FYP",
        description: "",
      });
    }
  };

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
          onClick={handleReject}
          disabled={isLoading}
        >
          <X size={18} />
          Reject
        </Button>
        <Button
          variant="default"
          className={cn(
            "flex items-center gap-2 px-6 py-2 text-white bg-green-600 hover:bg-green-700 transition-all"
          )}
          onClick={handleApprove}
          disabled={isLoading}
        >
          <Check size={18} />
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
}
