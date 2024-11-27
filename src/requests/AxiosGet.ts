import axios from "axios";

const fetchData = async (
  url: string,
  setToken: (token: string) => void
) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
      },
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
    return { status: false, error: error };
  }
};

export default fetchData;
