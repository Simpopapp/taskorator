import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Implementation for file upload
      toast({
        title: "Sucesso",
        description: "Arquivo enviado para processamento",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload de Arquivo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="file-upload"
            className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          >
            {file ? (
              <div className="flex items-center gap-2">
                <File className="w-6 h-6 text-primary" />
                <span className="text-sm">{file.name}</span>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Arraste um arquivo ou clique para selecionar
                </span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".txt,.doc,.docx"
            />
          </label>
          {file && (
            <Button onClick={handleUpload} className="w-full">
              Enviar Arquivo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;