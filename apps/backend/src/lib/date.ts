export function getUnixTimestamp(date: number | Date = Date.now()) {
  return Math.floor((typeof date === 'number' ? date : date.getTime()) / 1000)
}
