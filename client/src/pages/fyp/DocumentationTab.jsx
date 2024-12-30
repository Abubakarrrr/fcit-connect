import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Download, Eye } from 'lucide-react'



export default function Documentation({ 
  fileName, 
  fileSize, 
  fileUrl,
  uploadDate 
}) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* PDF Preview Section */}
          <div className="relative bg-gray-50 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
            <FileText className="w-16 h-16 text-gray-400 mb-4" />
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{fileName}</h3>
              <p className="text-sm text-muted-foreground">
                {fileSize} • Uploaded on {uploadDate}
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex-1 gap-2" 
              onClick={() => window.open(fileUrl, '_blank')}
            >
              <Eye className="w-4 h-4" />
              Preview Document
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1 gap-2"
              onClick={() => {
                const link = document.createElement('a')
                link.href = fileUrl
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

