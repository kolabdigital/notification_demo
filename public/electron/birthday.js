const electron = require('electron');
const ipc = electron.ipcMain;
const notifier = require('node-notifier');
const schedule = require('node-schedule');
const now = new Date();

const birthdayList =  [
  {
    "firstName": "Anita",
    "dayOfMonth": new Date().getDate(),
    "monthNumber": new Date().getMonth() + 1
  },
  {
    "firstName": "Ana",
    "dayOfMonth": 29,
    "monthNumber": 2
  },
  {
    "firstName": "Carla",
    "dayOfMonth": 4,
    "monthNumber": 1
  },
  {
    "firstName": "Diana",
    "dayOfMonth": 13,
    "monthNumber": 5
  },
  {
    "firstName": "Mario",
    "dayOfMonth": new Date().getDate(),
    "monthNumber": new Date().getMonth() + 1
  }
];


// Load list of birthdays
ipc.on('onLoadBirthdays', function(event, arg) {
  console.log('user-data', arg);
  event.sender.send('onBirthdaysRender', birthdayList);
});

function notification (birthdays) {
  notifier.notify({
    'title': 'Today\'s birthdays',
    'message': birthdays
  });
}


function createRule ({
  minute = 0,
  hour = 0,
  date = null,
  month = null
}) {
  let rule = new schedule.RecurrenceRule();

  rule.minute = minute;
  rule.hour = hour;
  rule.date = date;
  rule.month = month;

  return rule;
}

function scheduleBirthday ({ rule, who }) {
  schedule.scheduleJob(rule, () => notification(who));
}


birthdayList.forEach(birthday => {
  // if (birthday.dayOfMonth === now.get)
  scheduleBirthday({
    rule: createRule({
      hour: now.getHours(),
      minute: now.getMinutes() + 1,
      date: birthday.dayOfMonth,
      month: birthday.monthNumber - 1,
    }),
    who: birthday.firstName
  });
})
