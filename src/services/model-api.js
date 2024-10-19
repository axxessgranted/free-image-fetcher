import axios from "axios";

export const fetchImages = async (
  prompt
) => {
  const config = {
    headers: {
      "Authorization": `${process.env.REACT_APP_KEY}`,
      "Content-Type": "application/json",
    },
    params: {
      query: prompt
    }
  };

  try {
    const response = await axios.get("https://api.pexels.com/v1/search", config);

    console.log(response);
    const originalImageUrl = response.data.photos[0].src.original
    return originalImageUrl;
  } catch (error) {
    console.error("Error while fetching img", error);
  }
};
