import moment from "moment";

const displayedRestrict = (createdAt) => {
  createdAt = String(createdAt);
  createdAt = createdAt.replace(/-/g, "/");
  const timeValue = new Date(createdAt);
  const result = moment(timeValue).format("yyyy.MM.DD HH:mm");
  return result;
};

export default displayedRestrict;
