function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtnElement = document.querySelector('button[data-start]');
const stopBtnElement = document.querySelector('button[data-stop]');

const changeBodyBgColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const onStartBtnClick = () => {
  intervalTimerID = setInterval(changeBodyBgColor, 1000);

  startBtnElement.setAttribute('disabled', '');
};
const onStopBtnClick = () => {
  clearInterval(intervalTimerID);
  startBtnElement.removeAttribute('disabled');

  intervalTimerID = 0;
};

let intervalTimerID = 0;

startBtnElement.addEventListener('click', onStartBtnClick);
stopBtnElement.addEventListener('click', onStopBtnClick);