export function getRandomNumber(digits: number = 5) {
  return Math.round(Math.random() * 10 ** digits);
}
