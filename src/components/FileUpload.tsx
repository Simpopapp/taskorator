import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "text/plain" || selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, selecione um arquivo .txt ou .pdf",
          variant: "destructive",
        });
      }
    }
  };

  const processFileWithAI = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulated file processing with progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(i);
      }

      // Replace with actual Azure Form Recognizer or similar API call
      const response = await fetch("/api/process-document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha no processamento do arquivo");

      const data = await response.json();
      
      toast({
        title: "Arquivo processado",
        description: "Informações extraídas com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Não foi possível processar o arquivo",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsProcessing(true);
      await processFileWithAI(file);
    }
  };

  return (
    <Card className="w-full">
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
                  Arraste um arquivo .txt ou .pdf ou clique para selecionar
                </span>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".txt,.pdf"
            />
          </label>
          {isProcessing && (
            <div className="w-full space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-gray-500">
                Processando arquivo... {progress}%
              </p>
            </div>
          )}
          {file && !isProcessing && (
            <Button onClick={handleUpload} className="w-full">
              Processar Arquivo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;