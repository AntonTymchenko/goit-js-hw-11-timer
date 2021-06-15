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

    this.timerid = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = target - currentDate;
      const { days, hours, mins, secs } = Timer.getTimeComponents(deltaTime);
      Timer.changeTableTime({ days, hours, mins, secs }, this.refs.timer);
      Timer.timeIsOver(this.refs.timer, this.timerid);
    }, 1000);
  }
  static changeTableTime({ days, hours, mins, secs }, elem) {
    const daysNum = elem.querySelector('span[data-value="days"]');
    daysNum.textContent = days;
    Timer.checkEnding(daysNum, 'Day', 'Days');

    const hoursNum = elem.querySelector('span[data-value="hours"]');
    hoursNum.textContent = hours;
    Timer.checkEnding(hoursNum, 'Hour', 'Hours');

    const minsNum = elem.querySelector('span[data-value="mins"]');
    minsNum.textContent = mins;
    Timer.checkEnding(minsNum, 'Minut', 'Minuts');

    const secsNum = elem.querySelector('span[data-value="secs"]');
    secsNum.textContent = secs;
    Timer.checkEnding(secsNum, 'Second', 'Seconds');
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

  static checkEnding(elem, value1, value) {
    if (elem.textContent === '01') {
      elem.nextElementSibling.textContent = value1;
    }
    if (elem.textContent !== '01') {
      elem.nextElementSibling.textContent = value;
    }
  }

  static timeIsOver(elem1, elem2) {
    const coll = elem1.querySelectorAll('.value');
    if (
      coll[0].textContent === '00' &&
      coll[1].textContent === '00' &&
      coll[2].textContent === '00' &&
      coll[3].textContent === '00'
    ) {
      clearInterval(elem2);
      coll[0].textContent = '00';
      coll[1].textContent = '00';
      coll[2].textContent = '00';
      coll[3].textContent = '00';
      document.body.style.backgroundColor = 'tomato';
    }
  }
}

const timerOne = new Timer({ selector: '#timer-1', targetDate: 'June 20, 2021' });

timerOne.start();
