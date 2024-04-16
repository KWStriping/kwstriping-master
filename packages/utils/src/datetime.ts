export function joinDateTime(date: Maybe<string>, time?: Maybe<string>) {
  if (!date) return null;
  const setTime = time || '00:00';
  return date + ' ' + setTime;
}

export function splitDateTime(dateTime: string) {
  if (!dateTime) return { date: '', time: '' };
  // Default html input format YYYY-MM-DD HH:mm
  const [dateString, timeString] = dateTime.split(' ');
  if (!dateString || !timeString) throw new Error('Invalid date time format');
  return {
    date: dateString,
    time: timeString,
  };
}
