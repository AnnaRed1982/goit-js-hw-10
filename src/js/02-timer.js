// В HTML есть готовая разметка таймера, поля выбора конечной даты и кнопки, при клике по которой таймер должен запускаться. Добавь минимальное оформление элементов интерфейса.
// Библиотека flatpickr
// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.
// Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.
// // Описан в документации
// import flatpickr from "flatpickr";
// // Дополнительный импорт стилей
// import "flatpickr/dist/flatpickr.min.css";
// Библиотека ожидает что её инициализируют на элементе input[type="text"], поэтому мы добавили в HTML документ поле input#datetime-picker.
// <input type="text" id="datetime-picker" />
// Вторым аргументом функции flatpickr(selector, options) можно передать необязательный объект параметров.
// Мы подготовили для тебя объект который нужен для выполнения задания.Разберись за что отвечает каждое свойство в документации «Options» и используй его в своем коде.

// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr.
// Именно в нём стоит обрабатывать дату выбранную пользователем.Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.
// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.

// Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера,
// показывая четыре цифры: дни, часы, минуты и секунды в формате xx: xx: xx: xx.
// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// НЕ БУДЕМ УСЛОЖНЯТЬ
// Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.
// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

// Форматирование времени
// Функция convertMs() возвращает объект с рассчитанным оставшимся временем до конечной даты.Обрати внимание,
// что она не форматирует результат.То есть, если осталось 4 минуты или любой другой составляющей времени,
// то функция вернет 4, а не 04.В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов.Напиши функцию addLeadingZero(value),
// которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.

// Библиотека уведомлений
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.
// Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputREF = document.querySelector('#datetime-picker');
const buttonStartREF = document.querySelector('button[data-start]');

const secondsREF = document.querySelector('span[data-seconds]');
const minutesREF = document.querySelector('span[data-minutes]');
const hoursREF = document.querySelector('span[data-hours]');
const daysREF = document.querySelector('span[data-days]');

const timerREF = document.querySelector('.timer');
const fieldREF = document.querySelectorAll('.field');
const labelREF = document.querySelectorAll('.label');
const valueREF = document.querySelectorAll('.value');

const COUNTER_DELAY = 1000;
let selectedDate = 0;

buttonStartREF.setAttribute('disabled', 'true');

timerREF.style.display = 'flex';
timerREF.style.gap = '20px';
fieldREF.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
});
labelREF.forEach(label => {
  label.style.fontWeight = '400';
  label.style.display = 'flex';
  label.style.justifyContent = 'center';
  label.style.fontSize = '12px';
  label.style.textTransform = 'uppercase';
});
valueREF.forEach(value => {
  value.style.display = 'flex';
  value.style.justifyContent = 'center';
  value.style.fontWeight = '600';
  value.style.fontSize = '28px';
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    buttonStartREF.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};

const fp = flatpickr(inputREF, options);
buttonStartREF.addEventListener('click', startTimer);

function startTimer() {
  buttonStartREF.setAttribute('disabled', 'true');
  inputREF.setAttribute('disabled', 'true');
  
  let intervalTimer = setInterval(() => {
    const originalDate = Date.now();
    let timeSeconds = selectedDate - originalDate;
    console.log(timeSeconds);

    if (timeSeconds > 0) {
      const { days, hours, minutes, seconds } = convertMs(timeSeconds);

      daysREF.textContent = addLeadingZero(days);
      hoursREF.textContent = addLeadingZero(hours);
      minutesREF.textContent = addLeadingZero(minutes);
      secondsREF.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalTimer);
      inputREF.removeAttribute('disabled');
    }
  }, COUNTER_DELAY);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
