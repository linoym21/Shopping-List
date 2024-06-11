import axios from "axios";



export async function getAnalyze(userId) {
  try {
    const response = await axios.post("http://localhost:8000/analyze", {
      userId: userId,
    });
    const result = response.data[0];

    if (result.Status === "not-found") {
      alert("User doesn't exist");
    } else if (result.Status === "In-Progress") {
      alert("Your profile's inspection is underway");
    } else {
      return result.data;
    }
  } catch (err) {
    alert("Server Unavailable");
  }
}