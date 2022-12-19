// В HTML есть кнопки «Start» и «Stop».

// <button type="button" data-start>Start</button>
// <button type="button" data-stop>Stop</button>

// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона < body > на случайное значение используя инлайн стиль.
// При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.

// ВНИМАНИЕ
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

// Для генерации случайного цвета используй функцию getRandomHexColor.

const buttonStartREF = document.querySelector('button[data-start]');
const buttonStopREF = document.querySelector('button[data-stop]');
const bodyREF = document.querySelector('body');
let intervalId = null;
const NOTIFICATION_DELAY = 1000;

buttonStartREF.addEventListener('click', onStart);
buttonStopREF.addEventListener('click', onStop);
buttonStopREF.setAttribute('disabled', true);

function onStart() {
  intervalId = setInterval(ChangeColor, NOTIFICATION_DELAY);
  buttonStartREF.setAttribute('disabled', true);
  buttonStopREF.removeAttribute('disabled');
}
function onStop() {
  clearInterval(intervalId);
  buttonStartREF.removeAttribute('disabled');
  buttonStopREF.setAttribute('disabled', true);
}
function ChangeColor() {
  bodyREF.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
