import logger from "./logger";

const setLocalStorage = (board, boardId) => {
  const readList = JSON.parse(localStorage.getItem(board));
  if (readList === null) {
    const firstArr = [];
    firstArr.push(boardId);
    localStorage.setItem(board, JSON.stringify(firstArr));
    return;
  }
  const toInt = readList.map((each) => parseInt(each));
  const checker = toInt.includes(boardId);
  if (!checker) {
    const localArr = [...toInt, boardId];
    localStorage.setItem(board, JSON.stringify(localArr));
  }
};

const getLocalStorage = (board) => {
  const readList = JSON.parse(localStorage.getItem(board));
  if (readList === null) {
    return;
  }
  const convertToInt = readList.map((each) => parseInt(each));
  return convertToInt;
};

export { setLocalStorage, getLocalStorage };
