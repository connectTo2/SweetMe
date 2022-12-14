// attribute를 비교하는 함수
const updateAttribute = (oldNode, newNode) => {
  const oldProps = [...oldNode.attributes];
  const newProps = [...newNode.attributes];

  // 달라지거나 추가된 props를 반영한다.
  for (const { name, value } of newProps) {
    if (value !== oldProps.getAttribute(name)) oldNode.setAttribute(name, value);
  }

  // 없어진 props를 attribute에서 제거
  for (const { name } of oldProps) {
    if (newNode.getAttribute(name) === undefined) oldNode.removeAttribute(name);
  }
};

// 모든 태그를 비교하여 변경된 부분이 있는지 체크한다.
const updateElement = (parentNode, oldNode, newNode) => {
  // oldNode만 있는 경우: oldNode를 제거한다.
  if (oldNode && !newNode) {
    parentNode.removeChild(oldNode);
    return;
  }

  // newNode만 있는 경우: newNode를 추가한다.
  if (!oldNode && newNode) {
    parentNode.appendChild(newNode);
    return;
  }

  // oldNode와 newNode 모두 타입이 텍스트노드이고, textContent가 다르면 newNode의 textContent로 교체한다.
  if (oldNode.nodeType === 3 && newNode.nodeType === 3) {
    if (oldNode.textContent !== newNode.textContent) oldNode.textContent = newNode.textContent;
    return;
  }

  // oldNode와 newNode가 주석이면 무시한다.
  if (oldNode.nodeType === Node.COMMENT_NODE || newNode.nodeType === Node.COMMENT_NODE) return;

  // oldNode와 newNode의 태그가 다를 경우 oldNode를 제거하고, 해당 위치에 newNode를 추가한다.
  if (oldNode.nodeName !== newNode.nodeName) {
    parentNode.insertBefore(newNode, oldNode);
    parentNode.removeChild(oldNode);
    return;
  }

  // oldNoded와 newNode의 태그가 같은 경우, attribute를 비교하여 변경된 부분만 반영한다.
  // oldNode의 attribute 중 newNode에 없는 것은 모두 제거한다.
  // newNode의 attribute에서 변경된 내용만 oldNode의 attribute에 반영한다.
  if (oldNode.nodeName === newNode.nodeName) {
    updateAttribute(oldNode, newNode);
    return;
  }

  /**
   * element attribute를 일치시켜도 element property는 일치하지 않는 경우가 있다.
   * 모든 프로퍼티를 비교해야 하지만 checked/value/selected 프로퍼티만 비교한다.
   */
  ['checked', 'value', 'selected'].forEach(key => {
    if (oldNode[key] !== undefined && newNode[key] !== undefined && oldNode[key] !== newNode[key]) {
      oldNode[key] = newNode[key];
    }
  });

  // eslint-disable-next-line no-use-before-define
  diff(oldNode, newNode);
};

// 이전DOM과 새롭게 교체할 DOM을 받아서 비교한다.
const diff = (OldDOM, NewDOM) => {
  const [OldDOMNodes, NewDOMNodes] = [[...OldDOM.childNodes], [...NewDOM.childNodes]];

  const maxLength = Math.max(OldDOMNodes.length, NewDOMNodes.length);

  for (let i = 0; i < maxLength; i++) {
    // 여기서 비교하면서 DOM을 교체해야한다.
    updateElement(OldDOM, OldDOMNodes[i], NewDOMNodes[i]);
  }
};

export default diff;
