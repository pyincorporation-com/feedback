import { useEffect, useState } from "react";
import "./App.css";
import OpinionImg from "./assets/images/broadcast.png";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/index.css";
import { useSocket } from "./hooks/useSocket";
import { useInitialData } from "./hooks/useInitialData";
import Loader from "./Loader";
import QuestionContainer from "./components/QuestionContainer";
import { useChartValues } from "./contexts/chartValuesProvider";

function App() {
  const [clicked, setClicked] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [loadAnswered, setLoadAnswered] = useState<boolean>(false);
  const { packageId, feedbackQuestion, setFeedbackQuestion } = useInitialData();
  const { setChartValues } = useChartValues()
  const { chatSocket, sendResponse } = useSocket(packageId, setHasAnswered, setLoadAnswered, setChartValues);

  const handleClick = (answer: string) => {
    setClicked(answer);
    setTimeout(() => {
      setClicked(null);
      if (feedbackQuestion) {
        sendResponse({
          question: feedbackQuestion.question_text,
          question_id: feedbackQuestion.question_id,
          answer,
        });
      }
    }, 1000);
  };
  console.log("feedbackQuestion || !chatSocket || chatSocket.readyState !== WebSocket.OPEN || !loadAnswered", feedbackQuestion, chatSocket, loadAnswered)
  if (!chatSocket || chatSocket.readyState !== WebSocket.OPEN || !loadAnswered) {
    return <Loader />;
  }

  return (
    <div className="container d-flex justify-content-between align-items-center">
      {feedbackQuestion ?
        <QuestionContainer
          feedbackQuestion={feedbackQuestion}
          hasAnswered={hasAnswered}
          handleClick={handleClick}
          clicked={clicked}
        /> : <div>
          <h1>Hello, it seem we have no question to pause now!</h1></div>}

      <img src={OpinionImg} className="img-fluid img-mid" alt="Broadcast" />
    </div>
  );
}

export default App;
