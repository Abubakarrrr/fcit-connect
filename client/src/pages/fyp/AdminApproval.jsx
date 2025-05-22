import { useState, useEffect } from "react";
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
  const {
    sudo_approveProject,
    sudo_rejectProject,
    sudo_getSingleProject,
  } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Fetch project on mount and after approve/reject
  const fetchProject = async () => {
    setFetching(true);
    try {
      const data = await sudo_getSingleProject(id);
      setProject(data);
      setFeedback(""); // Optionally clear feedback after action
    } catch (error) {
      toast({ title: "Error fetching project" });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, [id]);

  const handleReject = async () => {
    setIsLoading(true);
    try {
      await sudo_rejectProject(id, feedback);
      toast({ title: "Project Rejected by Admin" });
      await fetchProject();
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
      toast({ title: "Project Approved" });
      await fetchProject();
    } catch (error) {
      console.error("Error Approving FYP:", error);
      toast({ title: "Error Approving FYP" });
    } finally {
      setIsLoading(false);
    }
  };

  // Badge color based on status
  const getStatusBadge = (status) => {
    let color = "bg-gray-400";
    let text = "Pending";
    if (status === "Approved") {
      color = "bg-green-600";
      text = "Approved";
    } else if (status === "Rejected") {
      color = "bg-red-600";
      text = "Rejected";
    }
    return (
      <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${color}`}
      >
        {text}
      </span>
    );
  };

  if (fetching) {
    return <div className="w-full my-2"><CardContent>Loading...</CardContent></div>;
  }

  return (
    <div className="w-full my-2">
      <CardContent className="flex items-center justify-between gap-4">
        {/* Status Badge */}
        <div className="flex flex-col gap-2 items-start w-1/5 min-w-[120px]">
          <div>
            {project && getStatusBadge(project.status)}
          </div>
          {project && project.feedback && (
            <div className="text-xs text-muted-foreground mt-1">
              Last Feedback: {project.feedback}
            </div>
          )}
        </div>
        {/* Feedback Input */}
        <Textarea
          placeholder="Provide feedback for approval/rejection..."
          className="flex-1 bg-white resize-none rounded-lg border-2 text-sm border-muted focus:ring-2 focus:ring-primary"
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
