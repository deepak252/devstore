export const debounceHandler = () => {
  let timeoutId: number | null
  return function (func: () => void, delay = 500) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func()
    }, delay)
  }
}
