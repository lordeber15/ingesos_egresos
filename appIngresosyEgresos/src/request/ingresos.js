import axios from "axios";

const ingresosApi = axios.create({
  baseURL: "http://localhost:3000/",
});
export const getIngresos = async () => {
  const res = await ingresosApi.get("/ingresos");
  return res.data;
};
export const createIngresos = (ingresos) => {
  ingresosApi.post("/ingresos", ingresos);
};
