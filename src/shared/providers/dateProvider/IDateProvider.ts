interface IDateProvider {
  dateNow(): Date;
  addDays(days: number): Date;
	addHours(hours: number): Date;
  compareBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };