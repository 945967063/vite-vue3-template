/**vue3+ts防抖方法 */
export function debounce(fn: any, delay: number) {
  let timer: any = null;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
/**节流 */
export function throttle(fn: any, delay: number) {
  let timer: any = null;
  return function (...args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}
