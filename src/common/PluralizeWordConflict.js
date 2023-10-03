export default function PluralizeWordConflict(digit, text) {
  // const strDigit = digit.toString();
  if (digit > 9) {
    const secondLast = Math.floor((digit / 10) % 10);
    if (secondLast === 1) return `${text}ов`;
  }
  const firstLast = digit % 10;
  if ([2, 3, 4].includes(firstLast)) return `${text}а`;
  if (firstLast === 1) return `${text}`;
  return `${text}ов`;
}
