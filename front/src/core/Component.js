import { render, eventHolder } from '../dom/index';

class Component {
  constructor(props) {
    this.props = props;
    this.#holdEvents();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    render();
  }

  /**
   * @private
   * Component의 constructor가 호출될 때만 holdEvents 메서드가 호출되면 되므로, 자식 class에게 상속하지 않는다.
   */
  #holdEvents() {
    // 이벤트가 중복 등록되지 않도록 체크하는 holdEvents 메서드 생성
    const events = this.addEventListener?.();
    if (!events) return;

    for (const event of events) {
      const { selector, handler } = event;

      /**
       * selector가 window거나 null일 경우 event.handler 실행 조건을 추가하는 행위를 하지 않는다.
       * - window는 전역 객체로 스코프 체인을 따라 검색해도 closest 메서드가 없기 때문에 selector인지 확인하고 handler를 실행할 필요가 없다.
       * - selecotr가 null인 경우 모든 요소에 동일한 이벤트를 추가하는 것이므로 selector인지 확인하고 handler를 실행할 필요가 없다.
       */
      if (selector === 'window' || selector === null) {
        eventHolder.push(event);
        // eslint-disable-next-line no-continue
        continue;
      }

      // eventHolder에 events와 동일한 내용이 있으면 추가하지 않는다.
      const duplication = eventHolder.find(({ type, selector }) => type === event.type && selector === event.selector);

      if (!duplication) {
        /**
         * 이벤트 핸들러 실행조건 추가.
         * 이벤트 target이 selector 자신이거나 하위 요소인 경우 함수를 호출한다.
         */
        event.handler = e => {
          e.preventDefault();
          // FIXME: 라우팅시 이벤트 버그
          if (e.target.closest(selector)) {
            console.log('[notif class]', e.target.attributes.class.value, e.target.classList, e.target.className);
            if (e.target.tagName === 'A') {
              // e.target.className = e.target.attributes;
              console.log('[class]', e.target.attributes.class.value, e.target.classList, e.target.className);
              // console.log('[이벤트 타겟]', e.target, '[selector]', selector);
              // console.log('[실행 이벤트]', type, selector, handler);
            }
            handler(e);
          }
        };

        eventHolder.push(event);
      }
    }
    console.log('[eventHolder]', eventHolder);
    console.log('-------------------------------------------------------------');
  }

  /**
   * @abstract
   * 자식 컴포넌트가 render 메서드를 가지고 있지 않다는 에러를 띄우기 위한 목적으로 사용된다.
   * 컴포넌트들을 props 방식으로 만들고 있기 때문에, 자식 컴포넌트들은 모두 render 메서드를 가져야 한다.
   */
  // eslint-disable-next-line class-methods-use-this
  render() {
    throw new Error('컴포넌트가 render 메서드를 가지고 있지 않습니다. 생성해주세요.');
  }
}

export default Component;
