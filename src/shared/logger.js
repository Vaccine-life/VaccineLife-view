const logger = (msg) => {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log(msg);
};

export default logger;
