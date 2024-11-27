export const setSocketConnection = (
  packageId: string,
  chatSocket: WebSocket | null,
  setChatSocket: (socket: WebSocket) => void
) => {
  const ws_scheme = window.location.protocol === "https:" ? "wss" : "ws";

  if (!chatSocket || chatSocket.readyState === WebSocket.CLOSED) {
    const ws_path = `${ws_scheme}://wss.pyincorporation.com/namespace/?id=${packageId}`;
    const sock = new WebSocket(ws_path);

    sock.onopen = () => {
      console.info("WebSocket connection established.");
      setChatSocket(sock);
    };

    sock.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }
};
