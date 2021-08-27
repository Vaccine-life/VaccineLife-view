import axios from "axios";
import { getCookie } from "./cookie";
import logger from "./logger";

// 얘가 있으면, 앞으로 api라고만 써도 baseURL과 Headers가 따라다닌다.
const api = axios.create({
  // 태현님 api 주소
  //baseURL: "http://52.78.76.184:8080",
  baseURL: "https://namtaehyun.shop",
  // 지현님 api 주소
  //baseURL: "http://3.36.91.191:8081",
  Headers: `${getCookie("vaccine_life_token")}`,
});

export const mainAxios = {
  getAfterEffectChart: () => api.get("/api/main/afterEffect"),
};

export const userAxios = {
  login: (user) => api.post("/api/login", user),
  signup: (obj) => api.post("/api/signup", obj),
  idDupCheck: (username) =>
    api.get(`/api/signup/username?username=${username}`),
  nicknameDupCheck: (nickname) =>
    api.get(`/api/signup/nickname?nickname=${nickname}`),
  userUpdate: (userId, obj) => api.put(`/api/signup/${userId}`, obj),
};

export const boardAxios = {
  getPageVac: (page) =>
    api.get(`/api/vacBoard/page?sortBy=id&isAsc=false&size=10&page=${page}`),
  getPageVacType: (page, type) =>
    api.get(
      `api/vacBoard/type/page?sortBy=id&isAsc=false&size=10&page=${page}&type=${type}`
    ),
  getPageQuar: (page) =>
    api.get(`/api/quarBoard/page?sortBy=id&isAsc=false&size=10&page=${page}`),
  getDetailVac: (boardId) => api.get(`/api/vacBoard/${boardId}`),
  getDetailQuar: (boardId) => api.get(`/api/quarBoard/${boardId}`),
  modifyVac: (boardId, obj) => api.put(`/api/vacBoard/${boardId}`, obj),
  modifyQuar: (boardId, obj) => api.put(`/api/quarBoard/${boardId}`, obj),
  deleteVac: (boardId) => api.delete(`/api/vacBoard/${boardId}`),
  deleteQuar: (boardId) => api.delete(`/api/quarBoard/${boardId}`),
  topThreeVac: () => api.get("/api/vacBoard/topLike"),
  topThreeQuar: () => api.get("/api/quarBoard/topLike"),
  getPrevNextVac: (boardId) => api.get(`/api/vacBoard/${boardId}/id`),
  getPrevNextQuar: (boardId) => api.get(`/api/quarBoard/${boardId}/id`),
  getMyWriteVac: (userId) => api.get(`/api/mypage/${userId}/vacBoard`),
  getMyWriteQuar: (userId) => api.get(`/api/mypage/${userId}/quarBoard`),
  getMyWriteMedi: (userId) => api.get(`/api/mypage/${userId}/medical`),
};

export const writeAxios = {
  vacWrite: (obj) => api.post("/api/vacBoard", obj),
  quarWrite: (obj) => api.post("/api/quarBoard", obj),
};

export const likeAxios = {
  likeVac: (obj) => api.post("/api/vacBoard/like", obj),
  likeQuar: (obj) => api.post("/api/quarBoard/like", obj),
  likeMedi: (obj) => api.post("/api/medical/like", obj),
  getLikeListVac: (userId) => api.get(`/api/vacBoard/like/${userId}`),
  getLikeListQuar: (userId) => api.get(`/api/quarBoard/like/${userId}`),
  getLikeListMedi: (userId) => api.get(`/api/medical/like/${userId}`),
};

export const commentAxios = {
  getVacComment: (boardId) => api.get(`/api/vacBoard/${boardId}/comments`),
  getQuarComment: (boardId) => api.get(`/api/quarBoard/${boardId}/comments`),
  writeVacComment: (obj) => api.post(`/api/comment`, obj),
  writeQuarComment: (obj) => api.post(`/api/quarcomment`, obj),
  deleteVacComment: (commentId, boardId) =>
    api.delete(`/api/comment/${boardId}/${commentId}`),
  deleteQuarComment: (commentId, boardId) =>
    api.delete(`/api/quarcomment/${boardId}/${commentId}`),
};

export const medicalAxios = {
  getMedical: () => api.get("/api/medical"),
  getPageMedi: (page) =>
    api.get(`/api/medical/page?sortBy=id&isAsc=false&size=10&page=${page}`),
  addMedical: (contents) => api.post("/api/medical", contents),
  deleteMedical: (medicalId) => api.delete(`/api/medical/${medicalId}`),
  topThreeMedi: () => api.get("/api/medical/toplike"),
  modifyMedi: (medicalId, contents) =>
    api.patch(`/api/medical/${medicalId}`, contents),
};
