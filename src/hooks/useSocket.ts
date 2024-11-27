import { useState, useEffect } from "react";
import { setSocketConnection } from "../utils/socketConnection";
import { socketHandler } from "../utils/socketHandler";
import { AnswerFormat, PieChartValues } from "../type";

export const useSocket = (
  packageId: string,
  setHasAnswered: (answered: boolean) => void,
  setLoadAnswered: (loaded: boolean) => void,
  setChartValues: React.Dispatch<React.SetStateAction<PieChartValues[] | null>>
) => {
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (packageId) {
      setSocketConnection(packageId, chatSocket, setChatSocket);
    }
  }, [packageId]);

  useEffect(() => {
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      socketHandler(
        packageId,
        chatSocket,
        setChatSocket,
        setHasAnswered,
        setLoadAnswered,
        setChartValues
      );
    }
  }, [chatSocket, packageId, setHasAnswered, setLoadAnswered]);

  const sendResponse = (answer: AnswerFormat) => {
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      chatSocket.send(
        JSON.stringify({
          state: "broadcast",
          action: "feedback",
          content: answer,
        })
      );
    }
  };

  return { chatSocket, sendResponse };
};
