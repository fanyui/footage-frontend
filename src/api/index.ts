import axios from 'axios';
const API_BASE_URL = process.env.NEXT_PUBLIC_UN_HOSTED_API
// const API_BASE_URL = "http://localhost:8080";

export const uploadVideo = async (file: File, onUploadProgress: (progressEvent: ProgressEvent) => void) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      "ngrok-skip-browser-warning": 'skip-browser-warning'

    },
    // onUploadProgress,
  });

  return response;
};

export const getAnalysisResults = async (footageid: string) => {
  const response = await axios.get(`${API_BASE_URL}/footage/${footageid}`,
    {
      headers: {
        "ngrok-skip-browser-warning": 'skip-browser-warning'
      }
    }
  );
  return response.data;
};
export const getStatistics = async () => {
  const response = await axios.get(`${API_BASE_URL}/footage/statistics`,
    {
      headers: {
        "ngrok-skip-browser-warning": 'skip-browser-warning'
      }
    }
  );
  return response.data;
};

export const getAlerts = async () => {
  const response = await axios.get(`${API_BASE_URL}/alerts`);
  return response.data;
};

export const getActivityLogs = async () => {
  const response = await axios.get(`${API_BASE_URL}/activity-logs`);
  return response.data;
};

export const getDashboardData = async () => {
  const response = await axios.get(`${API_BASE_URL}/footage`,
    {
      headers: {
        "ngrok-skip-browser-warning": 'skip-browser-warning'
      }
    }
  );
  return response.data;
};
