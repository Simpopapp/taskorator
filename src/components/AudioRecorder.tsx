import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
        await processAudioWithAI(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      
      toast({
        title: "Gravação iniciada",
        description: "Fale as informações da tarefa claramente",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível iniciar a gravação",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const processAudioWithAI = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Simulated API call - replace with actual OpenAI Whisper API integration
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await fetch("/api/process-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Falha no processamento do áudio");

      const data = await response.json();
      
      toast({
        title: "Áudio processado com sucesso",
        description: "Nova tarefa criada a partir do áudio",
      });
    } catch (error) {
      toast({
        title: "Erro no processamento",
        description: "Não foi possível processar o áudio",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
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
            disabled={isProcessing}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Parar
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Gravar
              </>
            )}
          </Button>
          {isProcessing && (
            <Button variant="outline" size="lg" disabled>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processando
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;