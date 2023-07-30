import axios from "axios";

const reportApi = axios.create({
  baseURL: "http://localhost:3000/",
});
export const getReport = async () => {
  const res = await reportApi.get("/reportes");
  return res.data;
};
export const createReport = (report) => {
  reportApi.post("/reportes", report);
};
