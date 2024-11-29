import { PieChartValues } from "../type";
import { setSocketConnection } from "./socketConnection";

export const socketHandler = (
  packageId: string,
  chatSocket: WebSocket,
  setChatSocket: (socket: WebSocket | null) => void,
  setHasAnswered: (hasAnswered: boolean) => void,
  setLoadAnswered: (loadAnswered: boolean) => void,
  setChartValues: React.Dispatch<React.SetStateAction<PieChartValues[] | null>>
) => {
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const initialReconnectDelay = 10000;
  let isAttemptingReconnect = false;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  chatSocket.onclose = async () => {
    console.info("WebsSocket was closed");
    if (
      navigator.onLine &&
      !isAttemptingReconnect &&
      reconnectAttempts < maxReconnectAttempts
    ) {
      reconnectAttempts++;
      isAttemptingReconnect = true;
      console.info(
        `Reconnection attempt: ${reconnectAttempts} of ${maxReconnectAttempts}`
      );

      const delayTime = initialReconnectDelay * reconnectAttempts;
      console.info(`Attempting to reconnect in ${delayTime / 1000} seconds...`);
      await delay(delayTime);

      try {
        setChatSocket(null);
        setSocketConnection(packageId, chatSocket, setChatSocket);
      } catch (error) {
        console.error("Reconnection failed:", error);
      } finally {
        isAttemptingReconnect = false;
      }
    } else if (reconnectAttempts >= maxReconnectAttempts) {
      console.warn(
        "Max reconnect attempts reached. Stopping reconnection attempts."
      );
      setChatSocket(null);
    }
  };

  const updateChartValues = (label: string, value: number) => {
    setChartValues((prevState) => {
      const currentValues = prevState || [];

      const existingIndex = currentValues.findIndex(
        (item) => item.label === label
      );

      if (existingIndex !== -1) {
        const updatedValues = [...currentValues];
        updatedValues[existingIndex] = {
          ...updatedValues[existingIndex],
          value,
        };
        return updatedValues;
      }

      return [...currentValues, { label, value }];
    });
  };

  if (chatSocket.readyState === WebSocket.OPEN) {
    chatSocket.onmessage = async (event) => {
      try {
        const message = JSON.parse(event.data);

        var content = message.content;
        switch (message.action) {
          case "answer_check":
            setHasAnswered(message.data);
            setLoadAnswered(true);
            break;
          case "feedback_response":
            var label = content.answer;
            var value = content.count;
            updateChartValues(label, value);
            break;
          default:
            console.warn("Unknown message action:", message.action);
        }
      } catch (error) {
        console.error("Error handling message:", error);
      }
    };
  }
};
