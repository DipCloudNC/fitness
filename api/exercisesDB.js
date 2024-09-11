import axios from "axios";

const baseUrl = "https://exercisedb.p.rapidapi.com";

const allowedBodyParts = ["chest", "back", "legs", "arms", "shoulders", "abs"];

// Generic API call function with detailed logging
const apiCall = async (url, params) => {
  try {
    const options = {
      method: "GET",
      url,
      params,
      headers: {
        "x-rapidapi-key": "54419ba5d5msh45476d0728e3902p15dba4jsn71ba31d5bb49",
        "x-rapidapi-host": "exercisedb.p.rapidapi.com",
      },
    };

    console.log("Making API call with options:", options);
    const response = await axios.request(options);
    console.log("API response status:", response.status);
    console.log("API response data:", response.data);
    return response.data;
  } catch (err) {
    console.log("Error during API call:", err.message);
    if (err.response) {
      console.log("Error details:", err.response.data);
    }
    return undefined;
  }
};

// Fetch exercises by body part
export const fetchExercisesByBodyPart = async (bodyPart) => {
  if (!bodyPart) {
    console.error("Body part is required");
    return;
  }

  const normalizedBodyPart = bodyPart.toLowerCase();
  if (!allowedBodyParts.includes(normalizedBodyPart)) {
    console.error(
      `Invalid body part. Allowed values are: ${allowedBodyParts.join(", ")}`
    );
    return;
  }

  const encodedBodyPart = encodeURIComponent(normalizedBodyPart);
  const url = `${baseUrl}/exercises/bodyPart/${encodedBodyPart}`;
  console.log("Fetching exercises from URL:", url);
  return await apiCall(url, { bodyPart: normalizedBodyPart });
};
