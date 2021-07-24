import { app } from './app';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

app.listen(process.env.PORT || 3333, () => console.log(' ⚡ Node server proudly running on port ' + `${process.env.PORT}` + ' ⚡'));