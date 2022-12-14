## diff 알고리즘 구현하는 과정에서의 어려움 (FACT)

(Discovery) 효율적인 렌더링을 위해 diff 알고리즘을 구현하려고 했다. 이 과정에서 기존 노드와 새로운 노드를 비교해야하는데 노드 타입을 어떻게 가져와야할지 어려움을 겪었다.

(Lessons Learned) 노드 정보를 취득하는 방법으로는 Node.prototype.NodeType이 있다. 노드 객체의 종류를 상수로 반환하는데, 만약 노드가 텍스트 노드이면 상수 3을 반환한다.

(Declation) oldNode.nodeType === 3 && newNode.nodeType === 3 이라는 조건을 통해서 텍스트 노드인지를 확인했었는데, 코드를 확인할 때 3이 무엇인지 다시 찾아봐야하는 불편함이 있었다.
결론적으로 $oldNode.nodeType === Node.TEXT_NODE && $newNode.nodeType === Node.TEXT_NODE 로 변경하였다.

## module.css 파일을 import 후 js 파일에서 사용할 때의 어려움 (FACT)

(Discovery) VocaItem.module.css 파일을 import 한 후 DOMString을 반환할 때 ${styles.vocaItem} 과 같은 형식으로 사용했다. 코드로 렌더링 했을 때 브라우저에서 클래스를 확인해보면 \_card_lav5p_3 처럼 고유의 문자열로 클래스명을 반환하는데 이후 이벤트를 위임해야할 때 클래스명을 어떻게 확인해야할까 고민했다.

(Lessons Learned) style.vocaItem은 문자열이다. 그렇기 때문에 e.target이 클래스명과 일치하는지 확인하려고 할 때 백틱을 사용해야한다. if(e.target.contains(`.${style.vocaItem}`)) 처럼 사용하면 된다.

(Declation) styles로 module.css 파일을 그대로 import해오면 클래스를 적용할 때 모든 클래스에 style.을 붙여야한다. 코드 가독성이 떨어질뿐만 아니라 사용시에도 불편함이 있기 때문에 처음 import 해올 때 디스트럭처링 할당을 해서 가져오자.
