
const dateData = () => {
  let date = new Date();
  let month = date.getMonth();
  let today = String(new Date()).split(' ');
  let thisMonth = String(new Date(2019, month)).split(' ')[1].toUpperCase();
  let nextMonth = String(new Date(2019, (month+1))).split(' ')[1].toUpperCase();

  return {
    thisMonth,
    nextMonth,
  }
}

module.exports = dateData;
