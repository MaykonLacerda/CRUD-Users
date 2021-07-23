import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayJSDateProvider implements IDateProvider {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, 'hours').toDate();
  }
}

export { DayJSDateProvider };