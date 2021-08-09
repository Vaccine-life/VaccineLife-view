import moment from "moment";

const displayedRestrict = (createdAt) => {
  const timeValue = new Date(createdAt);
  const getTime = timeValue.getTime();
  const getDate = new Date(getTime);
  const result = moment(getDate).format("YYYY.MM.DD hh:mm");
  return result;
};

export default displayedRestrict;