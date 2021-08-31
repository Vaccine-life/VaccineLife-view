// 개발환경 콘솔로그 함수
const logger = (msg) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(msg);
};

export default logger;
