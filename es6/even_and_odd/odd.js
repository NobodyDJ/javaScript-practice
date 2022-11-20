import { even } from './even.js';
export function odd(n) {
  console.log('执行了')
  return n !== 0 && even(n - 1);
}