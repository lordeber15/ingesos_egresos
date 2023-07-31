import axios from "axios";

const egresosApi = axios.create({
  baseURL: "http://localhost:3000/",
});
export const getEgresos = async () => {
  const res = await egresosApi.get("/egresos");
  return res.data;
};
export const createEgresos = (egresos) => {
  egresosApi.post("/egresos", egresos);
};
