// 내가 클릭했던  보드, 아이디를 저장
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
// 내가 클릭했던  보드, 아이디를 가져오기
const getLocalStorage = (board) => {
  const readList = JSON.parse(localStorage.getItem(board));
  if (readList === null) {
    return;
  }
  const convertToInt = readList.map((each) => parseInt(each));
  return convertToInt;
};

export { setLocalStorage, getLocalStorage };
