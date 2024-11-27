import { useState, useEffect } from "react";
import fetchData from "../requests/AxiosGet";
import { PieChartValues, Question } from "../type";
import { useToken } from "../contexts/tokenProvider";
import { useChartValues } from "../contexts/chartValuesProvider";

export const useInitialData = () => {
  const [packageId, setPackageId] = useState<string>("");
  const [feedbackQuestion, setFeedbackQuestion] = useState<Question | null>(
    null
  );
  const { setToken } = useToken();
  const { setChartValues } = useChartValues();

  useEffect(() => {
    const fetchInitialData = async () => {
      const tokenUrl = `${window.location.protocol}//auth0.pyincorporation.com/data`;
      const response1 = await fetchData(tokenUrl, setToken);
      if (response1 && response1.status) {
        const userUrl = `${window.location.protocol}//pycloud.pyincorporation.com`;
        const data = await fetchData(userUrl, setToken);
        if (data && data.status && data.response.status) {
          setPackageId(data.response.main_body.package_id);
        }
      }
    };

    fetchInitialData();
  }, [setToken]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const fetchUrl = `${window.location.protocol}//management.pyincorporation.com/questionares`;
      const response = await fetchData(fetchUrl, setToken);

      if (response && response.status && response.response.status) {
        var main_body = response.response.main_body;

        if (Object.entries(main_body).length > 0) {
          setFeedbackQuestion(main_body);
          var current_answers = main_body.question_answers;
          var formatedData: PieChartValues[] = [];
          current_answers.map((answer: any) => {
            formatedData.push({
              label: answer.answer,
              value: answer.answer_count,
            });
          });

          setChartValues(formatedData);
        }
      }
    };

    fetchQuestion();
  }, [setToken]);

  return { packageId, feedbackQuestion, setFeedbackQuestion };
};
