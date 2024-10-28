import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar a gravação",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Implementation for stopping recording
  };

  const handleUpload = () => {
    if (audioBlob) {
      // Implementation for uploading audio
      toast({
        title: "Sucesso",
        description: "Áudio enviado para processamento",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex justify-center gap-4">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="lg"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isRecording ? "Parar" : "Gravar"}
          </Button>
          {audioBlob && (
            <Button variant="outline" size="lg" onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Enviar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;