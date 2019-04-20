const orderArray = (dataSet) => {

  const sortDates = (date) => {
    return function(a, b) {
      return a[date]- b[date];
    }
  }

  const mostRecent = () => {
    let mostRecent = dataSet.sort(sortDates("date"));
    return mostRecent;
  }

  const inactive = (less) => {
    return less.date < today;
  }

  const active = (less) => {
    return less.date >= today;
  }

  const dataData = (info) => {
    return info.date;
  }

  let upComming = [];
  let passComming = [];
  let today = new Date().getDate();
  let sorted = mostRecent();

  passComming = sorted.filter(inactive);
  upComming = sorted.filter(active);

  let order = upComming.concat(passComming);

  return {
    passComming,
    upComming
  }

}

module.exports = orderArray;
