export function precision(value: number, precision: number) {
  const _precision = 10 ** precision;
  return Math.round(value * _precision) / _precision;
}

export function random(min: number, max: number) {
  return min + Math.random() * max;
}

export function randomInt(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1));
}
