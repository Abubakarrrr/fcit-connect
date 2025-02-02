import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
      toast({ title: "Project Rejected by Admin" });
    } catch (error) {
      console.error("Error Rejecting FYP:", error);
      toast({ title: "Error Rejecting FYP" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      await sudo_approveProject(id, feedback);
      navigate("/admin/fyps");
      toast({ title: "Project Approved" });
    } catch (error) {
      console.error("Error Approving FYP:", error);
      toast({ title: "Error Approving FYP" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" w-full my-2">
      <CardContent className="flex items-center justify-between gap-4">
        {/* Feedback Input */}
        <Textarea
          placeholder="Provide feedback for approval/rejection..."
          className="flex-1 bg-white   resize-none rounded-lg  border-2 text-sm border-muted focus:ring-2 focus:ring-primary"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="destructive"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 transition-all"
            onClick={handleReject}
            disabled={isLoading}
          >
            <X size={18} />
            Reject
          </Button>
          <Button
            variant="default"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 transition-all"
            onClick={handleApprove}
            disabled={isLoading}
          >
            <Check size={18} />
            Approve
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
