import moment from "moment";

const displayedRestrict = (createdAt) => {
  createdAt = String(createdAt);
  // 아이폰에서 2021/12/01 -> 2021-12-01 로 바꿔주어 invalid date 나오는것 방지코드
  createdAt = createdAt.replace(/-/g, "/");
  const timeValue = new Date(createdAt);
  const result = moment(timeValue).format("yyyy.MM.DD HH:mm");
  return result;
};

export default displayedRestrict;
