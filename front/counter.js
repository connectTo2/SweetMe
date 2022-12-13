// 학습용 샘플입니다. 구조 파악되면 지우겠습니다.

export function setupCounter(element) {
  let counter = 0;
  const setCounter = count => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
