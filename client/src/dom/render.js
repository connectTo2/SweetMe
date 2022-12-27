import eventHolder from './eventHolder';
import diff from './diff';

// render 함수 외부에 리렌더링시 RootComponent의 재호출이 일어나지 않고, 초기 렌더링시 전달받은 RootComponent의 instance(이하 instance)와 $container를 기억하기 위한 변수 생성
let rootInstance = null;
let $root = null;

const bindEventHandler = () => {
  /**
   * eventHolder: [{type: 이벤트의 타입, selector: 이벤트 target, handler: 이벤트 핸들러}]
   * 모든 이벤트는 위임하고, handler 안에서 조건을 확인할 수 있도록 한다.
   * 이벤트 호출자는 $root로 하되, selector가 window일 경우 window에 이벤트를 등록한다.
   */
  eventHolder.forEach(({ type, selector, handler }) => {
    (selector === 'window' ? window : $root).addEventListener(type, handler);
  });
};

/** @type { (RootComponent: class, $container: HTMLElement) => void } */
const render = async (RootComponent, $container) => {
  eventHolder.forEach(({ type, selector, handler }, index) => {
    if (type !== 'popstate' && selector !== '.logoLink') {
      eventHolder.splice(index, 1);
      $root.removeEventListener(type, handler);
    }
  });

  try {
    if (!rootInstance) rootInstance = new RootComponent();
    if (!$root) $root = $container;

    // 가상의 element 또한 $root가 가지고 있는 프로퍼티를 그대로 가져야 하기 때문에 $root 노드를 clone
    const $virtual = $root.cloneNode();

    // rootInstance의 render 메서드는 domString을 반환함
    $virtual.innerHTML = await rootInstance.render();

    // diff 알고리즘을 구현한 diff 함수를 호출하여 실제 dom을 변경시킴
    diff($root, $virtual);

    bindEventHandler();
  } catch (e) {
    console.error(e);
  }
};

export default render;
