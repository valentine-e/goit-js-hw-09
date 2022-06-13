const refs = {
  startBtn: document.querySelector("button[data-start]"),
  stopBtn: document.querySelector("button[data-stop]"),
};

const TIME_INTERVAL = 1000;
let timerId = null;

refs.startBtn.addEventListener("click", onStartButtonClick);
refs.stopBtn.addEventListener("click", onStopButtonClick);

function onStartButtonClick() {
  document.body.style.backgroundColor = getRandomHexColor();

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, TIME_INTERVAL);

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function onStopButtonClick() {
  clearInterval(timerId);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
