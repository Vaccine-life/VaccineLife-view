// vaccine_life_token

import jwtDecode from "jwt-decode";

//get: 설정된 쿠키를 가져온다
const getCookie = (name) => {
  let value = ";" + document.cookie;
  let parts = value.split(`;${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

//set: 쿠키에 값을 할당해서 새로 만든다
const setCookie = (name, value, exp = 1) => {
  let date = new Date();
  const decodeToken = jwtDecode(value);

  date.setTime(
    date.getTime() + exp * (decodeToken.exp - decodeToken.iat) * 1000
  );
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

//remove: 쿠키를 expire시켜 없애버린다
const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + `=; expires=${date}`;
};

export { getCookie, setCookie, deleteCookie };
