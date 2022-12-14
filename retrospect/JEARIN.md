## diff 알고리즘 구현하는 과정에서의 어려움 (FACT)

(Discovery) 효율적인 렌더링을 위해 diff 알고리즘을 구현하려고 했다. 이 과정에서 기존 노드와 새로운 노드를 비교해야하는데 노드 타입을 어떻게 가져와야할지 어려움을 겪었다.

(Lessons Learned) 노드 정보를 취득하는 방법으로는 Node.prototype.NodeType이 있다. 노드 객체의 종류를 상수로 반환하는데, 만약 노드가 텍스트 노드이면 상수 3을 반환한다.

(Declation) oldNode.nodeType === 3 && newNode.nodeType === 3 이라는 조건을 통해서 텍스트 노드인지를 확인했었는데, 코드를 확인할 때 3이 무엇인지 다시 찾아봐야하는 불편함이 있었다.
결론적으로 $oldNode.nodeType === Node.TEXT_NODE && $newNode.nodeType === Node.TEXT_NODE 로 변경하였다.
