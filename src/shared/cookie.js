// vaccine_life_token

const getCookie = (name) => {
  let value = ";" + document.cookie;
  let parts = value.split(`;${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

//set
const setCookie = (name, value, exp = 1) => {
  let date = new Date();

  date.setTime(date.getTime() + exp * 30 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

//remove

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + `=; expires=${date}`;
};

export { getCookie, setCookie, deleteCookie };
