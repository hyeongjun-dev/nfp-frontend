export function withComma(num) {
  return num.toLocaleString('en-US');
}

export function asNumFormat(num) {
  let fixed = Number(num)
  return fixed.toLocaleString('en-US');
}
