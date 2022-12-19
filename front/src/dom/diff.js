// 모든 태그를 비교하여 변경된 부분이 있는지 체크한다.
const updateElement = ($parentNode, $oldNode, $newNode) => {
  // oldNode만 있는 경우: oldNode를 제거한다.
  if ($oldNode && !$newNode) {
    $parentNode.removeChild($oldNode);
    return;
  }

  // newNode만 있는 경우: newNode를 추가한다.
  if (!$oldNode && $newNode) {
    $parentNode.appendChild($newNode);
    return;
  }

  // oldNode와 newNode 모두 타입이 텍스트노드이고, textContent가 다르면 newNode의 textContent로 교체한다.
  if ($oldNode.nodeType === Node.TEXT_NODE && $newNode.nodeType === Node.TEXT_NODE) {
    if ($oldNode.textContent !== $newNode.textContent) $oldNode.textContent = $newNode.textContent;
    return;
  }

  // oldNode와 newNode가 모두 주석이면 newNode의 주석으로 교체한다.
  if ($oldNode.nodeType === Node.COMMENT_NODE && $newNode.nodeType === Node.COMMENT_NODE) {
    $parentNode.replaceChild($newNode, $oldNode);
    return;
  }

  // oldNode와 newNode의 태그가 다를 경우 oldNode를 제거하고, 해당 위치에 newNode를 추가한다.
  if ($oldNode.nodeName !== $newNode.nodeName) {
    $parentNode.replaceChild($newNode, $oldNode);
    return;
  }

  // virtualNode에 존재하는 어트리뷰트가 realNode에는 존재하지 않거나 어트리뷰트 값이 같지 않으면 realNode에 해당 어트리뷰트를 추가/변경해 virtualNode와 일치시킨다.
  for (const { name, value } of [...$newNode.attributes]) {
    if (!$oldNode.hasAttribute(name) || $oldNode.getAttribute(name) !== value) {
      $oldNode.setAttribute(name, value);
    }
  }

  // realNode에 존재하는 어트리뷰트가 virtualNode에는 존재하지 않으면 realNode에서 해당 어트리뷰트를 제거해 virtualNode와 일치시킨다.
  for (const { name } of [...$oldNode.attributes]) {
    if (!$newNode.hasAttribute(name)) $oldNode.removeAttribute(name);
  }

  ['checked', 'value', 'selected'].forEach(key => {
    // 요소 노드의 타입에 따라 소유하는 DOM 프로퍼티가 다르다. 따라서 해당 key의 프로퍼티가 존재하는지 확인한다.
    if ($oldNode[key] !== undefined && $newNode[key] !== undefined && $oldNode[key] !== $newNode[key]) {
      $oldNode[key] = $newNode[key];
    }
  });

  // eslint-disable-next-line no-use-before-define
  diff($oldNode, $newNode);
};

// 이전DOM과 새롭게 교체할 DOM을 받아서 비교한다.
const diff = ($OldDOM, $NewDOM) => {
  const [OldDOMNodes, NewDOMNodes] = [[...$OldDOM.childNodes], [...$NewDOM.childNodes]];
  const maxLength = Math.max(OldDOMNodes.length, NewDOMNodes.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement($OldDOM, OldDOMNodes[i], NewDOMNodes[i]);
  }
};

export default diff;
