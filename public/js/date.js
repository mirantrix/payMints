const dateData = () => {
  let date = new Date();
  let month = date.getMonth();
  let today = String(new Date()).split(' ');
  let thisMonth = String(new Date(2019, month)).split(' ')[1].toUpperCase();
  let nextMonth = String(new Date(2019, (month+1))).split(' ')[1].toUpperCase();
  let addComa = today.splice(1, 0, ',');
  let day = today[0];
  let numberDate = Number(today[3]);
  let monthAndDate = today.slice(2, 4).join(' ');
  let displayToday = `${day}, ${monthAndDate}`;

  return {
    thisMonth,
    nextMonth,
    displayToday,
    numberDate
  }
}

const nextUp = () => {
  const { numberDate } = dateData();
  let daysLeft = (Number(document.getElementById('days-left').innerHTML) - numberDate);
  let nextPayment = `${daysLeft} days`;
    if(daysLeft === 0){
      nextPayment = 'Today'
      return nextPayment;
    }
    if(daysLeft === 1){
      nextPayment = 'Tomorrow'
      return nextPayment;
    }
    if(daysLeft < 0){
      nextPayment = "'till next month!"
      return nextPayment;
    }
  return nextPayment
}


const setDate = () => {
  const { thisMonth, nextMonth, displayToday, numberDate } = dateData();
  const setTodaysDate = document.getElementById('todays-date');
  setTodaysDate.innerHTML = displayToday;
}

const setDaysLeft = () => {
  const daysLeft = document.getElementById('days-left');
  daysLeft.innerHTML = nextUp();
}

setDate();
setDaysLeft();
