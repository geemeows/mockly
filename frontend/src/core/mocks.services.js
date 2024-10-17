import httpClient from "./httpClient";

export const getMocks = async () => {
  const { data } = await httpClient.get("/dashboard/mocks");
  return data;
};
