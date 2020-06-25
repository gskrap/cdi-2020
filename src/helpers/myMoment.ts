import moment from 'moment-timezone';

// @ts-ignore
moment.fn.roundNext15Min = function() {
  let intervals = Math.floor(this.minutes() / 15);
  if (this.minutes() % 15 !== 0)
    intervals++;
  if (intervals === 4) {
    this.add(1, 'hours');
    intervals = 0;
  }
  this.minutes(intervals * 15);
  this.seconds(0);
  return this
};

export default moment;
