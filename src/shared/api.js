import axios from "axios";
import { getCookie } from "./cookie";

// 얘가 있으면, 앞으로 api라고만 써도 baseURL과 Headers가 따라다닌다.
const api = axios.create({
  // 태현님 api 주소
  baseURL: "http://52.78.76.184:8080",
  Headers: `${getCookie("vaccine_life_token")}`,
});

export const userAxios = {
  login: (user) => api.post("/api/login", user),
  signup: (obj) => api.post("/api/signup", obj),
  getLikeListVac: (userId) => api.get(`/api/vacBoard/like/${userId}`),
  getLikeListQuar: (userId) => api.get(`/api/quarBoard/like/${userId}`),
};

export const boardAxios = {
  getPageVac: (page) =>
    api.get(`/api/vacBoard/page?sortBy=id&isAsc=false&size=10&page=${page}`),
  getDetailVac: (boardId) => api.get(`/api/vacBoard/${boardId}`),
  getDetailQuar: (boardId) => api.get(`/api/quarBoard/${boardId}`),
  modifyVac: (boardId, obj) => api.put(`/api/vacBoard/${boardId}`, obj),
  modifyQuar: (boardId, obj) => api.put(`/api/quarBoard/${boardId}`, obj),
  deleteVac: (boardId) => api.delete(`/api/vacBoard/${boardId}`),
  deleteQuar: (boardId) => api.delete(`/api/quarBoard/${boardId}`),
  topThreeVac: () => api.get("/api/vacBoard/topLike"),
  topThreeQuar: () => api.get("/api/quarBoard/topLike"),
};

export const writeAxios = {
  vacWrite: (obj) => api.post("/api/vacBoard", obj),
  quarWrite: (obj) => api.post("/api/quarBoard", obj),
};
