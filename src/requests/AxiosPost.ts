import axios from "axios";
import fetchData from "./AxiosGet";

const postData = async (
  url: string,
  data: any,
  token: string,
  setToken: (token: string) => void
) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    setToken(response.data.csrf_token);
    return { status: true, response: response.data };
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      fetchData(
        `${window.location.protocol}//auth0.pyincorporation.com/data`,
        setToken
      );
    }
    return { status: false, error: error.message };
  }
};

export default postData;
