import './styles.css';
import datepicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
PNotify.defaults.delay = 3500;

const calendarInput = document.querySelector('.input-calendar');
const timeInput = document.querySelector('.input-time');
const peopleInput = document.querySelector('.input-people');
const submitButton = document.querySelector('.check-btn');

const validation = {
  calendar: document.querySelector('.calendar-is-hidden'),
  time: document.querySelector('.time-is-hidden'),
  people: document.querySelector('.people-is-hidden'),
};

calendarInput.addEventListener('focus', handleFocusCalendar);
calendarInput.addEventListener('blur', handleBlurCalendar);
timeInput.addEventListener('focus', handleFocusTime);
timeInput.addEventListener('blur', handleBlurTime);
peopleInput.addEventListener('focus', handleFocusPeople);
peopleInput.addEventListener('blur', handleBlurPeople);

function handleFocusCalendar() {
  validation.calendar.classList.add('calendar-is-hidden');
}
function handleBlurCalendar() {
  if (!calendarInput.value) {
    validation.calendar.classList.remove('calendar-is-hidden');
  }
}

function handleFocusTime() {
  validation.time.classList.add('time-is-hidden');
}
function handleBlurTime() {
  if (!timeInput.value) {
    validation.time.classList.remove('time-is-hidden');
  }
}

function handleFocusPeople() {
  validation.people.classList.add('people-is-hidden');
}
function handleBlurPeople() {
  if (!peopleInput.value) {
    validation.people.classList.remove('people-is-hidden');
  }
}

const picker = datepicker(calendarInput, {
  onSelect: (instance, date) => {
    calendarInput.value = date.toLocaleDateString();
    setTimeout(() => picker.hide(), 0);
  },
});

submitButton.addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
  const calendarValid = isValidCalendarInput();
  const timeValid = isValidTimeInput();
  const peopleValid = isValidPeopleInput();
  if (calendarValid && timeValid && peopleValid) {
    PNotify.success(
      `The table for ${peopleInput.value} people has booked at ${timeInput.value} on ${calendarInput.value}! We are waiting! :)`,
    );
    calendarInput.value = '';
    timeInput.value = '';
    peopleInput.value = '';
  } else {
    PNotify.alert('Please, fill the full booking info!');
  }
}

function isValidCalendarInput() {
  !calendarInput.value
    ? validation.calendar.classList.remove('calendar-is-hidden')
    : validation.calendar.classList.add('calendar-is-hidden');
  return calendarInput.value;
}

function isValidTimeInput() {
  !timeInput.value
    ? validation.time.classList.remove('time-is-hidden')
    : validation.time.classList.add('time-is-hidden');
  return timeInput.value;
}

function isValidPeopleInput() {
  !peopleInput.value
    ? validation.people.classList.remove('people-is-hidden')
    : validation.people.classList.add('people-is-hidden');
  return peopleInput.value;
}
