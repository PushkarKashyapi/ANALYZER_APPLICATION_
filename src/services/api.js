import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const analyzeDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/analyze/", formData);

    if (!response.data.success) {
      throw new Error(response.data.message || "Analysis failed.");
    }

    return response.data.data;
  } catch (error) {
  throw new Error(
    error.response?.data?.message ||
      error.message ||
      "Unable to analyze the document.",
    { cause: error }
  );
}
}

export default api;