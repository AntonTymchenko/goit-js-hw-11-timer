class Timer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.timerId = null;
    this.refs = {
      timer: document.querySelector(selector),
    };
  }
  start() {
    const target = new Date(this.targetDate);
    const { days, hours, mins, secs } = target;
    Timer.startCountOnTable({ days, hours, mins, secs }, this.refs.timer);

    this.timerid = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = target - currentDate;
      const { days, hours, mins, secs } = Timer.getTimeComponents(deltaTime);
      Timer.changeTableTime({ days, hours, mins, secs }, this.refs.timer);
    }, 1000);
  }
  static changeTableTime({ days, hours, mins, secs }, elem) {
    const daysNum = elem.querySelector('span[data-value="days"]');
    daysNum.textContent = days;
    Timer.checkEnding(daysNum);

    const hoursNum = elem.querySelector('span[data-value="hours"]');
    hoursNum.textContent = hours;
    Timer.checkEnding(hoursNum);

    const minsNum = elem.querySelector('span[data-value="mins"]');
    minsNum.textContent = mins;
    Timer.checkEnding(minsNum);

    const secsNum = elem.querySelector('span[data-value="secs"]');
    secsNum.textContent = secs;
    Timer.checkEnding(secsNum);
    Timer.timeIsOver(secsNum, minsNum, hoursNum, daysNum);
  }
  static pad(timeStr) {
    return String(timeStr).padStart(2, '0');
  }
  static getTimeComponents(time) {
    const days = Timer.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = Timer.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = Timer.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = Timer.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  static startCountOnTable({ days, hours, mins, secs }, elem) {
    const daysNum = elem.querySelector('span[data-value="days"]');
    daysNum.textContent = days;
    if (daysNum.textContent === '01') {
      daysNum;
    }
    elem.querySelector('span[data-value="hours"]').textContent = hours;
    elem.querySelector('span[data-value="mins"]').textContent = mins;
    const secsNum = elem.querySelector('span[data-value="secs"]');
    secsNum.textContent = secs;
    if (secsNum.textContent === '01') {
      secsNum.nextElementSibling('.label').textContent = 'Second';
    }
  }
  static checkEnding(elem) {
    if (elem.textContent === '01') {
      if (elem.nextElementSibling.textContent === 'Seconds') {
        elem.nextElementSibling.textContent = 'Second';
      } else {
        elem.nextElementSibling.textContent = 'Seconds';
      }
      if (elem.nextElementSibling.textContent === 'Minuts') {
        elem.nextElementSibling.textContent = 'Minut';
      } else {
        elem.nextElementSibling.textContent = 'Minuts';
      }
      if (elem.nextElementSibling.textContent === 'Hours') {
        elem.nextElementSibling.textContent = 'Hour';
      } else {
        elem.nextElementSibling.textContent = 'Hours';
      }
      if (elem.nextElementSibling.textContent === 'Days') {
        elem.nextElementSibling.textContent = 'Day';
      } else {
        elem.nextElementSibling.textContent = 'Days';
      }
    }
  }
  static timeIsOver(...arg) {
    if (
      arg[0].textContent === '00' &&
      arg[1].textContent === '00' &&
      arg[2].textContent === '00' &&
      arg[3].textContent === '00'
    ) {
      arg[0].textContent = '00';
      arg[1].textContent = '00';
      arg[2].textContent = '00';
      arg[3].textContent = '00';
      document.body.style.backgroundColor = 'tomato';
      clearInterval(this.timerId);
    }
  }
}

const timerOne = new Timer({ selector: '#timer-1', targetDate: 'June 16, 2021' });

timerOne.start();
