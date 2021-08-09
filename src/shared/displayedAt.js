import moment from "moment";

const displayedAt = (createdAt) => {
  const today = new Date();
  const timeValue = new Date(createdAt);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  return moment(createdAt).format("YYYY.MM.DD");
};

export default displayedAt;
