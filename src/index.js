import './styles.css';
import datepicker from 'js-datepicker';
import 'js-datepicker/dist/datepicker.min.css';

const calendarInput = document.querySelector('.input-calendar');
const timeInput = document.querySelector('.input-time');
const peopleInput = document.querySelector('.input-people');
const submitButton = document.querySelector('.check-btn');

const validation = {
  calendar: document.querySelector('.calendar-is-hidden'),
  time: document.querySelector('.time-is-hidden'),
  people: document.querySelector('.people-is-hidden'),
};

const picker = datepicker(calendarInput, {
  onSelect: (instance, date) => {
    calendarInput.value = date.toLocaleDateString();
  },
});

submitButton.addEventListener('click', handleClick);

function handleClick(e) {
  e.preventDefault();
  const calendarValid = isValidCalendarInput();
  const timeValid = isValidTimeInput();
  const peopleValid = isValidPeopleInput();
  if (calendarValid && timeValid && peopleValid) {
    alert(
      `The table for ${peopleInput.value} people has booked at ${timeInput.value} on ${calendarInput.value}! We are waiting! :)`,
    );
    calendarInput.value = '';
    timeInput.value = '';
    peopleInput.value = '';
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
