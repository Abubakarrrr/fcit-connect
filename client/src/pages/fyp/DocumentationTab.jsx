import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { FileText, Download, Eye } from "lucide-react";

export default function Documentation({ documentation, title, name }) {
  if (!documentation || !name) {
    return null;
  }
 
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* PDF Preview Section */}
          <div className="relative bg-gray-50 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Uploaded by {name}
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1 gap-2"
              onClick={() => window.open(documentation, "_blank")}
            >
              <Eye className="w-4 h-4" />
              Preview Document
            </Button>
            <Button
              variant="secondary"
              className="flex-1 gap-2"
              onClick={() => {
                if (!documentation) {
                  alert("No file available for download");
                  return;
                }
                const link = document.createElement("a");
                link.href = documentation;
                link.download = title || "download";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
